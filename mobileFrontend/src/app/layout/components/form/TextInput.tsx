import { TextInputProps } from "react-native";
import {
  LayoutComponentProps,
  RuleCallback,
  RuledLayoutComponentProps,
} from "../types";
import { TextInput } from "@react-native-material/core";
import CFlex from "../CFlex";
import RulesField, { BaseRule, Rule } from "../rules/RulesField";
import { EffectCallback, FC, useEffect, useState } from "react";
import Container from "../Container";
import { BorderSolidBlack } from "../Border";
import { StateSetter } from "@/src/constants/types";
import { useTranslation } from "react-i18next";
import React from "react";
import { useFormContext } from "./context/FormContext";

export type TextInput = TextInputProps & {
  label: string;
  stateSetter?: StateSetter | null;
};

function CTextInput(props: RuledLayoutComponentProps<TextInput>) {
  /*const formContext = useFormContext();
  
  const val = (): string => {
    alert("value");
    return "test";
  };

  formContext.setElements([...formContext.elements, {
    rules: props.rules,
    value: val
  }]);*/

  // (props.value as any) = val;
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (props.stateSetter === null || props.stateSetter === undefined) {
      return;
    }
    props.stateSetter(text);
  }, [text]);

  return (
    <CFlex flow="column" justify="flex-start">
      <TextInput
        label={props.label}
        value={text}
        onChange={(e) => setText((e.target as any).value)}
      ></TextInput>
      <RulesField textStateGetter={text} rules={props.rules} />
    </CFlex>
  );
}

export default React.forwardRef(
  (props: RuledLayoutComponentProps<TextInput>, ref) => (
    <CTextInput {...props} ref={ref as typeof props.ref}>
      {props.children}
    </CTextInput>
  ),
);
