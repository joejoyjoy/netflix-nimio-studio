import { ChangeEvent, Dispatch, SetStateAction } from "react";
import InputsTypeText from "@/components/formInputs/InputsTypeText";
import InputsTypeFile from "@/components/formInputs/InputsTypeFile";
import InputsTypeCheckbox from "@/components/formInputs/InputsTypeCheckbok";
import { adminDataStructure, initialValue } from "@/constants/admin";
import {
  checkboxFields,
  fileFields,
  textAndTextareaFields,
} from "@/utils/formInputs";

interface pageProps {
  params: { branch: string };
  values: InitialValue;
  setValues: Dispatch<SetStateAction<InitialValue>>;
}

export default function FormComponent({
  params,
  values,
  setValues,
}: pageProps) {
  const { branch } = params;
  const valuesForBranch =
    values as (typeof initialValue)[keyof typeof initialValue];

  const inputs = adminDataStructure.filter((item) => item.table === branch)[0]
    .inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.type === "file") {
      const file = target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append(target.name, file);

        setValues({ ...values, [target.name]: formData });
      }
    } else {
      setValues({ ...values, [target.name]: target.value });
    }
  };

  return (
    <div className="grid gap-6 mb-6">
      {textAndTextareaFields(inputs).map((input) => (
        <InputsTypeText
          key={input.id}
          {...input}
          value={valuesForBranch[input.name as keyof typeof valuesForBranch]}
          onChange={onChange}
        />
      ))}
      {fileFields(inputs).map((input) => (
        <InputsTypeFile
          key={input.id}
          {...input}
          value={valuesForBranch[input.name as keyof typeof valuesForBranch]}
          onChange={onChange}
        />
      ))}
      {checkboxFields(inputs).map((input) => (
        <InputsTypeCheckbox
          key={input.id}
          {...input}
          value={valuesForBranch[input.name as keyof typeof valuesForBranch]}
          values={values}
          setValues={setValues}
        />
      ))}
    </div>
  );
}
