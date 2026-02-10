import { Flex, FlexProps } from "@react-native-material/core";
import { ComponentProps, CSSProperties } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { LayoutComponentProps } from "./types";

export type CFlexProps = {
  flow: "column" | "row";
  justify:
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-evenly";
  fill?: boolean;
};

function getStyle({ flow, justify, fill }: CFlexProps): StyleProp<ViewStyle> {
  let props: StyleProp<ViewStyle> = {};

  if (fill === true) {
    props.height = "100%";
  }

  props.flexDirection = flow;
  props.justifyContent = justify;

  return props;
}

export default function CFlex(props: LayoutComponentProps<CFlexProps>) {
  return <Flex style={getStyle(props)}>{props.children}</Flex>;
}
