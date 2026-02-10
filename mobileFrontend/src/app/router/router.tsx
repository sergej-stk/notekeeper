//import { Stack, useRouter } from 'expo-router';
import React, { ComponentProps, useRef } from "react";
import AuthView from "../views/AuthView";
import HomeView from "../views/HomeView";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { getToken } from "../store/sessionStore";
import { RouterProps } from "../views/RouterProps";

//export let useNavigation: React.RefObject<NavigationContainerRef<any>> | null = null;

export default function Routes(props: ComponentProps<"div"> & RouterProps) {
  const auth = useAuth();
  const token: string | null = useSelector(getToken);

  const Stack = createNativeStackNavigator({
    screens: {
      Auth: {
        if: () => token === null,
        screen: AuthView,
      },
      Home: {
        if: () => token !== null,
        screen: HomeView,
      },
    },
    groups: {
      SignedIn: {
        if: () => token !== null,
        screens: {
          Home: HomeView,
        },
      },
      SignedOut: {
        if: () => token === null,
        screens: {
          Auth: AuthView,
        },
      },
    },
  });

  const anonymRoutes = (
    <Stack.Screen name="auth" component={AuthView}></Stack.Screen>
  );

  const protectedRoutes = (
    <>
      <Stack.Screen name="home" component={HomeView}></Stack.Screen>
    </>
  );

  //const navigationRef = React.createRef<NavigationContainerRef<any>>();
  //useNavigation = navigationRef;
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {auth === true ? <>{protectedRoutes}</> : <>{anonymRoutes}</>}
      </Stack.Navigator>

      {props.children}
    </>
  );
}
