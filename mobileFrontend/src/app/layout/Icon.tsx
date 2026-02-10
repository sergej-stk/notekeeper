import { getThemeColors } from "@/src/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-native-material/core";
import { useEffect } from "react";
import { OpaqueColorValue } from "react-native";
import { useSelector } from "react-redux";
import { getTheme } from "../store/uiStore";

const DefaultIconSize = 30;

export type IconProps = {
  name: typeof MaterialCommunityIcons.defaultProps;
  color?: string | OpaqueColorValue | undefined;
  size?: number;
};

export default function Icon(props: IconProps) {
  const theme = useSelector(getTheme);
  const colors = getThemeColors(theme);

  return (
    <MaterialCommunityIcons
      name={props.name}
      color={colors.icon}
      size={props.size ?? DefaultIconSize}
    />
  );
}
