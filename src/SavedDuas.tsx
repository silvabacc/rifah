import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import { Card, Space } from "antd";

const SavedDuas = () => {
  const { getSavedDua } = useLocalStorage();
  const [cards, setCards] = useState<SavedDua[]>([]);

  useEffect(() => {
    const savedDuas = getSavedDua();
    setCards(savedDuas);
  }, []);

  return (
    <Space direction="vertical" className="w-full" size="middle">
      {cards.map((card, index) => (
        <Card title={card.duaName} key={`${card.duaName}-${index}`}>
          {card.duas.map((dua, index) => (
            <div key={index}>
              <p>{dua.arabic}</p>
              <p>{dua.translation}</p>
            </div>
          ))}
        </Card>
      ))}
    </Space>
  );
};

export default SavedDuas;
