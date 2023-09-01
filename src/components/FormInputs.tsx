import { ChangeEvent, FocusEvent, FormEvent, Suspense, useState } from "react";
import Image from "next/image";
import { PiPlus } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";

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
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFile = (e: FormEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        console.log(imageDataUrl);
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
