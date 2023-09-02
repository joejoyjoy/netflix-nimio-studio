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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputsTypeFile(props: Props) {
  const { label, errorMessage } = props;

  return (
    <div className="flex flex-col">
      <label className="form-label">{label}</label>
      <InputTypeFile props={props} />
      <span className="hidden text-sm text-red-400 my-1">{errorMessage}</span>
    </div>
  );
}

function InputTypeFile(props: { props: Props }) {
  const { label, errorMessage, onChange, id, values, ...inputProps } =
    props.props;
  const initialValue = values?.cover.secure_url ? values?.cover.secure_url : "";
  const [imagePreview, setImagePreview] = useState<string>(initialValue);

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
        {imagePreview || values?.cover.secure_url ? (
          <button
            type="button"
            onClick={handleFileDelete}
            className="relative label-file-form group overflow-hidden p-3"
          >
            <div className="flex items-center w-full h-full overflow-hidden">
              <Image
                src={imagePreview || values?.cover.secure_url}
                alt="profile icon"
                width={288}
                height={384}
                className="block w-full h-hull object-cover rounded-sm"
                placeholder="blur"
                blurDataURL={imagePreview || values?.cover.secure_url}
                priority
              />
              {values?.cover.secure_url === undefined && (
                <div className="label-file-preview-form group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-40">
                  <CiTrash />
                </div>
              )}
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
