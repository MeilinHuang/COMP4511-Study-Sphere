import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function CourseBox(params) {
  console.log("params", params.participants);
  return (
    <View style={styles.container}>
      <View>
        <Text>{params.courseKey}</Text>
        <Text>{params.courseName}</Text>
        <Text>{params.participants.length} Members</Text>
      </View>
      {!params.participants.includes(params.userId) ? (
        <View style={styles.buttonsContainer}>
          <Pressable
            accessibilityLabel={`Join ${params.courseName}`}
            onPress={() =>
              params.navigation.navigate("Detail", {
                title: "From the Course Screen",
              })
            }
          >
            <Text>Join</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Pressable
            accessibilityLabel={`Leave ${params.courseName}`}
            onPress={() =>
              params.navigation.navigate("Detail", {
                title: "From the Course Screen",
              })
            }
          >
            <Text>Leave</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // width: "100%",
    backgroundColor: "#C1C3EC",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderColor: "#6A74CF",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
