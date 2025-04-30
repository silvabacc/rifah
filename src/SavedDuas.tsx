import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import { Card } from "antd";
import Masonry from "react-masonry-css";
import "./SavedDuas.css";

const SavedDuas = () => {
  const { getSavedDua } = useLocalStorage();
  const [cards, setCards] = useState<SavedDua[]>([]);

  useEffect(() => {
    const savedDuas = getSavedDua();
    setCards(savedDuas);
  }, []);

  return (
    <Masonry
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      breakpointCols={3}
    >
      {cards.map((card, index) => (
        <div
          className="rounded border border-transparent group transition-all duration-300"
          key={`${card.duaName}-${index}`}
        >
          <Card
            hoverable
            title={
              <div className="group-hover:text-violet-300">{card.duaName}</div>
            }
          >
            {card.duas.map((dua, index) => (
              <div key={index} className="group-hover:text-violet-300">
                <p>{dua.arabic}</p>
                <p>{dua.translation}</p>
              </div>
            ))}
          </Card>
        </div>
      ))}
    </Masonry>
  );
};

export default SavedDuas;
