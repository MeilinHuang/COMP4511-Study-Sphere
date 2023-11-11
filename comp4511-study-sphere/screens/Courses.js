import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import courses from "../database/courses.json";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { SearchBar } from "react-native-elements";
import { filterFn, myCoursesOnly } from "../utils/helpers";
import CourseBox from "../components/CourseBox";

const CurrTab = ({ screenName, currCourses, navigation, userId }) => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <SearchBar
          placeholder={`Search ${screenName}`}
          onChangeText={setSearch}
          value={search}
          lightTheme
          round
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.innerSearchContainer}
          inputStyle={styles.searchPlaceholder}
          placeholderTextColor="#6A74CF"
          accessibilityRole="search"
        />
        {Object.entries(currCourses)
          .filter(([key, val]) => filterFn(search, key, val.name))
          .map(([courseKey, val]) => {
            return (
              <CourseBox
                courseKey={courseKey}
                courseName={val.name}
                participants={val.participants}
                navigation={navigation}
                userId={userId}
                icon={val.icon}
                key={courseKey}
                classes={val.classes}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default function Courses({ route, navigation }) {
  const AllCourses = () => {
    return (
      <CurrTab
        screenName={"All Courses"}
        currCourses={courses}
        navigation={navigation}
        userId={route.params.user ? route.params.user.id : "9"}
      />
    );
  };

  const MyCourses = () => {
    const [myCourses, setMyCourses] = useState(
      myCoursesOnly(route.params.user ? route.params.user.id : "9", courses)
    );
    return (
      <CurrTab
        screenName={"My Courses"}
        currCourses={myCourses}
        navigation={navigation}
        userId={route.params.user ? route.params.user.id : "9"}
      />
    );
  };

  const renderScene = SceneMap({
    first: AllCourses,
    second: MyCourses,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "All Courses",
      accessibilityLabel: "Viewing all courses",
    },
    {
      key: "second",
      title: "My Courses",
      accessibilityLabel: "Viewing my joined courses",
    },
  ]);

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#B6B2E6", "#C5DDBA"]}
        style={styles.background}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerInner: {
    minHeight: "100%",
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
});
