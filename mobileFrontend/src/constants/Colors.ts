export type Colors = {
  text: any;
  background: any;
  tint: any;
  tabIconDefault: any;
  tabIconSelected: any;
  rulesColor: string;
  icon: string;
};

export type Themes = {
  light: Colors;
  dark: Colors;
};

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const themes: Themes = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    rulesColor: "red",
    icon: "dark",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    rulesColor: "red",
    icon: "white",
  },
};

export function getThemeColors(theme: keyof Themes): Colors {
  return themes[theme];
}

export default themes;
