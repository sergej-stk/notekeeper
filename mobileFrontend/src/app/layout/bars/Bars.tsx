import {
  AppBar,
  IconButton,
  Button,
  Avatar,
  FAB,
  Text,
} from "@react-native-material/core";
import Colors from "@/src/constants/Colors";
import { store } from "../../store";
import { toggleLanguage, toggleTheme } from "../../store/uiStore";
import { useSelector } from "react-redux";
import { Me } from "../../hooks/net/apiHooks/useMe";
import { getMe, setState } from "../../store/sessionStore";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "../../views/RouterProps";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "../Icon";
import CFlex from "../components/CFlex";
import { View } from "react-native";

export function HeaderBar(props: RouterProps) {
  function handleToggleLang() {
    store.dispatch(toggleLanguage());
  }
  function handleToggleTheme() {
    store.dispatch(toggleTheme());
  }
  function handleLogout() {
    store.dispatch(
      setState({
        token: null,
        me: null,
        loginError: false,
      }),
    );
    if (props.navigation === undefined) {
      return;
    }
    props.navigation.navigate("auth");
  }
  const me: Me | null = useSelector(getMe) ?? null;

  let title = me === null ? <Text>Notekeeper</Text> : <Text>Willkommen {me.username}</Text>;

  return (
    <AppBar
      title={title}
      trailing={(props) => (
        <CFlex flow="row" justify="flex-start">
          <IconButton icon={<Icon name="translate" color="white" />} />
          <IconButton icon={<Icon name="theme-light-dark" color="white" />} />
        </CFlex>
      )}
      style={{
        backgroundColor: Colors.dark.background,
      }}
    />
  );
}

export function BottomBar() {
  return (
    <AppBar
      variant="bottom"
      leading={(props) => (
        <IconButton
          icon={(props) => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      trailing={(props) => (
        <IconButton
          icon={(props) => <Icon name="magnify" {...props} />}
          {...props}
        />
      )}
      style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
    >
      <FAB
        icon={(props) => <Icon name="plus" {...props} />}
        style={{ position: "absolute", top: -28, alignSelf: "center" }}
      />
    </AppBar>
  );
}
