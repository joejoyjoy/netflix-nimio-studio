"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminDataStructure } from "@/constants/admin";

interface pageProps {
  params: { branch: string };
}

export default function ViewAllItems({ params }: pageProps) {
  const [paramsExist, setParamsExist] = useState(false);

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

  if (paramsExist) {
    return <p className="capitalize">Display all: {params.branch}</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 my-6">
      <h2 className="text-3xl uppercase text-center">404 - Page not found</h2>
      <Link href="/admin/movie" className="button-primary">
        Back To Home
      </Link>
    </div>
  );
}
