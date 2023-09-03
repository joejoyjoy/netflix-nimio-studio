"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { adminDataStructure } from "@/constants/admin";
import { AuthContext } from "@/context/AuthContext";
import EditItem from "./formPage";
import useGetBranchDataById from "@/hooks/useGetBranchDataById";

interface pageProps {
  params: { id: string; branch: string };
}

export default function EditItemLayout({ params }: pageProps) {
  const { isLoading } = useContext(AuthContext);
  const [paramsExist, setParamsExist] = useState(false);
  const { idExist } = useGetBranchDataById(params.branch, params.id);

  useEffect(() => {
    const onParams = () => {
      adminDataStructure.map((table) => {
        if (table.table == params.branch) {
          setParamsExist(true);
        }
      });
    };
    onParams();
  }, [paramsExist]);

  if (!isLoading && !paramsExist) {
    return (
      <div className="flex flex-col items-center gap-6 my-6">
        <h2 className="text-3xl uppercase text-center">404 - Page not found</h2>
        <Link href="/admin/movie" className="button-primary">
          Back To Home
        </Link>
      </div>
    );
  }

  if (!idExist) {
    return (
      <div className="flex flex-col items-center gap-6 my-6">
        <h2 className="text-3xl text-center text-white">
          Provided {params.branch} does not exist
        </h2>
        <Link href="/admin/movie" className="button-primary">
          Back To Home
        </Link>
      </div>
    );
  }

  return <EditItem params={params} />;
}
