import { Dispatch, SetStateAction, useEffect, useState } from "react";
import duasJson from "./data/duas.json";
import { motion } from "framer-motion";
import { Dua } from "./types";
import { Alert, Button, Card, Divider, Input } from "antd";
import { useLocalStorage } from "./hooks/useLocalStorage";

const { Search } = Input;

type CreateDuaProps = {
  onSaveDua?: () => void;
};
export default function CreateDua({ onSaveDua: onSave }: CreateDuaProps) {
  const { saveDua } = useLocalStorage();
  const [duaCards, setDuaCards] = useState<CardType[]>([]);
  const [duaName, setDuaName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const initialDuas = duasJson.map((dua) => ({
      dua,
      id: dua.id,
      column: "duas" as ColumnType,
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
      selected.map((c) => c.dua)
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
        <Column column="duas" cards={duaCards} setCards={setDuaCards} />
        <Column column="savedduas" cards={duaCards} setCards={setDuaCards} />
      </div>
    </div>
  );
}

type ColumnProps = {
  cards: CardType[];
  searachable?: boolean;
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({ cards, column, searachable, setCards }: ColumnProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards = cards
    .filter((c) => c.column === column)
    .filter(
      (item) =>
        item.dua.translation
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.dua.arabic.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: CardType
  ) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e.nativeEvent, indicators);
    const beforeId = element.dataset.before || "-1";

    if (beforeId === cardId) return;

    setCards((prevCards) => {
      let newCards = [...prevCards];
      const card = newCards.find((c) => c.id === cardId);
      if (!card) return newCards;

      const updatedCard = { ...card, column };
      newCards = newCards.filter((c) => c.id !== cardId);

      if (beforeId === "-1") {
        newCards.push(updatedCard);
      } else {
        const index = newCards.findIndex((c) => c.id === beforeId);
        if (index !== -1) {
          newCards.splice(index, 0, updatedCard);
        }
      }
      return newCards;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e.nativeEvent);
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const getIndicators = () =>
    Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as NodeListOf<HTMLElement>
    );

  const clearHighlights = (els?: HTMLElement[]) => {
    (els || getIndicators()).forEach((el) => (el.style.opacity = "0"));
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const { element } = getNearestIndicator(e, indicators);
    element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
  };

  const showDragDropBox = filteredCards.length === 0 && !searachable;

  return (
    <div className="w-1/2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative h-full  transition-colors space-y-4`}
      >
        {searachable && (
          <Search
            onChange={(v) => setSearchQuery(v.currentTarget.value)}
            placeholder="Search"
          />
        )}
        {filteredCards.map((c) => (
          <MotionCard key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}

        {showDragDropBox && (
          <div className="flex items-center cursor-default justify-center">
            <p className="text-neutral-500 font-bold text-lg">
              Drag and drop duas here
            </p>
          </div>
        )}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
};

const MotionCard = ({ dua, id, column, handleDragStart }: CardProps) => (
  <>
    <DropIndicator beforeId={id} column={column} />
    <motion.div
      layout
      layoutId={id}
      draggable
      onDragStart={(e) => handleDragStart(e, { dua, id, column })}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card hoverable title={dua.title}>
        <p className="text-sm">{dua.arabic}</p>
        <p className="text-sm">{dua.translation}</p>
        <Divider className="my-2" />
        <p className="text-sm text-neutral-500">{dua.source}</p>
      </Card>
    </motion.div>
  </>
);

type DropIndicatorProps = {
  beforeId: string | null;
  column: ColumnType;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => (
  <div
    data-before={beforeId ?? "-1"}
    data-column={column}
    className="my-0.5 h-0.5 bg-violet-400 opacity-0"
  />
);

type ColumnType = "duas" | "savedduas";

type CardType = {
  dua: Dua;
  id: string;
  column: ColumnType;
};
