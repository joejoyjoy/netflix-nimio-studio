import { adminDataStructure, initialValueArray } from "@/constants/admin";
import { useEffect, useState } from "react";

export default function useGetBranchContent(branch: string) {
  const [branchContent, setBranchContent] = useState(
    initialValueArray[branch as keyof typeof initialValueArray]
  );

  useEffect(() => {
    const getDataOfBranch = async () => {
      const dataFn = adminDataStructure.find((item) => item.table === branch);

      if (!dataFn || typeof dataFn.getBranchData !== "function") {
        console.error("Invalid function or function not found.");
        return;
      }

      try {
        const res = await dataFn.getBranchData();
        setBranchContent(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataOfBranch();
  }, [branch]);

  return {
    branchContent,
    setBranchContent,
  };
}
