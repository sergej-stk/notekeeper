export type Note = {
  id: number;
  text: string;
  timestamp: number;
};

export type User = {
  id: number;
  username: string;
};

export type AddNoteRequest = {
  text: string;
};
