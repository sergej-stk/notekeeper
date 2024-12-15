import { CSSProperties } from "react";
import { LayoutComponentProps } from "./types";
import { css } from "styled-components";
import { Text } from "@react-native-material/core";
import { View } from "react-native";

export type DeviderProps = {
  mode: "vertical" | "horizontal";
  size?: number;
  color?: string;
};

const defaultProps: DeviderProps = {
  size: 1,
  mode: "vertical",
  color: "black",
};

function useDefaults(props: LayoutComponentProps<DeviderProps>): DeviderProps {
  return {
    ...defaultProps,
    ...props,
  };
}

export default function Devider(props: LayoutComponentProps<DeviderProps>) {
  const withDefaults = useDefaults(props);

  function getStyle(styleProps: DeviderProps): CSSProperties {
    let cssProps: CSSProperties = { ...styleProps };

    if (props.mode === "horizontal") {
      cssProps.height = withDefaults.size;
      cssProps.width = "100%";
    } else {
      cssProps.width = withDefaults.size;
      cssProps.height = "100%";
    }

    cssProps.display = "block";
    cssProps.backgroundColor = withDefaults.color;
    cssProps.cursor = "pointer";
    return cssProps;
  }

  return <View><Text style={getStyle(withDefaults) as any}></Text></View>;
}
