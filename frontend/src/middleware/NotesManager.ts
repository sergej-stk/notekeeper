import { endpoint } from "@/constants";
import { AddNoteRequest, Note } from "@/types";
import axios, { AxiosResponse } from "axios";

export async function loadAllNotes(): Promise<Note[] | null> {
  const axiosResponse: AxiosResponse = await axios.get(endpoint);

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function loadNote(id: number): Promise<Note | null> {
  const axiosResponse: AxiosResponse = await axios.get(endpoint + "/" + id);

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}
export async function addNote(note: AddNoteRequest): Promise<Note | null> {
  const axiosResponse: AxiosResponse = await axios.post(endpoint, note);

  if (axiosResponse.status !== 201) {
    return null;
  }

  return axiosResponse.data;
}
export async function updateNote(note: Note): Promise<Note | null> {
  return null;
}
export async function removeNote(id: number): Promise<boolean> {
  return false;
}
