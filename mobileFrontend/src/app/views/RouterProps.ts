import { RouteParams } from "expo-router";
import { NavigationScreenProp, NavigationState } from "react-navigation";

export type RouterProps = {
  navigation: NavigationScreenProp<NavigationState>;
  route: {
    name: string;
    params?: RouteParams<any> | any; // Optional, falls keine Parameter übergeben werden
  };
};
