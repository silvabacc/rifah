import { Dua, SavedDua } from "../types";

export const useLocalStorage = () => {
  const saveDua = (duaName: string, duas: Dua[]) => {
    const savedDuas = getSavedDua();

    const combinedDua = duas.reduce(
      (acc, curr) => {
        return {
          title: duaName,
          id: "",
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
