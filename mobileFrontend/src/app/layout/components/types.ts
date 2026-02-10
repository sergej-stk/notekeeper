import { ComponentProps } from "react";
import { BaseRule, Rule } from "./rules/RulesField";

export type BaseProps<T = {}> = ComponentProps<"div"> & T;

export type AppandableProps = {
  append?: React.ReactNode;
};

export type PrependableProps = {
  prepend?: React.ReactNode;
};

export type RuleableProps = {
  rules?: Rules;
};

export type SizeableProps = {
  width?: number;
  height?: number;
};

export type ValueableProps<T = string> = {
  value?: () => T;
};

export type ExpandableComponentProps<T = Object> = T &
  RuledLayoutComponentProps<
    LayoutComponentProps<AppandableProps & PrependableProps>
  >;

export type LayoutComponentProps<T = Object> = BaseProps<T>;

export type RuleCallback = (value: string) => boolean | string;
export type Rules = RuleCallback[] | BaseRule[];

export type RuledLayoutComponentProps<T = Object> = LayoutComponentProps<T> &
  RuleableProps;
