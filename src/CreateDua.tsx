import { RefObject, useEffect, useRef, useState } from "react";
import duasJson from "./data/duas.json";
import { Alert, Button, Input, Tour, TourProps } from "antd";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CardType, Column } from "./components/Column";
import { Dua } from "./types";
import DuaCardContent from "./components/ColumnCardContent";
import { getCreateDuaSteps } from "./tutorial/createDuaTutorial";

type CreateDuaProps = {
  onSaveDua?: () => void;
  savedTabRef: RefObject<HTMLElement | null>;
};
export default function CreateDua({
  onSaveDua: onSave,
  savedTabRef,
}: CreateDuaProps) {
  const { saveDua, setTutorial, getTutorial } = useLocalStorage();
  const [duaCards, setDuaCards] = useState<CardType<Dua>[]>([]);
  const [duaName, setDuaName] = useState("");
  const [error, setError] = useState("");
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [steps, setSteps] = useState<TourProps["steps"]>([]);

  // For tutorial
  const ref1 = useRef(null);

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

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const el = document.getElementById("motion-card-0");
      if (el) {
        setSteps(getCreateDuaSteps(ref1.current, el, savedTabRef.current));
        setTutorialOpen(!getTutorial());
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
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

  const onFinish = () => {
    setTutorial(false);
    setTutorialOpen(false);
  };

  return (
    <div className="space-y-4">
      <div ref={ref1} className="flex">
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
        <Tour
          open={tutorialOpen}
          onFinish={onFinish}
          onClose={onFinish}
          closable
          steps={steps}
        />
      </div>
    </div>
  );
}
