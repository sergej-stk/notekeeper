import { Box, Button, Flex, TextInput, Text } from "@react-native-material/core";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import Container from "../layout/components/Container";
import { BorderSolidBlack } from "../layout/components/Border";

import { useTranslation } from "react-i18next";
import { CardActions } from "../layout/components/card/Card";
import CTextInput from "../layout/components/form/TextInput";
import { Rule } from "../layout/components/rules/RulesField";
import {
  getToken,
  getLoginError,
  login,
  sessionStore,
  performLogin,
  setLoginError,
  setState,
  setToken,
} from "../store/sessionStore";
import { useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { store } from "../store";
import {
  createStaticNavigation,
  Link,
  useNavigation,
} from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouterProps } from "./RouterProps";
import { View } from "react-native";

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function AuthView({ navigation }: RouterProps) {
  //const store = createStore(sessionStore.reducer, applyMiddleware(thunk))
  //  //alert("auth view");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const hasLoginError = useSelector(getLoginError);
  const token: string | null = useSelector(getToken);

  async function clickLogin() {
    setLoading(true);

    const res = await store.dispatch(performLogin());
    let success: string | null = res.payload as string | null;

    if (success === null) {
      store.dispatch(setLoginError(true));
      return;
    }

    store.dispatch(setToken(success));
    navigation.navigate("Home");
  }

  return (
    <>
      <Container verticalCenter horizontalCenter fill>
        <BorderSolidBlack>
          {hasLoginError === true ? (
            <BorderSolidBlack>
              <Text>{t("auth.error")}</Text>
            </BorderSolidBlack>
          ) : (
            <></>
          )}
          <CTextInput
            stateSetter={setUsername}
            rules={[
              {
                rule: Rule.RULE_NO_EMPTY,
              },
              {
                rule: Rule.RULE_EMAIL,
              },
            ]}
            label="username"
          ></CTextInput>
          <CTextInput
            stateSetter={setPassword}
            rules={[
              {
                rule: Rule.RULE_NO_EMPTY,
              },
            ]}
            label="password"
          ></CTextInput>
          <CardActions>
            <View>Registrieren</View>
            <Button
              loading={loading}
              onPress={clickLogin}
              title={t("auth.login")}
            />
          </CardActions>
        </BorderSolidBlack>
      </Container>
    </>
  );
}
