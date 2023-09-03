import { adminDataStructure, initialValue } from "@/constants/admin";
import { transformToEditable } from "@/utils/transformToEditable";
import { useEffect, useState } from "react";

export default function useGetBranchDataById(branch: string, id: string) {
  const [idExist, setIdExist] = useState(false);
  const [values, setValues] = useState(
    initialValue[branch as keyof typeof initialValue]
  );

  useEffect(() => {
    const getDataOfBranch = async () => {
      const dataFn = adminDataStructure.find((item) => item.table === branch);

      if (!dataFn || typeof dataFn.getBranchData !== "function") {
        console.error(
          "Invalid getBranchData function or data function not found."
        );
        return;
      }

      try {
        const res = await dataFn.getBranchDataById(id);

        if (res !== null) {
          setIdExist(true);

          if (branch === "movie") {
            const syncWithValues = transformToEditable(res);
            setValues(syncWithValues);
          } else {
            setValues(res);
          }
        } else {
          setIdExist(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataOfBranch();
  }, [branch]);

  return {
    values,
    setValues,
    idExist,
  };
}
