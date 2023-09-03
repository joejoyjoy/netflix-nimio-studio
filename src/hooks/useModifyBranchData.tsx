import { adminDataStructure } from "@/constants/admin";

export default function useModifyBranchData(
  branch: string,
  id: string,
  values: any
) {
  const modifyData = async () => {
    const dataFn = adminDataStructure.find((item) => item.table === branch);

    if (!dataFn || typeof dataFn.modifyBranchData !== "function") {
      console.error("Invalid function or function not found.");
      return;
    }

    try {
      const res = await dataFn.modifyBranchData(id, values);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    modifyData,
  };
}
