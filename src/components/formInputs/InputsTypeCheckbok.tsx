import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useGetBranchContent from "@/hooks/useGetBranchContent";

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
  const { branchContent } = useGetBranchContent(inputProps.name);
  const [popperOpen, setPopperOpen] = useState<boolean>(false);
  let popperRef = useRef<HTMLInputElement>(null);

  const checkIfTrue = (id: string) => {
    const currentValue = values[inputProps.name] || [];

    if (!currentValue.includes(id)) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (id: string) => {
    const currentValue = values[inputProps.name] || [];

    if (!currentValue.includes(id)) {
      const updatedValue = [...currentValue, id];
      setValues({ ...values, [inputProps.name]: updatedValue });
    } else {
      const updatedValue = currentValue.filter((valueId) => valueId !== id);
      setValues({ ...values, [inputProps.name]: updatedValue });
    }
  };

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

  return (
    <div ref={popperRef} className="relative">
      <button
        type="button"
        onClick={() => setPopperOpen(!popperOpen)}
        className="form-input-checkbox text-left"
      >
        {values[inputProps.name] === undefined
          ? "-- Select your states --"
          : "-- " + values[inputProps.name].length + " selected --"}
      </button>
      {popperOpen && (
        <div className="absolute top-12 max-w-[550px] max-h-[260px] form-input-checkbox overflow-y-auto p-0 z-10">
          {branchContent.map((item) => (
            <div
              key={item.id}
              className={`border-b border-gray-600 last:border-b-0 p-4 hover:bg-slate-2 ${
                checkIfTrue(item.id) ? "bg-orange-500/10" : ""
              }`}
            >
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  id={`input-${item.id}`}
                  type="checkbox"
                  onChange={() => handleChange(item.id)}
                  checked={checkIfTrue(item.id)}
                  required
                  className="form-input-checkbox-icon"
                />
                <label
                  htmlFor={`input-${item.id}`}
                  className="block pl-[0.15rem] hover:cursor-pointer"
                >
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
