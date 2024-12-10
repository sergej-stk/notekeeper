export type Note = {
  id: number;
  user: number;
  text: string;
  timestamp: number;
};

export type User = {
  id: number;
  username: string;
};

export type AddNoteRequest = {
  user: number;
  text: string;
};
