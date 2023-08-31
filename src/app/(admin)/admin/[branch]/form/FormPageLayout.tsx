"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { adminDataStructure } from "@/constants/admin";
import { AuthContext } from "@/context/AuthContext";

export default function FormPageLayout({
  children,
  branch,
}: {
  children: React.ReactNode;
  branch: string;
}) {
  const { isLoading } = useContext(AuthContext);
  const [paramsExist, setParamsExist] = useState(false);

  useEffect(() => {
    const onParams = () => {
      adminDataStructure.map((table) => {
        if (table.table == branch) {
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

  return children;
}
