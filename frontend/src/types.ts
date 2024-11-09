export type Note = {
  id: number;
  text: string;
  timestamp: string;
};

export type AddNoteRequest = {
  text: string;
};
