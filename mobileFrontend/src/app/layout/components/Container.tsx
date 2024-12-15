import { Box, Flex, FlexProps } from "@react-native-material/core";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { LayoutComponentProps } from "./types";
import { CSSProperties } from "styled-components";

export type ContainerProps = ComponentProps<"div"> & {
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
  w?: number;
  h?: number;
  fill?: boolean;
  color?: string;
  backgroundColor?: string;
};

function getStyle(containerProps: ContainerProps): CSSProperties {
  let props: CSSProperties = {
    ...containerProps.style,
    width: containerProps.w ?? undefined,
    height: containerProps.h ?? undefined,
  };

  if (containerProps.fill === true) {
    props.height = "100%";
    props.display = "flex";
    props.flexGrow = 1; // = "block";
  }

  if (containerProps.verticalCenter) {
    props.justifyContent = "center";
  }

  if (containerProps.horizontalCenter) {
    props.alignItems = "center";
  }

  if (containerProps.color !== undefined) {
    props.color = containerProps.color;
  }

  if (containerProps.backgroundColor !== undefined) {
    props.backgroundColor = containerProps.backgroundColor;
  }

  //props.display = "block";

  return props;
}

function getFlexProps(containerProps: ContainerProps): FlexProps {
  let props: FlexProps = {};

  if (containerProps.fill === true) {
    props.fill = true;
  }

  return props;
}

export default function Container(props: LayoutComponentProps<ContainerProps>) {
  return (
    <Flex fill>
      <Box style={getStyle(props) as StyleProp<any>}>{props.children}</Box>
    </Flex>
  );
}
