import { Dua, SavedDua } from "../types";
import { v4 as uuidv4 } from "uuid";

export const useLocalStorage = () => {
  const saveDua = (duaName: string, duas: Dua[]) => {
    const savedDuas = getSavedDua();
    const id = uuidv4();

    const combinedDua = duas.reduce(
      (acc, curr) => {
        return {
          title: duaName,
          id: id,
          latin: curr.latin.concat(" ", acc.latin),
          arabic: curr.arabic.concat(" ", acc.arabic),
          translation: curr.translation.concat(" ", acc.translation),
          source: "",
        };
      },
      {
        title: "",
        id: "",
        latin: "",
        arabic: "",
        translation: "",
        source: "",
      } as Dua
    );

    localStorage.setItem(
      "duas",
      JSON.stringify([
        ...savedDuas,
        { duaName: duaName, duas: duas, dua: combinedDua },
      ])
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
