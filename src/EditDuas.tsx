import { useEffect, useState } from "react";
import { CardType, Column } from "./components/Column";
import duasJson from "./data/duas.json";
import DuaCardContent from "./components/ColumnCardContent";
import { ColumnName, Dua, SavedDua } from "./types";
import { Alert, Button, Divider, Input, Space } from "antd";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { searchFilter } from "./utils";

const { Search } = Input;

type EditDuasProps = {
  savedDua: SavedDua;
  close?: () => void;
};
export default function EditDuas({ savedDua, close }: EditDuasProps) {
  const { updateSavedDua } = useLocalStorage();
  const [cards, setCards] = useState<CardType<Dua>[]>([]);
  const [duaName, setDuaName] = useState(savedDua.duaName);
  const [error, setError] = useState("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!duaName) {
      setError("Please name your dua");
    } else {
      setError("");
    }
  }, [duaName]);

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
      if (isAlreadySaved) {
        return { ...dua, column: ColumnName.SavedDuas };
      }
      return dua;
    });

    setCards(duaCards);
  }, [savedDua]);

  const onDuaSave = () => {
    if (!duaName) {
      return;
    }

    const updatedDuas = cards
      .filter((card) => card.column === ColumnName.SavedDuas)
      .map((card) => card.data);

    const duaArabic = updatedDuas.reduce((acc, curr) => {
      return acc.concat(" ", curr.arabic);
    }, "");
    const duaTranslation = updatedDuas.reduce((acc, curr) => {
      return acc.concat(" ", curr.translation);
    }, "");

    updateSavedDua(savedDua.dua.id, {
      duaName: duaName,
      duas: updatedDuas,
      dua: {
        ...savedDua.dua,
        arabic: duaArabic,
        translation: duaTranslation,
      },
    });

    close?.();
  };

  return (
    <div>
      <div className="flex w-full">
        <Input
          className="flex-1"
          placeholder="Dua name"
          value={duaName}
          onChange={(v) => setDuaName(v.currentTarget.value)}
        />
        <Space className="ml-2">
          <Button onClick={close}>Cancel</Button>
          <Button type="primary" onClick={onDuaSave}>
            Save
          </Button>
        </Space>
      </div>
      {error && <Alert type="error" showIcon message={error} />}
      <Divider />
      <div className="w-1/2 pb-4">
        <Search
          onChange={(v) => setSearch(v.currentTarget.value)}
          placeholder="Search dua..."
        />
      </div>
      <div className="flex gap-4">
        <Column
          column={ColumnName.Duas}
          cards={cards.filter((card) => searchFilter(card, search))}
          setCards={setCards}
        />
        <Column
          column={ColumnName.SavedDuas}
          cards={cards}
          setCards={setCards}
        />
      </div>
    </div>
  );
}
