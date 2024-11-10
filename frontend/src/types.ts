export type Note = {
  id: number;
  text: string;
  timestamp: number;
};

export type AddNoteRequest = {
  text: string;
};
