import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function CourseBox({
  courseKey,
  courseName,
  participants,
  navigation,
  userId,
  icon,
  users,
  setUsers,
  courses,
  setCourses,
}) {
  const images = require.context("../assets/course_images", true);
  let itemImg = images(`./${icon}`);
  return (
    <TouchableOpacity
      style={styles.container}
      accessible={true}
      accessibilityLabel=""
      accessibilityHint=""
      onPress={() =>
        navigation.navigate("Classes", {
          title: `${courseKey.charAt(0).toUpperCase()}${courseKey
            .substr(1)
            .toLowerCase()} Classes`,
          userId: userId,
          users,
          courses,
          courseKey,
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
            {courseKey.charAt(0).toUpperCase() +
              courseKey.substr(1).toLowerCase()}
          </Text>
          <Text>{courseName}</Text>
          <Text>{participants.length} Members</Text>
        </View>
      </View>
      {!participants.includes(userId) ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Join ${courseName}`}
            style={styles.buttonJoin}
            onPress={() => {
              const userIndex = users.findIndex(
                (x) => x.id === userId.toString()
              );
              if (userIndex !== -1) {
                const updatedUsers = [...users];
                if (!(courseKey in updatedUsers[userIndex].courses_classes)) {
                  updatedUsers[userIndex].courses_classes[courseKey] = [];
                  setUsers(updatedUsers);
                }
              }
              if (courseKey in courses) {
                const newCourses = { ...courses };
                newCourses[courseKey].participants = [
                  ...newCourses[courseKey].participants,
                  userId,
                ];
                setCourses(newCourses);
              }
            }}
          >
            <Text style={styles.buttonJoinText}>Join</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            accessibilityLabel={`Leave ${courseName}`}
            style={styles.buttonLeave}
            onPress={() => {
              const userIndex = users.findIndex(
                (x) => x.id === userId.toString()
              );
              if (userIndex !== -1) {
                const updatedUsers = [...users];
                if (updatedUsers[userIndex].courses_classes[courseKey]) {
                  delete updatedUsers[userIndex].courses_classes[courseKey];
                  setUsers(updatedUsers);
                }
              }
              if (courseKey in courses) {
                const newCourses = { ...courses };
                for (const classInCourse of Object.keys(
                  newCourses[courseKey].classes
                )) {
                  newCourses[courseKey].classes[classInCourse].participants =
                    newCourses[courseKey].classes[
                      classInCourse
                    ].participants.filter((x) => x !== userId.toString());
                }
                newCourses[courseKey].participants = newCourses[
                  courseKey
                ].participants.filter((x) => x !== userId);
                setCourses(newCourses);
              }
            }}
          >
            <Text style={styles.buttonLeaveText}>Leave</Text>
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
    width: "70%",
  },
  image: {
    height: 40,
    width: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  buttonJoin: {
    padding: 10,
    color: "#22810B",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#22810B",
    backgroundColor: "white",
  },
  buttonLeave: {
    padding: 10,
    color: "#D72424",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#D72424",
    backgroundColor: "white",
  },
  buttonJoinText: {
    color: "#22810B",
    fontWeight: "bold",
  },
  buttonLeaveText: {
    color: "#D72424",
    fontWeight: "bold",
  },
});
