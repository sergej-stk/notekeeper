import { Flex, FlexProps, Text } from "@react-native-material/core";
import { ComponentProps, CSSProperties } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { ContainerProps } from "./Container";
import { LayoutComponentProps } from "./types";

export type PaddingOptions<T = number> = {
  left: number | T;
  right: number | T;
  top: number | T;
  bottom: number | T;
};

export type Padding = number | PaddingOptions;

export type MarginOptions<T = number> = PaddingOptions<T>;
export type Margin = number | MarginOptions;

export type BorderRadius = number;

export type BorderSingleProps = {
  type: "solid";
  width: number;
  color: string;
  radius?: BorderRadius;
};

export type OptionalBorder = {
  type?: "solid";
  width?: number;
  color?: string;
  radius?: BorderRadius;
};

export type BorderProps<
  T = "solid",
  B = number,
  C = string,
  D = BorderRadius,
> = {
  padding?: Padding;
  margin?: Margin;
  border?: BorderSingleProps | OptionalBorder;
};

function getStyle(containerProps: BorderProps): CSSProperties {
  let props: CSSProperties = {};

  if (containerProps.margin !== undefined) {
    if (
      (containerProps.padding as unknown as MarginOptions<undefined>).top ===
      undefined
    ) {
      props.margin = (containerProps.margin as number) + "px";
      console.log("p1");
    } else {
      const { left, right, top, bottom } =
        containerProps.margin as MarginOptions;
      props.margin = `${left}px ${right}px ${top}px ${bottom}px`;
      console.log("p2");
    }
  }

  if (containerProps.padding !== undefined) {
    if (
      (containerProps.padding as unknown as PaddingOptions<undefined>).top ===
      undefined
    ) {
      props.padding = (containerProps.padding as number) + "px";
    } else {
      const { left, right, top, bottom } =
        containerProps.padding as PaddingOptions;

      props.padding = `${left}px ${right}px ${top}px ${bottom}px`;
    }
  }

  if (containerProps.border !== undefined) {
    const { type, width, color } = containerProps.border;
    props.border = `${width}px ${type} ${color}`;
    props.borderRadius = containerProps.border.radius ?? undefined;
  }

  return props;
}

export default function Border(props: LayoutComponentProps<BorderProps>) {
  return <View><Text style={getStyle(props) as StyleProp<TextStyle>
  }>{props.children}</Text></View>;
}

export function BorderSolidBlack(props: LayoutComponentProps<BorderProps>) {
  const border: BorderSingleProps = {
    color: "black",
    type: "solid",
    width: 1,
  };

  const borderProps: BorderSingleProps | null | undefined =
    props.border as unknown as BorderSingleProps;

  if (borderProps !== null && borderProps !== undefined) {
    const { color, type, width, radius } = borderProps;

    border.color = color ?? border.color;
    border.type = type ?? border.type;
    border.width = width ?? border.width;
    border.radius = radius ?? border.radius;

    props = { ...props, border: border as any };
  }

  return <Border {...props} margin={props.margin} padding={props.padding} />;
}
