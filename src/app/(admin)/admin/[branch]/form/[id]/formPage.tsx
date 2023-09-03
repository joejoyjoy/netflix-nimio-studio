"use client";

import { FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import useGetBranchDataById from "@/hooks/useGetBranchDataById";
import useModifyBranchData from "@/hooks/useModifyBranchData";
import { ModalContext } from "@/context/ModalContext";
import { initialValue } from "@/constants/admin";
import FormComponent from "@/components/FormComponent";

interface pageProps {
  params: { id: string; branch: string };
}

export default function EditItem({ params }: pageProps) {
  const { branch, id } = params;
  const { values, setValues } = useGetBranchDataById(branch, id);
  const { openModal } = useContext(ModalContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { modifyData } = useModifyBranchData(branch, id, values);
    e.preventDefault();

    const res = await modifyData();

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
        <h2 className="text-xl text-white mb-6">Edit {branch}</h2>
        <FormComponent params={params} values={values} setValues={setValues} />
        <button className="button-primary mx-auto mt-6">Submit</button>
      </form>
    </div>
  );
}
