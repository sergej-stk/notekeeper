import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { HttpMethod, useRequester } from "../hooks/net/useRequester";
import {
  LoginRequest,
  LoginResponse,
} from "@/src/shared/gen/ts/proto/auth_service";
import { ThemeMode } from "@/src/constants/types";
import { LangType } from "@/src/lang/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadStorageData, saveStorageData, StorageType } from "./storage";

// Define a type for the slice state
export interface UiState {
  theme: ThemeMode;
  language: LangType;
}

// Define the initial state using that type
const initialState: UiState = {
  language: LangType.LANG_TYPE_DE,
  theme: ThemeMode.THEME_MODE_DARK,
};

type OptionalSetter = {
  theme?: ThemeMode;
  language?: LangType;
};

function save(state: UiState) {
  saveStorageData<UiState>(StorageType.STORAGE_TYPE_UI, state);
}

export const uiStore = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    /*login: (state, action: PayloadAction<LoginRequest>) => {
      const requester = useRequester<LoginResponse>();
      const request = LoginRequest.create();
      request.password = "test";
      request.username = "test@test.de";

      requester
        .request(HttpMethod.HTTP_METHOD_POST, "auth/login", request)
        .then((response: LoginResponse) => {
          state.token = response.token;
        })
        .catch((error) => {
          console.log("error");
        });
    },*/
    setState: (state, action: PayloadAction<OptionalSetter>) => {
      /* const fields = Object.keys(action.payload);

      for (const field of fields) {
        Object.assign((state as any)[field], (action.payload as any)[field]);
      }*/
      state.language = action.payload.language ?? state.language;
      state.theme = action.payload.theme ?? state.theme;
      //save(state);
    },
    toggleTheme: (state) => {
      console.log("toggleTheme");
      if (state.theme === ThemeMode.THEME_MODE_DARK) {
        state.theme = ThemeMode.THEME_MODE_LIGHT;
      } else {
        state.theme = ThemeMode.THEME_MODE_DARK;
      }

      save(state);
    },
    toggleLanguage: (state) => {
      console.log("toggleLanguage");
      if (state.language === LangType.LANG_TYPE_DE) {
        state.language = LangType.LANG_TYPE_EN;
      } else {
        state.language = LangType.LANG_TYPE_DE;
      }

      save(state);
    },
    loadSettings: (state) => {
      loadStorageData<UiState>(StorageType.STORAGE_TYPE_UI).then(
        (data: UiState | null) => {
          if (data === null) {
            return;
          }
          uiStore.actions.setState(data);
          console.log("asdsadsa");
          /*switch (data.language) {
          default:
          case LangType.LANG_TYPE_DE:
            state.language = LangType.LANG_TYPE_DE;
          break;
          case LangType.LANG_TYPE_EN:
            state.language = LangType.LANG_TYPE_EN;
          break;
        }
        switch (data.theme) {
          default:
          case ThemeMode.THEME_MODE_DARK:
            state.theme = ThemeMode.THEME_MODE_DARK;
          break;
          case ThemeMode.THEME_MODE_LIGHT:
            state.theme = ThemeMode.THEME_MODE_LIGHT;
          break;
        }*/
        },
      );
    },
  },
});

export const { loadSettings, toggleLanguage, toggleTheme, setState } =
  uiStore.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value;
/*export const hasLoginError = (state: RootState) =>
  state.sessionStore.loginError;
*/
export const getTheme = (state: RootState): ThemeMode => state.uiStore.theme;
export const getLanguage = (state: RootState): LangType =>
  state.uiStore.language;

export default uiStore.reducer;

export const _storeData = async () => {
  try {
    await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("@MySuperStore:key");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
