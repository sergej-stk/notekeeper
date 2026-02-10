import { RouteParams } from "expo-router";
import React, { RefObject, useEffect } from "react";

import { NavigationScreenProp, NavigationState } from "react-navigation";
import { useMe } from "../hooks/net/apiHooks/useMe";
import { RouterProps } from "./RouterProps";
import { getToken, setState } from "../store/sessionStore";
import { store } from "../store";
import { useSelector } from "react-redux";
import { useUsers } from "../hooks/net/apiHooks/useUsers";
import { useFriend } from "../hooks/net/apiHooks/useFriend";
import Card, {
  CardActions,
  CardText,
  CardTitle,
} from "../layout/components/card/Card";
import Form, { FormProps } from "../layout/components/form/Form";
import { LayoutComponentProps } from "../layout/components/types";
import useFormValidator from "../layout/components/rules/hooks/useFormValidator";
import TextInput from "../layout/components/form/TextInput";
import { Rule } from "../layout/components/rules/RulesField";
import PageSplitter, {
  PageSplitterRow,
} from "../layout/components/PageSplitter";
import { Flex } from "@react-native-material/core";

export default function HomeView({ navigation }: RouterProps) {
  return (
    <Flex fill w="100%" style={{ backgroundColor: "blue" }}>
      <PageSplitter
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        rows={[
          <PageSplitterRow width={100}>A</PageSplitterRow>,
          <PageSplitterRow width={500} style={{ width: "100%" }}>
            B
          </PageSplitterRow>,
          <PageSplitterRow width={100}>A</PageSplitterRow>,
        ]}
      ></PageSplitter>
    </Flex>
  );
  //const [me] = useMe();
  //const [users] = useUsers();
  //const { addFriend, answerFriend, friends } = useFriend();

  // useEffect(() => {
  //   addFriend("test1@test.de");
  // });
  /* const formRef = React.createRef();
  useEffect(() => {
    const formValidator = useFormValidator(formRef as any);
    alert("a");
    formValidator.validate();
  });

  return (
    <Form ref={formRef as any}>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        stateSetter={null}
        label="1"
        value="123"
      ></TextInput>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        label=""
      ></TextInput>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        label=""
      ></TextInput>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        label=""
      ></TextInput>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        label=""
      ></TextInput>
      <TextInput
        rules={[
          {
            rule: Rule.RULE_NO_EMPTY,
          },
        ]}
        label=""
      ></TextInput>
    </Form>
  );*/
}
