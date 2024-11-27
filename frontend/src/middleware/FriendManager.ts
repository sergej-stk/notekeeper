import { backendCall, HttpMethod } from "@/backend/Backend";
import { friendEndpoint } from "@/constants";
import {
  AddFriendRequest,
  AddFriendResponse,
  AnswerAddFriendRequest,
  GetFriendListResponse,
} from "@/shared/gen/ts/proto/friend_service";
import { Note } from "@/types";

export async function loadAllFriends(): Promise<GetFriendListResponse | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_GET,
    friendEndpoint
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}

export async function addFriend(
  username: string
): Promise<AddFriendResponse | null> {
  const request: AddFriendRequest = {
    username,
  };
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_POST,
    friendEndpoint,
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

export async function answerFriendRequest(
  username: string,
  accept: boolean
): Promise<Note | null> {
  const request: AnswerAddFriendRequest = {
    username,
    accept,
  };
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_POST,
    friendEndpoint,
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
