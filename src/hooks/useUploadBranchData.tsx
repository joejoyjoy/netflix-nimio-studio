import { adminDataStructure } from "@/constants/admin";

function useUploadBranchData(branch: string, value: any) {
  const uploadData = async () => {
    const dataFn = adminDataStructure.find((item) => item.table === branch);

    if (!dataFn || typeof dataFn.uploadBranchData !== "function") {
      console.error("Invalid function or function not found.");
      return;
    }

    try {
      const res = await dataFn.uploadBranchData(value);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    uploadData,
  };
}

export default useUploadBranchData;
