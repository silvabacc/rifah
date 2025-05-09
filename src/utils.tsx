import { CardType } from "./components/Column";
import { Dua } from "./types";

export const searchFilter = (card: CardType<Dua>, searchQuery: string) => {
  return (
    card.data.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.data.arabic.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
