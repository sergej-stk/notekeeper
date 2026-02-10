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

export type Users = {
  username: string;
}[];

export function useUsers() {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const requester = useRequester();
    requester(HttpMethod.HTTP_METHOD_GET, "users", null, {})
      .then((val: GenericResponseData<Users>) => {
        alert(JSON.stringify(val));
        setUsers(val);
      })
      .catch((e) => {
        alert("error");
        ////alert("me error");
      });
  }, []);

  return [users];
}
