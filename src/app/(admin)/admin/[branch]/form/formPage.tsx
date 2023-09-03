"use client";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/ModalContext";
import FormComponent from "@/components/FormComponent";
import { initialValue } from "@/constants/admin";
import useUploadBranchData from "@/hooks/useUploadBranchData";

interface pageProps {
  params: { branch: string };
}

export default function UploadItem({ params }: pageProps) {
  const { branch } = params;
  const [values, setValues] = useState(
    initialValue[branch as keyof typeof initialValue]
  );
  const { openModal } = useContext(ModalContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { uploadData } = useUploadBranchData(branch, values);
    e.preventDefault();

    const res = await uploadData();

    if (res.success === "NOT_FOUND") return;
    openModal(res);
    if (res.success) {
      const url = "/admin/" + branch;
      setValues(initialValue[branch as keyof typeof initialValue]);
      router.push(url);
    }
  };

  return (
    <div className="max-w-[550px] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <h2 className="text-xl text-white mb-6">Upload {branch}</h2>
        <FormComponent params={params} values={values} setValues={setValues} />
        <button className="button-primary mx-auto mt-6">Submit</button>
      </form>
    </div>
  );
}
