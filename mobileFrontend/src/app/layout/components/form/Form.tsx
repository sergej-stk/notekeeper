import React from "react";
import {
  LayoutComponentProps,
  RuledLayoutComponentProps,
  ValueableProps,
} from "../types";
import { FormContextProvider } from "./context/FormContext";

export type FormProps = {};

export default class Form extends React.Component<
  RuledLayoutComponentProps<ValueableProps<FormProps>>
> {
  render(): React.ReactNode {
    return <FormContextProvider>{this.props.children}</FormContextProvider>;
  }
}
