export type Dua = {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
};

export type SavedDua = {
  duaName: string;
  duas: Dua[];
  dua: Dua;
};

export enum ColumnName {
  Duas = "duas",
  SavedDuas = "savedduas",
}
