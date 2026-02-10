import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import de from "./de";
import en from "./en";

export enum LangType {
  LANG_TYPE_DE = "de",
  LANG_TYPE_EN = "en",
}

const resources = {
  de: { translation: de },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  fallbackLng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };

export async function loadLang() {
  if (!(await AsyncStorage.getAllKeys()).includes("language")) {
    return;
  }
  changeLang(await AsyncStorage.getItem("language"), true);
}

export function changeLang(
  langType: LangType | string | null,
  skipSave?: boolean,
) {
  if (langType === null) {
    return;
  }
  i18n.language = langType.toString();
  if (skipSave === true) {
    return;
  }
  AsyncStorage.setItem("language", i18n.language, (e: any) => {
    // //alert(e);
  });
}
