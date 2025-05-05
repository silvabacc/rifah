import { useEffect, useState } from "react";
import duasJson from "./data/duas.json";
import { Alert, Button, Input } from "antd";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CardType, Column } from "./components/Column";
import { Dua } from "./types";
import DuaCardContent from "./components/ColumnCardContent";

type CreateDuaProps = {
  onSaveDua?: () => void;
};
export default function CreateDua({ onSaveDua: onSave }: CreateDuaProps) {
  const { saveDua } = useLocalStorage();
  const [duaCards, setDuaCards] = useState<CardType<Dua>[]>([]);
  const [duaName, setDuaName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const initialDuas = duasJson.map((dua) => ({
      data: dua,
      id: dua.id,
      column: "duas",
      cardContent: {
        title: dua.title,
        content: <DuaCardContent dua={dua} />,
      },
    }));
    setDuaCards(initialDuas);
  }, []);

  const onSaveDua = () => {
    if (!duaName.trim()) {
      setError("Please name your dua");
      return;
    }
    const selected = duaCards.filter((c) => c.column === "savedduas");
    if (selected.length === 0) {
      setError("You haven't selected any duas");
      return;
    }
    saveDua(
      duaName,
      selected.map((c) => c.data)
    );
    setDuaName("");
    setError("");
    onSave?.();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuaName(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex">
        <Input
          value={duaName}
          onChange={onChange}
          placeholder="Dua name"
          className="flex-1"
        />
        <Button className="ml-2" onClick={onSaveDua}>
          Save Dua
        </Button>
      </div>
      {error && (
        <Alert
          type="error"
          className="border rounded-sm border-red-500"
          message={error}
        />
      )}
      <div className="flex gap-4 pt-4">
        <Column column="duas" cards={duaCards} setCards={setDuaCards}></Column>
        <Column column="savedduas" cards={duaCards} setCards={setDuaCards} />
      </div>
    </div>
  );
}
