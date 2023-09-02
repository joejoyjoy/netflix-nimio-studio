"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { modifyItemForm } from "@/lib/modify.actions";
import { ModalContext } from "@/context/ModalContext";
import { adminDataStructure, initialValue } from "@/constants/admin";
import FormComponent from "@/components/FormComponent";
import { transformToEditable } from "@/utils/transformToEditable";

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
    console.log(values);

    const response = await modifyItemForm({ id, values, branch });
    if (response.success === "NOT_FOUND") return;
    openModal(response);
    if (response.success) {
      const url = "/admin/" + branch;
      setValues(initialValue[branch as keyof typeof initialValue]);
      router.push(url);
    }
  };

  useEffect(() => {
    const getDataOfBranch = async () => {
      const dataFn = adminDataStructure.find(
        (item) => item.table === params.branch
      );

      if (!dataFn || typeof dataFn.content !== "function") {
        console.error("Invalid content function or data function not found.");
        return;
      }

      try {
        const res = await dataFn.getById(params.id);

        if (branch === "movie") {
          const syncWithValues = transformToEditable(res);
          setValues(syncWithValues);
        } else {
          setValues(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataOfBranch();
  }, []);

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
