import { endpoint } from "@/constants";
import { useMainStore } from "@/store/mainStore";
import { AddNoteRequest, Note } from "@/types";
import axios, { AxiosResponse } from "axios";

export async function loadAllNotes(): Promise<Note[] | null> {
  const mainStore = useMainStore();
  const config = {
    headers: { Authorization: `Bearer ${mainStore.token}` },
  };
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.get(endpoint, config);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function loadNote(id: number): Promise<Note | null> {
  const mainStore = useMainStore();
  const config = {
    headers: { Authorization: `Bearer ${mainStore.token}` },
  };
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.get(endpoint + "/" + id, config);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function addNote(note: AddNoteRequest): Promise<Note | null> {
  const mainStore = useMainStore();
  const config = {
    headers: { Authorization: `Bearer ${mainStore.token}` },
  };
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.post(endpoint, note, config);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 201) {
    return null;
  }

  return axiosResponse.data;
}

export async function updateNote(note: Note): Promise<Note | null> {
  const mainStore = useMainStore();
  const config = {
    headers: { Authorization: `Bearer ${mainStore.token}` },
  };
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.put(endpoint + "/" + note.id, note, config);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function removeNote(id: number): Promise<boolean> {
  const mainStore = useMainStore();
  const config = {
    headers: { Authorization: `Bearer ${mainStore.token}` },
  };
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.delete(endpoint + "/" + id, config);
  } catch (e) {
    return false;
  }

  if (axiosResponse === null) {
    return false;
  }

  if (axiosResponse.status !== 200) {
    return false;
  }

  return true;
}
