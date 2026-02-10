import { ComponentProps } from "react";
import { ExpandableComponentProps, LayoutComponentProps } from "../types";
import Border, { BorderSolidBlack } from "../Border";
import CFlex from "../CFlex";

export type CardProps = ComponentProps<"div"> & {};

export type CardTitleProps = CardProps;
export type CardTextProps = CardProps;
export type CardActionsProps = CardProps;

export default function Card(props: LayoutComponentProps<CardProps>) {
  return (
    <BorderSolidBlack border={{ radius: 100 }}>
      <CFlex flow="column" justify="flex-start">
        {props.children}
      </CFlex>
    </BorderSolidBlack>
  );
}

export function CardTitle(props: ExpandableComponentProps<CardTitleProps>) {
  return (
    <CFlex flow="row" justify="space-between">
      {props.append}
      {props.prepend}
      <Border padding={5}>{props.children}</Border>
    </CFlex>
  );
}
export function CardText(props: LayoutComponentProps<CardTextProps>) {
  return (
    <CFlex flow="row" justify="space-between">
      <Border padding={5}>{props.children}</Border>
    </CFlex>
  );
}

export function CardActions(props: LayoutComponentProps<CardActionsProps>) {
  return (
    <CFlex flow="row" justify="space-between">
      <Border padding={5}>{props.children}</Border>
    </CFlex>
  );
}
