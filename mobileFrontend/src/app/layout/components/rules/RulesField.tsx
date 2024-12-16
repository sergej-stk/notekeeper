import { useEffect, useState } from "react";
import { BorderProps } from "../Border";
import { LayoutComponentProps, RuleCallback, Rules } from "../types";
import { Text } from "@react-native-material/core";
import Container from "../Container";
import { useTranslation } from "react-i18next";
import { StateGetter, StateSetterGetter } from "@/src/constants/types";
import { isEmail, isNumeric } from "./utils";
import { getLanguage } from "@/src/app/store/uiStore";
import { useSelector } from "react-redux";

export type RulesField = {
  rules?: Rules;
  textStateGetter: StateGetter;
};

export type BaseRuleOptional = {
  rule?: Rule;
  text?: () => string | boolean;
  textStateGetter?: StateGetter;
};

export type BaseRule = {
  rule: Rule;
  text?: (value: string) => string | boolean;
  textStateGetter?: StateGetter;
};

export enum Rule {
  RULE_NO_EMPTY,
  RULE_EMAIL,
  RULE_NUMBER,
}

export default function RulesField(props: LayoutComponentProps<RulesField>) {
  const [text] = props.textStateGetter;
  const { t } = useTranslation();
  const [ruleMessage, setRuleMessage] = useState<string | null>(null);
  const langType = useSelector(getLanguage);

  useEffect(() => {
    function processRule(baseRule: BaseRule) {
      const text = props.textStateGetter;
      if (baseRule.text !== undefined) {
        return baseRule.text(text);
      }
      const rule = baseRule.rule;
      switch (rule) {
        case Rule.RULE_NO_EMPTY:
          console.log("RULE_NO_EMPTY");
          return text.trim() === "" ? t("rule.noEmpty") : true;
        case Rule.RULE_EMAIL:
          console.log("RULE_EMAIL");
          return isEmail(text) ? true : t("rule.email");
        case Rule.RULE_NUMBER:
          console.log("RULE_NUMBER");
          return isNumeric(text) ? true : t("rule.number");
        default:
          return "DEFAULT";
      }
    }

    if (props.rules === undefined) {
      return;
    }

    for (const rule of props.rules) {
      let response: boolean | string = false;
      // check is baseRule
      if ((rule as BaseRuleOptional).rule !== undefined) {
        response = processRule(rule as BaseRule);
      } else {
        const callback = rule as RuleCallback;
        response = callback(text);
      }

      if (response === true || response === false) {
        setRuleMessage(null);
        continue;
      }

      setRuleMessage(response as string);
      break;
    }
  }, [text, langType]);

  return (
    <Container h={50}>
      <Text>{ruleMessage}</Text>
    </Container>
  );
}
