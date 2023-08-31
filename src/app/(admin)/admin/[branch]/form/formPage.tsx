"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { adminDataStructure, initialValue } from "@/constants/admin";
import FormInputs from "@/components/FormInputs";
import { useRouter } from 'next/navigation'
import { uploadItemForm } from "@/lib/upload.actions";
import { ModalContext } from "@/context/ModalContext";

interface pageProps {
  params: { branch: string };
}

export default function UploadItem({ params }: pageProps) {
  const { branch } = params;
  const [values, setValues] = useState(
    initialValue[branch as keyof typeof initialValue]
  );
  const valuesForBranch =
    values as (typeof initialValue)[keyof typeof initialValue];
  const { openModal } = useContext(ModalContext);
  const router = useRouter()

  const inputs = adminDataStructure.filter((item) => item.table === branch)[0]
    .inputs;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await uploadItemForm({ values, branch });
    openModal(response);
    if (response.success) {
      const url = "/admin/" + branch;
      setValues(initialValue[branch as keyof typeof initialValue]);
      router.push(url);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[550px] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <h2 className="text-xl text-white mb-6">Upload {branch}</h2>
        <div className="grid gap-6 mb-6">
          {inputs.map((input) => (
            <FormInputs
              key={input.id}
              {...input}
              value={
                valuesForBranch[input.name as keyof typeof valuesForBranch]
              }
              onChange={onChange}
            />
          ))}
        </div>
        <button className="button-primary mx-auto mt-6">Submit</button>
      </form>
    </div>
  );
}
