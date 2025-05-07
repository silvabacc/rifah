import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SavedDua } from "./types";
import Masonry from "react-masonry-css";
import "./SavedDuas.css";
import ColumnCard from "./components/ColumnCard";
import {
  Button,
  Divider,
  Drawer,
  Empty,
  Modal,
  Popconfirm,
  PopconfirmProps,
} from "antd";
import DuaCardContent from "./components/ColumnCardContent";
import EditDuas from "./EditDuas";

const SavedDuas = () => {
  const { getSavedDuas, deleteDua } = useLocalStorage();
  const [duaSelectedId, setDuaSelectedId] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState<SavedDua[]>([]);
  const [drawOpen, setDrawOpen] = useState(false);

  const duaSelected = cards.find((card) => duaSelectedId === card.dua.id);

  useEffect(() => {
    if (!drawOpen || !modalOpen) {
      const savedDuas = getSavedDuas();
      setCards(savedDuas);
    }
  }, [drawOpen, modalOpen]);

  const onCardClick = (duaId: string) => {
    setModalOpen(true);
    setDuaSelectedId(duaId);
  };

  const confirm: PopconfirmProps["onConfirm"] = () => {
    if (duaSelectedId) {
      deleteDua(duaSelectedId);
    }
    setModalOpen(false);
  };

  return (
    <div>
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
        <div className="flex justify-between space-x-2 w-full items-end">
          <Popconfirm
            title="Delete dua?"
            description="Are you sure to delete this dua?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <div className="space-x-2">
            <Button className="mt-4" onClick={() => setDrawOpen(true)}>
              Edit
            </Button>
            <Button type="primary" className="mt-4">
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Drawer
        width={"100%"}
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        destroyOnClose
      >
        {duaSelected && (
          <EditDuas savedDua={duaSelected} close={() => setDrawOpen(false)} />
        )}
      </Drawer>
      {!cards.length && (
        <Empty className="mt-8" description={"You have no duas saved 😢"} />
      )}
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
      </Masonry>
    </div>
  );
};

export default SavedDuas;
