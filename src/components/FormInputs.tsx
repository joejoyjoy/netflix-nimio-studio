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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  values:
    | {
        title: string;
        overview: string;
        year: number;
        duration: number;
        cover: {
          public_id: string;
          secure_url: string;
        };
      }
    | {
        name: string;
        born: number;
        bio: string;
      }
    | {
        name: string;
      }
    | {
        name: string;
        born: number;
        bio: string;
      };
  setvalues: Dispatch<
    SetStateAction<
      | {
          title: string;
          overview: string;
          year: number;
          duration: number;
          cover: { public_id: string; secure_url: string };
        }
      | { name: string; born: number; bio: string }
      | { name: string }
      | { name: string; born: number; bio: string }
    >
  >;
}

export default function FormInputs(props: Props) {
  const { label, errorMessage, ...inputProps } = props;

  return (
    <div className="flex flex-col">
      <label className="form-label">{label}</label>
      <Suspense fallback={<></>}>
        {inputProps.type === "textarea" ? (
          <TypeTextarea props={props} />
        ) : inputProps.type === "file" ? (
          <InputTypeFile props={props} />
        ) : inputProps.type === "checkbox" ? (
          <DropdownSelector props={props} />
        ) : (
          <InputTypeText props={props} />
        )}
      </Suspense>
      <span className="hidden text-sm text-red-400 my-1">{errorMessage}</span>
    </div>
  );
}

function InputTypeText(props: { props: Props }) {
  const { label, errorMessage, onChange, id, ...inputProps } = props.props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  return (
    <input
      {...inputProps}
      onChange={onChange}
      onBlur={handleFocus}
      data-focused={focused.toString()}
      className="form-input-text"
    />
  );
}

function TypeTextarea(props: { props: Props }) {
  const { label, errorMessage, onChange, id, ...inputProps } = props.props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
  };

  return (
    <textarea
      {...inputProps}
      onChange={onChange}
      onBlur={handleFocus}
      data-focused={focused.toString()}
      className="form-input-text"
    />
  );
}

function DropdownSelector(props: { props: Props }) {
  const { label, errorMessage, values, setvalues, id, ...inputProps } =
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
    setvalues({ ...values, [inputProps.name]: res });
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

function InputTypeFile(props: { props: Props }) {
  const { label, errorMessage, onChange, id, ...inputProps } = props.props;
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFile = (e: FormEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setImagePreview(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleFileDelete = () => {
    setImagePreview("");
  };

  return (
    <>
      <div>
        {imagePreview ? (
          <button
            type="button"
            onClick={handleFileDelete}
            className="relative label-file-form group overflow-hidden p-3"
          >
            <div className="flex items-center w-full h-full overflow-hidden">
              <Image
                src={imagePreview}
                alt="profile icon"
                width={288}
                height={384}
                className="block w-full h-hull object-cover rounded-sm"
                placeholder="blur"
                blurDataURL={imagePreview}
                priority
              />
              <div className="label-file-preview-form group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-40">
                <CiTrash />
              </div>
            </div>
          </button>
        ) : (
          <>
            <label
              htmlFor="product_image"
              className="label-file-form flex flex-col justify-center items-center"
            >
              <PiPlus size={47} />
              Upload
            </label>
            <input
              {...inputProps}
              id="product_image"
              accept="image/*"
              placeholder="Add profile photo"
              className="hidden"
              value={undefined}
              onInput={(e) => handleFile(e)}
              onChange={onChange}
            />
          </>
        )}
      </div>
    </>
  );
}
