import { useEffect, useState } from "react";
import {
  GenericResponseData,
  HttpMethod,
  RequesterResponseData,
  useRequester,
} from "../useRequester";
import { store } from "@/src/app/store";
import { getToken, setState } from "@/src/app/store/sessionStore";
import { useSelector } from "react-redux";
import {
  AddFriendRequest,
  AddFriendResponse,
  Friend,
} from "@/src/shared/gen/ts/proto/friend_service";

function addFriend(username: string) {
  const request = AddFriendRequest.create({ username });
  const requester = useRequester();
  requester(HttpMethod.HTTP_METHOD_POST, "friend", request, {})
    .then((val: GenericResponseData<AddFriendResponse>) => {
      //alert("aftetr me" + val.username);
      if (val.success === true) {
        alert("friend added");
      } else {
        alert("error");
      }
      // //alert("user found");
    })
    .catch((e) => {
      alert("error");
      ////alert("me error");
    });
}

function answerFriend(username: string, accept: boolean) {}

export type UseFriend = {
  friends: Friend[];
  addFriend: typeof addFriend;
  answerFriend: typeof answerFriend;
};

export function useFriend(): UseFriend {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {}, []);

  return {
    friends,
    addFriend,
    answerFriend,
  };
}
