import React from "react";
import { Button, Text, View } from "react-native";

export default function Availabilities({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Availabilities Screen</Text>
      <Button
        title="Click me to go to detail"
        onPress={() =>
          navigation.navigate("Detail", { title: "From the Availabilities Screen" })
        }
      />
    </View>
  );
}
