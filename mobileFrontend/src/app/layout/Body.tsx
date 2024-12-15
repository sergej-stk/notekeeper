import { Button } from "@react-native-material/core";
import { login } from "../store/sessionStore";
import { LoginRequest } from "@/src/shared/gen/ts/proto/auth_service";
import { store } from "../store";
import Routes from "../router/router";
import { ComponentProps } from "react";
import { View } from "react-native";

export function handleLogin(req: LoginRequest) {
  store.dispatch(login(req));
}

export function Body(props: ComponentProps<"div">) {
  return <View>{props.children}</View>;
}
