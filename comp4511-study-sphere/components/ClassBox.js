import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import image from "../assets/course_images/comp3121_icon.png";

export default function ClassBox({
  courseKey,
  classKey,
  classTutor,
  classTime,
  participants,
  navigation,
  userId,
  myUsers,
  setMyUsers,
  myCourses,
  setMyCourses,
}) {
  const [isMember, setIsMember] = useState(participants.includes(userId));

  useEffect(() => {
    setIsMember(participants.includes(userId));
  }, [participants, userId]);
  return (
    <TouchableOpacity
      style={styles.container}
      accessible={true}
      accessibilityLabel=""
      accessibilityHint=""
      onPress={() =>
        navigation.navigate("ClassDetails", {
          title: `${courseKey.charAt(0).toUpperCase()}${courseKey
            .substr(1)
            .toLowerCase()} ${classKey}`,
          userId,
          myUsers,
          courses: myCourses,
          courseKey,
          isMember,
          classKey,
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
          <Text style={{ fontWeight: "bold" }}>{classKey}</Text>
          <Text>{classTutor}</Text>
          <Text>{classTime}</Text>
          <Text>{participants.length} Members</Text>
        </View>
      </View>
      {!isMember ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonJoin}
            accessibilityLabel={`Join ${classKey}`}
            onPress={() => {
              setIsMember(true);
              const userIndex = myUsers.findIndex(
                (x) => x.id === userId.toString()
              );
              if (userIndex !== -1) {
                const updatedUsers = [...myUsers];
                if (courseKey in updatedUsers[userIndex].courses_classes) {
                  updatedUsers[userIndex].courses_classes[courseKey] = [
                    ...updatedUsers[userIndex].courses_classes[courseKey],
                    classKey,
                  ];
                  setMyUsers(updatedUsers);
                }
              }
              if (courseKey in myCourses) {
                const newCourses = { ...myCourses };
                if (classKey in newCourses[courseKey].classes) {
                  newCourses[courseKey].classes[classKey].participants = [
                    ...newCourses[courseKey].classes[classKey].participants,
                    userId,
                  ];
                }
                setMyCourses(newCourses);
              }
            }}
          >
            <Text style={styles.buttonJoinText}>Join</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonLeave}
            accessibilityLabel={`Leave ${classKey}`}
            onPress={() => {
              setIsMember(false);
              const userIndex = myUsers.findIndex(
                (x) => x.id === userId.toString()
              );
              if (userIndex !== -1) {
                const updatedUsers = [...myUsers];
                if (courseKey in updatedUsers[userIndex].courses_classes) {
                  updatedUsers[userIndex].courses_classes[courseKey] =
                    updatedUsers[userIndex].courses_classes[courseKey].filter(
                      (x) => x !== userId
                    );
                  setMyUsers(updatedUsers);
                }
              }
              if (courseKey in myCourses) {
                const newCourses = { ...myCourses };
                if (classKey in newCourses[courseKey].classes) {
                  newCourses[courseKey].classes[classKey].participants =
                    newCourses[courseKey].classes[classKey].participants.filter(
                      (x) => x !== userId
                    );
                }
                setMyCourses(newCourses);
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
