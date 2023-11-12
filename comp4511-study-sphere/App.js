import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./screens/Settings";
import StudySessions from "./screens/StudySessions";
import Availabilities from "./screens/Availabilities";
import Create from "./screens/Create";
import Edit from "./screens/Edit";
import Detail from "./screens/Detail";
import LogIn from "./screens/Login";
import Classes from "./screens/Classes";
import Courses from "./screens/Courses";
import StudyTools from "./screens/StudyTools";
import SignUp from "./screens/SignUp";
import myUsers from "./database/users.json";
import myCourses from "./database/courses.json";

const Tabs = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

export default function App() {
  const BottomTabs = () => (
    <View style={styles.background}>
      <Tabs.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#C1C3EC" },
          tabBarActiveBackgroundColor: "#C1C3EC",
          tabBarActiveTintColor: "black",
        }}
        style={styles.background}
      >
        <Tabs.Screen
          name="Courses"
          component={Courses}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons
                name="book-outline"
                size={size}
                color="black"
              />
            ),
            headerTitle: "Courses",
          }}
          style={styles.background}
        />
        <Tabs.Screen
          name="Study Sessions"
          component={StudySessions}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={size}
                color="black"
              />
            ),
            headerTitle: "Study Sessions",
          }}
        />
        <Tabs.Screen
          name="Availabilities"
          component={Availabilities}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons
                name="clock-outline"
                size={size}
                color="black"
              />
            ),
            headerTitle: "Availabilities",
          }}
        />
        <Tabs.Screen
          name="Study Tools"
          component={StudyTools}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons
                name="pencil-ruler"
                size={size}
                color="black"
              />
            ),
            headerTitle: "Study Tools",
          }}
          style={styles.background}
        />
        <Tabs.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons name="cog" size={size} color="black" />
            ),
            headerTitle: "Settings",
          }}
        />
      </Tabs.Navigator>
    </View>
  );
  return (
    <View style={styles.background}>
      <NavigationContainer style={styles.background}>
        <RootStack.Navigator
          style={styles.background}
          screenOptions={{
            headerStyle: { backgroundColor: "#C1C3EC" },
            tabBarActiveBackgroundColor: "#C1C3EC",
            headerTintColor: "black",
          }}
        >
          <RootStack.Screen
            name="Login"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerTitle: "Sign Up", headerBackTitle: "Log In" }}
          />
          <RootStack.Screen
            name="Tabs"
            component={BottomTabs}
            options={{ headerShown: false }}
            style={styles.background}
          />
          <RootStack.Screen
            name="Detail"
            component={Detail}
            options={{ headerBackTitle: "Back" }}
          />
          <RootStack.Screen
            name="Classes"
            component={Classes}
            options={{ headerBackTitle: "Back" }}
          />
          <RootStack.Screen
            name="Create"
            component={Create}
            options={{ presentation: "modal" }}
          />
          <RootStack.Screen
            name="Edit"
            component={Edit}
            options={{ presentation: "modal" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
  },
  background: {
    height: "100%",
    width: "100%",
  },
});
