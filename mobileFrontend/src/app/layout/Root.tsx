import { useColorScheme } from "react-native";
import { useDisplay } from "../hooks/useDisplay";
import { BottomBar, HeaderBar } from "./bars/Bars";
import { ComponentProps, useEffect } from "react";
import {
  createStaticNavigation,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useDevice } from "../hooks/useDevice";
import { Body } from "./Body";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "../store";
import Routes from "../router/router";
import { ThemeMode } from "@/src/constants/types";
import {
  getLanguage,
  getTheme,
  loadSettings,
  setState,
  UiState,
} from "../store/uiStore";
import { i18n, LangType } from "@/src/lang/i18n";
import { TFunction } from "i18next";
import { loadStorageData, StorageType } from "../store/storage";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProps } from "../views/RouterProps";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { Box, Flex, IconComponentProvider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Container from "./components/Container";

function RouteWatcher({ children }: any) {
  const auth = useAuth();
  const navigation = useNavigation();
  const route = useNavigationState((state) => state.routes[state.index]);

  if (auth === false) {
    if (!route?.name.startsWith("Auth")) {
      (navigation?.navigate as any)("Auth");
    }
  } else {
    if (route?.name.startsWith("Auth")) {
      (navigation?.navigate as any)("Home");
    }
  }

  return <>{children}</>;
}

function Parent({
  navigation,
  route,
  children,
}: ComponentProps<"div"> & RouterProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          {children}
          <Routes navigation={navigation} route={route}>
            <RouteWatcher></RouteWatcher>
          </Routes>
        </Theme>
      </PersistGate>
    </Provider>
  );
}

const Theme = (props: ComponentProps<"div">) => {
  loadStorageData<UiState>(StorageType.STORAGE_TYPE_UI).then(
    (value: UiState | null) => {
      if (value === null) {
        return;
      }
      store.dispatch(setState(value));
    },
  );

  const theme = useSelector(getTheme);

  const currentTheme =
    theme === ThemeMode.THEME_MODE_DARK ? DarkTheme : DefaultTheme;

  const langType: LangType = useSelector(getLanguage);

  useEffect(() => {
    i18n.changeLanguage(langType.toString(), (error: any, t: TFunction) => {
      ////alert("language error: " + error);
    });
  }, [langType]);

  /* useEffect(() => {
    i18n.changeLanguage(langType.toString(), (error: any, t: TFunction) => {
      ////alert("language error: " + error);
    });

//    store.dispatch(loadSettings());
  });*/

  return <ThemeProvider value={currentTheme}>{props.children}</ThemeProvider>;
};

export function RootLayoutNav({ navigation, route }: RouterProps) {
  const [isMobile] = useDisplay();
  const [isDesktop] = useDevice();

  const SmaalDesktopLayout = (props: ComponentProps<"div">) => (
    <>
      <HeaderBar navigation={navigation} route={route} />
      {props.children}
    </>
  );

  const MobileLayout = (props: ComponentProps<"div">) => {
    if (isDesktop) {
      return <SmaalDesktopLayout children={props.children} />;
    }

    return (
      <>
        {props.children}
        <BottomBar />
      </>
    );
  };

  const DesktopLayout = ({
    navigation,
    route,
    children,
  }: ComponentProps<"div"> & RouterProps) => (
    <>
      <HeaderBar navigation={navigation} route={route} />
      {children}
    </>
  );

  if (isMobile) {
    return (
      <Parent navigation={navigation} route={route}>
        <MobileLayout>
          <Body />
        </MobileLayout>
      </Parent>
    );
  }

  return (
    <Parent navigation={navigation} route={route}>
      <DesktopLayout navigation={navigation} route={route}>
        <Body />
      </DesktopLayout>
    </Parent>
  );
}
