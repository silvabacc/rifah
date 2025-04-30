import { Dua, SavedDua } from "../types";

export const useLocalStorage = () => {
  const saveDua = (duaName: string, duas: Dua[]) => {
    const savedDuas = getSavedDua();

    localStorage.setItem(
      "duas",
      JSON.stringify([...savedDuas, { duaName: duaName, duas: duas }])
    );
  };

  const getSavedDua = () => {
    const duas = localStorage.getItem("duas");
    if (duas) {
      return JSON.parse(duas) as SavedDua[];
    }

    return [];
  };

  return { saveDua, getSavedDua };
};
