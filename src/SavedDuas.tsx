import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import Masonry from "react-masonry-css";
import "./SavedDuas.css";
import DuaCard from "./components/DuaCard";
import { Divider, Modal } from "antd";

const SavedDuas = () => {
  const { getSavedDua } = useLocalStorage();
  const [duaSelectedId, setDuaSelectedId] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState<SavedDua[]>([]);

  const duaSelected = cards.find((card) => duaSelectedId === card.dua.id)

  useEffect(() => {
    const savedDuas = getSavedDua();
    setCards(savedDuas);
  }, []);

  const onCardClick = (duaId: string) => {
    setModalOpen(true);
    setDuaSelectedId(duaId)
  }

  return (
    <Masonry
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      breakpointCols={3}
      >
      {cards.map((card, index) => (
        <div
        onClick={() => onCardClick(card.dua.id)}
        className="rounded bord er border-transparent group transition-all duration-300"
        key={`${card.duaName}-${index}`}
        >
          <DuaCard title={card.duaName} dua={card.dua} />
        </div>
      ))}
      <Modal title={duaSelected?.duaName} open={modalOpen} closable onCancel={() => setModalOpen(false)}>
      <Divider/>
      <div className="flex justify-center flex-col text-center" >
        <p>{duaSelected?.dua.arabic}</p>
        <Divider/>
        <p>{duaSelected?.dua.translation}</p>
      </div>
      </Modal>
    </Masonry>
  );
};

export default SavedDuas;
