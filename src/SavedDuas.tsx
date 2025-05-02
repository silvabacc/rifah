import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import Masonry from "react-masonry-css";
import "./SavedDuas.css";
import DuaCard from "./components/DuaCard";

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
          <DuaCard title={card.duaName} dua={card.dua} />
        </div>
      ))}
    </Masonry>
  );
};

export default SavedDuas;
