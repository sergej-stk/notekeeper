import React, { useState } from "react";
import Form from "../../form/Form";
import {
  LayoutComponentProps,
  RuleCallback,
  RuledLayoutComponentProps,
  Rules,
} from "../../types";
import { BaseRule, BaseRuleOptional, Rule } from "../RulesField";
import { t } from "i18next";
import { isEmail, isNumeric } from "validator";
import { StateSetterGetter } from "@/src/constants/types";

export type UseRulesProps = {
  text: string;
  rules: Rules;
};

export type UseRules = {
  stateGetterSetter: StateSetterGetter;
  text?: string;
};

export default function useRules(
  props: LayoutComponentProps<UseRulesProps>,
): UseRules | null {
  const [ruleMessage, setRuleMessage] = useState<string | null>(null);
  const { text } = props;

  function processRule(baseRule: BaseRule) {
    const { text } = props;
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
    return null;
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

  return {
    stateGetterSetter: [ruleMessage, setRuleMessage],
    text: ruleMessage ?? undefined,
  };
}
