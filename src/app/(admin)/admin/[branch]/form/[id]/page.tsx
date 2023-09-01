"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { adminDataStructure } from "@/constants/admin";
import { AuthContext } from "@/context/AuthContext";

interface pageProps {
  params: { id: string; branch: string };
}

export default function EditItem({ params }: pageProps) {
  const { isLoading } = useContext(AuthContext);
  const [paramsExist, setParamsExist] = useState(false);

  console.log(params.id);
  console.log(params.branch);

  useEffect(() => {
    const onParams = () => {
      adminDataStructure.map((table) => {
        if (table.table == params.id) {
          setParamsExist(true);
        }
      });
    };
    onParams();
  }, [paramsExist]);

  if (true) {
    return (
      <div className="flex flex-col items-center gap-6 my-6">
        <h2 className="text-3xl uppercase text-center">404 - Page not found</h2>
        <Link href="/admin/movie" className="button-primary">
          Back To Home
        </Link>
      </div>
    );
  }

  return <h1>Hello</h1>;
}
