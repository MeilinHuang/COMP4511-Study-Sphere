import React from "react";
import { Button, Text, View } from "react-native";
import { Svg, Path, Text as SvgText } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Courses({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Courses Screen</Text>
      <Button
        title="Click me to go to detail"
        onPress={() =>
          navigation.navigate("Detail", { title: "From the Courses Screen" })
        }
      />
    </View>
  );
}
