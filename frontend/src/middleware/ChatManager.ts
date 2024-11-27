import { backendCall, HttpMethod } from "@/backend/Backend";
import { chatEndpoint } from "@/constants";
import {
  GetAllChatMessagesResponse,
  SendChatMessageRequest,
  StartChatRequest,
  StartChatResponse,
} from "@/shared/gen/ts/proto/chat_service";

export async function startChat(
  usernames: string[]
): Promise<StartChatResponse[] | null> {
  const request: StartChatRequest = {
    usernames,
  };
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_POST,
    chatEndpoint,
    request
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function sendChatMessage(
  roomId: number,
  message: string
): Promise<boolean> {
  const request: SendChatMessageRequest = {
    roomId,
    message,
  };
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_POST,
    chatEndpoint + roomId,
    request
  );

  if (axiosResponse === null) {
    return false;
  }

  if (axiosResponse.status !== 200) {
    return false;
  }

  return true;
}

export async function getAllChatMessages(
  roomId: number
): Promise<GetAllChatMessagesResponse | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_GET,
    chatEndpoint + roomId
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 201) {
    return null;
  }

  return axiosResponse.data;
}
