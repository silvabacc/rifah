import { Dispatch, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import ColumnCard from "./ColumnCard";

export type CardType<T> = {
  id: string;
  column: string;
  data: T;
  cardContent: {
    title: ReactNode;
    content: ReactNode;
  };
};

type ColumnProps<T> = {
  cards: CardType<T>[];
  searachable?: boolean;
  column: string;
  setCards: Dispatch<SetStateAction<CardType<T>[]>>;
};

export const Column = <T,>({ cards, column, setCards }: ColumnProps<T>) => {
  const filteredCards = cards.filter((c) => c.column === column);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement> | MouseEvent | TouchEvent | PointerEvent,
    card: CardType<T>
  ) => {
    if ("dataTransfer" in e) {
      (e as React.DragEvent<HTMLDivElement>).dataTransfer.setData(
        "cardId",
        card.id
      );
    }
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

  const showDragDropBox = filteredCards.length === 0;

  return (
    <div className="w-1/2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative h-full  transition-colors space-y-4`}
      >
        {filteredCards.map((c, index) => {
          return (
            <div id={`motion-card-${index}`} key={c.id}>
              <MotionCard {...c} handleDragStart={handleDragStart} />
            </div>
          );
        })}

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

type CardProps<T> = CardType<T> & {
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement> | MouseEvent | TouchEvent | PointerEvent,
    card: CardType<T>
  ) => void;
};

const MotionCard = <T,>({
  id,
  column,
  handleDragStart,
  data,
  cardContent,
}: CardProps<T>) => (
  <>
    <DropIndicator beforeId={id} column={column} />
    <motion.div
      layout
      layoutId={id}
      draggable
      onDragStart={(e) => handleDragStart(e, { id, column, data, cardContent })}
      className="group transition-all duration-300 cursor-grab active:cursor-grabbing"
    >
      <ColumnCard cardContent={cardContent} />
    </motion.div>
  </>
);

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => (
  <div
    data-before={beforeId ?? "-1"}
    data-column={column}
    className="my-0.5 h-0.5 bg-violet-400 opacity-0"
  />
);
