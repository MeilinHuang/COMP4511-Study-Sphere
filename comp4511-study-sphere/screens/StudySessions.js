import React from "react";
import { Button, Text, View } from "react-native";

export default function StudySessions({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Study Sessions Screen</Text>
      <Button
        title="Click me to go to detail"
        onPress={() =>
          navigation.navigate("Detail", { title: "From the Study Sessions Screen" })
        }
      />
    </View>
  );
}
