import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import image from "../assets/course_images/comp3121_icon.png";

export default function ClassBox(params) {
  return (
    <TouchableOpacity
      style={styles.container}
      accessible={true}
      accessibilityLabel=""
      accessibilityHint=""
      onPress={() =>
        params.navigation.navigate("Detail", {
          title: "From the Class Screen",
        })
      }
    >
      <View style={styles.informationBox}>
        {image && (
          <Image
            accessible={false}
            aria-hidden
            source={image}
            style={styles.image}
          />
        )}
        <View>
          <Text style={{ fontWeight: "bold" }}>{params.classKey}</Text>
          <Text>{params.classTutor}</Text>
          <Text>{params.classTime}</Text>
          <Text>{params.participants.length} Members</Text>
        </View>
      </View>
      {!params.participants.includes(params.userId) ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Join ${params.className}`}
            onPress={() =>
              params.navigation.navigate("Detail", {
                title: "From the Class Screen",
              })
            }
          >
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Leave ${params.className}`}
            onPress={() =>
              params.navigation.navigate("Detail", {
                title: "From the Class Screen",
              })
            }
          >
            <Text>Leave</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    overflowWrap: "break-word",
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
  informationBox: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    overflowWrap: "break-word",
  },
  image: {
    height: 40,
    width: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
});
