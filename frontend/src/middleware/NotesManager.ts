import { backendCall, HttpMethod } from "@/backend/Backend";
import { endpoint } from "@/constants";
import { AddNoteRequest, Note } from "@/types";

export async function loadAllNotes(): Promise<Note[] | null> {
  const axiosResponse = await backendCall(HttpMethod.HTTP_METHOD_GET, endpoint);

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function loadNote(id: number): Promise<Note | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_GET,
    endpoint + "/" + id
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function addNote(note: AddNoteRequest): Promise<Note | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_POST,
    endpoint,
    note
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 201) {
    return null;
  }

  return axiosResponse.data;
}

export async function updateNote(note: Note): Promise<Note | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_PUT,
    endpoint + "/" + note.id,
    note
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function removeNote(id: number): Promise<boolean> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_DELETE,
    endpoint + "/" + id
  );

  if (axiosResponse === null) {
    return false;
  }

  if (axiosResponse.status !== 200) {
    return false;
  }

  return true;
}
