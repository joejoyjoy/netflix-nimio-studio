import { ChangeEvent, FocusEvent, Suspense, useState } from "react";

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

function InputTypeFile(props: { props: Props }) {
  const { label, errorMessage, onChange, id, ...inputProps } = props.props;

  return (
    <>
      <input
        {...inputProps}
        onChange={onChange}
        className="block w-full text-sm  border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
      />
    </>
  );
}
