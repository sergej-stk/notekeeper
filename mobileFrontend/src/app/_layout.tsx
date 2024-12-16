import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RootLayoutNav } from "./layout/Root";
import "../lang/i18n";
import { loadLang } from "../lang/i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { darkTheme, IconComponentProvider } from "@react-native-material/core";
import { useSelector } from "react-redux";
import {
  _retrieveData,
  _storeData,
  getTheme,
  loadSettings,
} from "./store/uiStore";
import { ThemeMode } from "../constants/types";
import { store } from "./store";
import { RouterProps } from "./views/RouterProps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import 'reactjs-tiptap-editor/style.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ navigation, route }: RouterProps) {
  const { t } = useTranslation();
  const wAny: any = window;
  wAny.t = t;

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    loadLang();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav navigation={navigation} route={route} />;
}
