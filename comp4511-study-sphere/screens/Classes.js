import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { SearchBar } from "react-native-elements";
import { filterFn, myClassesOnly } from "../utils/helpers";
import ClassBox from "../components/ClassBox";

const CurrTab = ({ screenName, currClasses, navigation }) => {
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
        {Object.entries(currClasses)
          .filter(([key, val]) => filterFn(search, key, val.time))
          .map(([classKey, val]) => {
            return (
              <ClassBox
                classKey={classKey}
                classTutor={val.tutor}
                classTime={val.time}
                participants={val.participants}
                navigation={navigation}
                userId={"1"}
                key={classKey}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default function Classes({ route, navigation }) {
  const { title, classes, userId } = route.params;
  useEffect(
    () => navigation.setOptions({ title, classes, userId }),
    [title, classes, userId]
  );
  const AllClasses = () => {
    return (
      <CurrTab
        screenName={"All Classes"}
        currClasses={classes}
        navigation={navigation}
      />
    );
  };

  const MyClasses = () => {
    const [myClasses, setMyClasses] = useState(myClassesOnly(userId, classes));
    return (
      <CurrTab
        screenName={"My Classes"}
        currClasses={myClasses}
        navigation={navigation}
      />
    );
  };

  const renderScene = SceneMap({
    first: AllClasses,
    second: MyClasses,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "All Classes",
      accessibilityLabel: "Viewing all Classes",
    },
    {
      key: "second",
      title: "My Classes",
      accessibilityLabel: "Viewing my joined Classes",
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
});
