import { SetStateAction } from "react";
import { Dispatch } from "redux";

export type State<T = any> = [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>,
];
export type SetState<T = any> = [
  React.Dispatch<React.SetStateAction<T | null>>,
];

export enum ThemeMode {
  THEME_MODE_LIGHT = "light",
  THEME_MODE_DARK = "dark",
}

export type StateGetter<T = any> = string | T;

export type StateSetter<T = any> = React.Dispatch<
  React.SetStateAction<T | null>
>;

export type StateSetterGetter<T = any> = [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>,
];
