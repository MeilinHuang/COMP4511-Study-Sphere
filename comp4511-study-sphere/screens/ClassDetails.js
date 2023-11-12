import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import warning from "../assets/warning.png";

export default function ClassDetails({ route, navigation }) {
  const { title, userId, users, courses, courseKey, isMember, classKey } =
    route.params;
  useEffect(
    () =>
      navigation.setOptions({
        title,
        userId,
        users,
        courses,
        courseKey,
        isMember,
        classKey,
      }),
    [title, userId, users, courses, courseKey, isMember, classKey]
  );
  const Details = () => {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerInner}>
          <View></View>
          <View></View>
          <TouchableOpacity></TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const Resources = () => {
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerInner}></ScrollView>
    </View>;
  };

  const renderScene = SceneMap({
    first: Details,
    second: Resources,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Details",
      accessibilityLabel: "Class Details",
    },
    {
      key: "second",
      title: "Resources",
      accessibilityLabel: "Class Resources",
    },
  ]);

  return (
    <View style={styles.container}>
      {isMember ? (
        <LinearGradient
          // Background Linear Gradient
          colors={["#B6B2E6", "#C5DDBA"]}
          style={styles.background}
        >
          <View style={styles.topTab}>
            <TouchableOpacity style={styles.buttonLeave}>
              <Text
                style={styles.buttonLeaveText}
                onPress={() => {
                  // navigation.navigate("Tabs", {
                  //   screen: "Courses",
                  //   params: {
                  //     user: { id: userId },
                  //     action: {
                  //       type: "leave",
                  //       courseKey,
                  //     },
                  //   },
                  // });
                }}
              >
                Leave Class
              </Text>
            </TouchableOpacity>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => {
              return (
                <TabBar
                  {...props}
                  style={styles.shadowProp}
                  tabStyle={styles.topTab}
                  renderLabel={({ route, focused, color }) => (
                    <Text
                      style={{
                        ...styles.tabLabel,
                        color: `${focused ? "white" : "black"}`,
                        backgroundColor: `${focused ? "black" : "transparent"}`,
                        borderColor: `${focused ? "white" : "transparent"}`,
                        width: Number((layout.width / 2).toFixed() - 4),
                      }}
                    >
                      {route.title}
                    </Text>
                  )}
                />
              );
            }}
          />
        </LinearGradient>
      ) : (
        <LinearGradient
          // Background Linear Gradient
          colors={["#B6B2E6", "#C5DDBA"]}
          style={styles.background}
        >
          <View style={styles.accessDeniedView}>
            <Text style={styles.heading}>
              {courses[courseKey].name} {classKey}
            </Text>
            <View style={styles.icon_message_box}>
              <Image
                source={warning}
                aria-hidden
                accessible={false}
                style={styles.icon}
              />
              <Text style={styles.message}>
                Before accessing resources and details for {courseKey}{" "}
                {classKey} you must join the class.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonJoin}
            onPress={() => {
              navigation.navigate("Classes", {
                title: `${courseKey.charAt(0).toUpperCase()}${courseKey
                  .substr(1)
                  .toLowerCase()} Classes`,
                userId,
                users,
                courses,
                courseKey,
                isMember: true,
                action: {
                  type: "join",
                  classKey,
                },
              });
            }}
          >
            <Text style={styles.buttonJoinText}>Join Class</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInner: {
    minHeight: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  background: {
    height: "100%",
    width: "100%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    minHeight: 30,
  },
  tabLabel: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    textAlign: "center",
    overflow: "hidden",
    fontWeight: "bold",
  },
  topTab: {
    backgroundColor: "#c1c3ec",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  innerSearchContainer: { backgroundColor: "white" },
  searchPlaceholder: { fontWeight: "bold" },
  accessDeniedView: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "#6A74CF",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  icon_message_box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  message: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  buttonJoin: {
    padding: 10,
    color: "white",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#22810B",
    marginHorizontal: 20,
  },
  buttonLeave: {
    padding: 10,
    color: "white",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#D72424",
    // marginHorizontal: 10,
  },
  buttonJoinText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonLeaveText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
