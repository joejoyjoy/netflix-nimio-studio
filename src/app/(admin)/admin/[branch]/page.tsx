"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminDataStructure } from "@/constants/admin";
import useGetBranchContent from "@/hooks/useGetBranchContent";
import useDeleteBranchItemById from "@/hooks/useDeleteBranchItemById";

interface pageProps {
  params: { branch: string };
}

export default function ViewAllItems({ params }: pageProps) {
  const { branch } = params;
  const [paramsExist, setParamsExist] = useState(false);
  const { branchContent, setBranchContent } = useGetBranchContent(branch);

  const handleDelete = async (id: string, branch: string) => {
    const { deleteBranchItem } = useDeleteBranchItemById(branch, id);

    const res = await deleteBranchItem();

    const deleteFromState = branchContent.filter((item) => item.id !== res.id);
    setBranchContent(deleteFromState);
  };

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

  if (paramsExist) {
    return (
      <>
        <h2 className="text-white text-2xl mb-6">All {branch}</h2>
        <div className="grid gap-4">
          {Object.keys(branchContent).map((item, index) => {
            // @ts-ignore
            const contentItem = branchContent[item];

            return (
              <div
                key={index}
                className="flex justify-between bg-slate-3 border border-slate-2 text-sm rounded-lg outline-none w-full"
              >
                <div className="p-2.5">
                  <p className="text-gray-5">
                    Name:{" "}
                    <b className="font-normal text-gray-300">
                      {contentItem.name}
                    </b>
                  </p>
                </div>
                <div className="flex text-gray-300">
                  <Link
                    href={`/admin/${branch}/form/${contentItem.id}`}
                    className="text-center bg-green-900 bg-opacity-60  border border-slate-2 text-sm outline-none w-full py-2.5 px-5 min-w-[95px] hover:bg-opacity-100 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(contentItem.id, branch)}
                    className="bg-red-900 bg-opacity-60 border border-slate-2 rounded-r-lg text-sm outline-none w-full py-2.5 px-5 min-w-[95px] hover:bg-opacity-100 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {branchContent.length === 0 && (
            <div className="my-8">
              <p className="text-center">No data found, please upload first!</p>
            </div>
          )}
        </div>
      </>
    );
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
