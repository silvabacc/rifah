import { useEffect, useState } from "react";
import { CardType, Column } from "./components/Column";
import duasJson from "./data/duas.json";
import DuaCardContent from "./components/ColumnCardContent";
import { Dua, SavedDua } from "./types";

enum ColumnName {
  Duas = "duas",
  SavedDuas = "savedduas",
}

type EditDuasProps = {
  savedDua: SavedDua;
};
export default function EditDuas({ savedDua }: EditDuasProps) {
  const [cards, setCards] = useState<CardType<Dua>[]>([]);

  useEffect(() => {
    const initialDuas = duasJson.map((dua) => ({
      data: dua,
      id: dua.id,
      column: ColumnName.Duas,
      cardContent: {
        title: dua.title,
        content: <DuaCardContent dua={dua} />,
      },
    }));

    const duaCards = initialDuas.map((dua) => {
      const isAlreadySaved = savedDua.duas.some((sd) => sd.id === dua.id);
      console.log(isAlreadySaved);
      if (isAlreadySaved) {
        return { ...dua, column: ColumnName.SavedDuas };
      }
      return dua;
    });

    setCards(duaCards);
  }, []);

  return (
    <div>
      <div className="flex gap-4 pt-4">
        <Column column={ColumnName.Duas} cards={cards} setCards={setCards} />
        <Column
          column={ColumnName.SavedDuas}
          cards={cards}
          setCards={setCards}
        />
      </div>
    </div>
  );
}
