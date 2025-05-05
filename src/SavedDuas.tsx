import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import Masonry from "react-masonry-css";
import "./SavedDuas.css";
import ColumnCard from "./components/ColumnCard";
import { Button, Divider, Modal } from "antd";
import DuaCardContent from "./components/ColumnCardContent";

const SavedDuas = () => {
  const { getSavedDua } = useLocalStorage();
  const [duaSelectedId, setDuaSelectedId] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState<SavedDua[]>([]);

  const duaSelected = cards.find((card) => duaSelectedId === card.dua.id);

  useEffect(() => {
    const savedDuas = getSavedDua();
    setCards(savedDuas);
  }, []);

  const onCardClick = (duaId: string) => {
    setModalOpen(true);
    setDuaSelectedId(duaId);
  };

  return (
    <Masonry
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      breakpointCols={3}
    >
      {cards.map((card, index) => (
        <div
          className="rounded bord er border-transparent group transition-all duration-300"
          key={`${card.duaName}-${index}`}
        >
          <ColumnCard
            onClick={() => onCardClick(card.dua.id)}
            cardContent={{
              title: <div>{card.duaName}</div>,
              content: <DuaCardContent dua={card.dua} />,
            }}
          />
        </div>
      ))}
      <Modal
        title={<div>{duaSelected?.duaName}</div>}
        open={modalOpen}
        closable
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Divider />
        <div className="flex justify-center flex-col text-center">
          <p>{duaSelected?.dua.arabic}</p>
          <Divider />
          <p>{duaSelected?.dua.translation}</p>
        </div>
        <div className="flex justify-end space-x-2 w-full">
          <Button className="mt-4">Edit</Button>
          <Button type="primary" className="mt-4">
            Close
          </Button>
        </div>
      </Modal>
    </Masonry>
  );
};

export default SavedDuas;
