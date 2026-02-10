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

export type Me = {
  username: string;
};

export function useMe() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const requester = useRequester();
    requester(HttpMethod.HTTP_METHOD_GET, "users/me", null, {})
      .then((val: GenericResponseData<Me>) => {
        //alert("aftetr me" + val.username);
        store.dispatch(
          setState({
            me: val,
            loginError: false,
          }),
        );
        //console.log("ASSADSA", JSON.stringify(val));
        store.dispatch(
          setState({
            me: val,
          }),
        );
        // //alert("user found");
      })
      .catch((e) => {
        alert("error");
        ////alert("me error");
      });
  }, []);

  return [me];
}
