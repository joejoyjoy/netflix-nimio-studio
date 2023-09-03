import { adminDataStructure } from "@/constants/admin";

export default function useDeleteBranchItemById(branch: string, id: string) {
  const deleteBranchItem = async () => {
    const dataFn = adminDataStructure.find((item) => item.table === branch);

    if (!dataFn || typeof dataFn.deleteBranchItem !== "function") {
      console.error(
        "Invalid deleteBranchItem function or data function not found."
      );
      return;
    }

    try {
      const res = await dataFn.deleteBranchItem(id);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    deleteBranchItem,
  };
}
