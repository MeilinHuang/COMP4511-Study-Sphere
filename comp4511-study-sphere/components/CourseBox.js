import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function CourseBox(params) {
  const images = require.context("../assets/course_images", true);
  let itemImg = images(`./${params.icon}`);
  return (
    <TouchableOpacity
      style={styles.container}
      accessible={true}
      accessibilityLabel=""
      accessibilityHint=""
      onPress={() =>
        params.navigation.navigate("Classes", {
          title: `${params.courseKey.charAt(0).toUpperCase()}${params.courseKey
            .substr(1)
            .toLowerCase()} Classes`,
          classes: params.classes,
          userId: params.userId,
        })
      }
    >
      <View style={styles.informationBox}>
        {itemImg && (
          <Image
            accessible={false}
            aria-hidden
            source={itemImg}
            style={styles.image}
          />
        )}
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {params.courseKey.charAt(0).toUpperCase() +
              params.courseKey.substr(1).toLowerCase()}
          </Text>
          <Text>{params.courseName}</Text>
          <Text>{params.participants.length} Members</Text>
        </View>
      </View>
      {!params.participants.includes(params.userId) ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Join ${params.courseName}`}
            onPress={() =>
              params.navigation.navigate("Classes", {
                title: "From the Course Screen",
                classes: params.classes,
                userId: params.userId,
              })
            }
          >
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Leave ${params.courseName}`}
            onPress={() =>
              params.navigation.navigate("Classes", {
                title: "From the Course Screen",
                classes: params.classes,
                userId: params.userId,
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
