"use client";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadItemForm } from "@/lib/upload.actions";
import { ModalContext } from "@/context/ModalContext";
import { initialValue } from "@/constants/admin";
import FormComponent from "@/components/FormComponent";

interface pageProps {
  params: { id: string; branch: string };
}

export default function EditItem({ params }: pageProps) {
  const { branch, id } = params;
  const [values, setValues] = useState(
    initialValue[branch as keyof typeof initialValue]
  );
  const { openModal } = useContext(ModalContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await uploadItemForm({ values, branch });
    if (response.success === "NOT_FOUND") return;
    openModal(response);
    if (response.success) {
      const url = "/admin/" + branch;
      setValues(initialValue[branch as keyof typeof initialValue]);
      router.push(url);
    }
  };

  return (
    <div className="max-w-[550px] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <h2 className="text-xl text-white mb-6">Edit {branch}</h2>
        <FormComponent params={params} values={values} setValues={setValues} />
        <button className="button-primary mx-auto mt-6">Submit</button>
      </form>
    </div>
  );
}
