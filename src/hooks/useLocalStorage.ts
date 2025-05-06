import { Dua, SavedDua } from "../types";
import { v4 as uuidv4 } from "uuid";

export const useLocalStorage = () => {
  const saveDua = (duaName: string, duas: Dua[]) => {
    const savedDuas = getSavedDuas();
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

  type UpdateDua = Partial<SavedDua>;
  const updateSavedDua = (duaId: string, { dua, duaName, duas }: UpdateDua) => {
    const savedDuas = getSavedDuas();
    const savedDuaIndex = savedDuas.findIndex((d) => d.dua.id === duaId);

    if (savedDuaIndex !== -1) {
      const savedDua = savedDuas[savedDuaIndex];

      const newUpdatedDua: SavedDua = {
        duaName: duaName ?? savedDua.duaName,
        dua: dua ?? savedDua.dua,
        duas: duas ?? savedDua.duas, // fixed typo here
      };

      savedDuas[savedDuaIndex] = newUpdatedDua;

      localStorage.setItem("duas", JSON.stringify(savedDuas));
    }
  };

  const getSavedDuas = () => {
    const duas = localStorage.getItem("duas");
    if (duas) {
      return JSON.parse(duas) as SavedDua[];
    }

    return [];
  };

  return { saveDua, getSavedDuas, updateSavedDua };
};
