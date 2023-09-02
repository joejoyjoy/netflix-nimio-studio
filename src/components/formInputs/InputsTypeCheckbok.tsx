import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  FormEvent,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { PiPlus } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { getAllDirectors } from "@/lib/director.actions";
import { getAllCategories } from "@/lib/category.actions";
import { getAllActors } from "@/lib/actor.actions";

interface Props {
  id: number;
  name: string;
  type: string;
  placeholder?: string | undefined;
  errorMessage: string;
  label: string;
  pattern?: string | undefined;
  required: boolean;
  value: string;
  values: InitialValue;
  setValues: Dispatch<SetStateAction<InitialValue>>;
}

export default function InputsTypeCheckbox(props: Props) {
  const { label, errorMessage } = props;

  return (
    <div className="flex flex-col">
      <label className="form-label">{label}</label>
      <DropdownSelector props={props} />
      <span className="hidden text-sm text-red-400 my-1">{errorMessage}</span>
    </div>
  );
}

function DropdownSelector(props: { props: Props }) {
  const { label, errorMessage, values, setValues, id, ...inputProps } =
    props.props;
  const [allItems, setAllItems] = useState([]);
  const [disableCheck, setDisableCheck] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    allItems.reduce((obj, state) => ({ ...obj, [state.id]: false }), {})
  );
  const [popperOpen, setPopperOpen] = useState<boolean>(false);
  let popperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (popperRef.current != null) {
        if (!popperRef.current.contains(e.target)) {
          setPopperOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const getDirectors = async () => {
    const res = await getAllDirectors();
    setAllItems(res);
  };

  const getCategories = async () => {
    const res = await getAllCategories();
    setAllItems(res);
  };

  const getActors = async () => {
    const res = await getAllActors();
    setAllItems(res);
  };

  useEffect(() => {
    if (inputProps.name === "director") {
      getDirectors();
    }
    if (inputProps.name === "category") {
      getCategories();
    }
    if (inputProps.name === "actor") {
      getActors();
    }
  }, []);

  useEffect(() => {
    if (inputProps.dataLimit === 1) {
      Object.values(selectedItems).some((val) => val === true) &&
        setDisableCheck(true);
    }

    function filterTrueValues(obj: { [key: string]: boolean }): string[] {
      const trueIds: string[] = [];

      for (const key in obj) {
        if (obj[key] === true) {
          trueIds.push(key);
        }
      }

      return trueIds;
    }

    const res = filterTrueValues(selectedItems);
    setValues({ ...values, [inputProps.name]: res });
  }, [selectedItems]);

  return (
    <div ref={popperRef}>
      <button
        type="button"
        onClick={() => setPopperOpen(!popperOpen)}
        className="form-input-text text-left"
      >
        -- Select your states --
      </button>
      {popperOpen && (
        <div>
          {allItems.map((item) => (
            <div key={item.id}>
              <input
                id={`input-${item.id}`}
                type="checkbox"
                onChange={(e) =>
                  setSelectedItems({
                    ...selectedItems,
                    [item.id]: e.target.checked,
                  })
                }
                checked={selectedItems[item.id] ? true : false}
                required
              />
              <label htmlFor={`input-${item.id}`}>{item.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
