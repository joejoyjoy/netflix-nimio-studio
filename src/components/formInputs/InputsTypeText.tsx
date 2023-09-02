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
}

export default function InputsTypeText(props: Props) {
  const { label, errorMessage, ...inputProps } = props;

  return (
    <div className="flex flex-col">
      <label className="form-label">{label}</label>
      <Suspense fallback={<></>}>
        {inputProps.type === "textarea" ? (
          <TypeTextarea props={props} />
        ) : (
          <InputTypeText props={props} />
        )}
      </Suspense>
      <span className="hidden text-sm text-red-400 my-1">{errorMessage}</span>
    </div>
  );
}

function InputTypeText(props: { props: Props }) {
  const { errorMessage, onChange, id, ...inputProps } = props.props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
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
  const { errorMessage, onChange, id, ...inputProps } = props.props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
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
