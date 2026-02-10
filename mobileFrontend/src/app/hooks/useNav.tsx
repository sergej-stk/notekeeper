import React from "react";
import { View, Text, Button } from "react-native";

export default function AnotherScreen({ navigation }: any) {
  return (
    <View>
      <Text>Willkommen auf dem Another Screen!</Text>
      <Button
        title="Gehe zu Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
