import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import StoreService from "../services/StoreService";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TodoBox from "../components/TodoBox";
import { Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function StudyTools({ route, navigation }) {
  const { title, dueDate, tag, img, body, payload } = route.params ?? {};
  const [todos, setTodos] = useState([]);
  const [inprogressTodos, setInprogressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [nextKey, setNextKey] = useState(0);
  const windowHeight = Dimensions.get("window").height;

  const addToArray = (currTitle, currTag, currDueDate, currImg, currBody) => {
    console.log("nextKey", nextKey);
    if (currTag === "To-do") {
      setTodos((prevtodos) => [
        ...prevtodos,
        {
          title: currTitle,
          dueDate: currDueDate,
          tag: currTag,
          img: currImg,
          body: currBody,
          key: nextKey,
        },
      ]);
      setNextKey((k) => k + 1);
    } else if (currTag === "In progress") {
      setInprogressTodos((prevtodos) => [
        ...prevtodos,
        {
          title: currTitle,
          dueDate: currDueDate,
          tag: currTag,
          img: currImg,
          body: currBody,
          key: nextKey,
        },
      ]);
      setNextKey((k) => k + 1);
    } else if (currTag === "Complete") {
      setCompletedTodos((prevtodos) => [
        ...prevtodos,
        {
          title: currTitle,
          dueDate: currDueDate,
          tag: currTag,
          img: currImg,
          body: currBody,
          key: nextKey,
        },
      ]);
      setNextKey((k) => k + 1);
    }
  };

  const removeFromArray = (currTag, currKey) => {
    if (currTag === "To-do") {
      const newArray = [...todos].filter((x) => x.key !== currKey);
      setTodos([...newArray]);
    } else if (currTag === "In progress") {
      const newArray = [...inprogressTodos].filter((x) => x.key !== currKey);
      setInprogressTodos([...newArray]);
    } else if (currTag === "Complete") {
      const newArray = [...completedTodos].filter((x) => x.key !== currKey);
      setCompletedTodos([...newArray]);
    }
  };

  useEffect(() => {
    if (title && dueDate && tag && payload && body) {
      if (payload.action === "add") {
        addToArray(title, tag, dueDate, img, body);
      } else if (payload.action === "edit") {
        removeFromArray(payload.oldTag, payload.key);
        addToArray(title, tag, dueDate, img, body);
      } else if (payload.action === "delete") {
        removeFromArray(tag, payload.key);
      }
    }
  }, [title, dueDate, tag, payload, img, body]);

  // When todos screen first mounts load todos from store
  useEffect(() => {
    StoreService.getTodos().then((todos) => {
      setTodos(todos.todos);
      setInprogressTodos(todos.inprogress);
      setCompletedTodos(todos.complete);
      setNextKey(todos.nextKey);
    });
  }, []);

  // When ever todos is updated save the todos to the store
  useEffect(() => {
    if (nextKey) {
      StoreService.saveTodos({
        todos,
        inprogress: inprogressTodos,
        complete: completedTodos,
        nextKey,
      });
    }
  }, [todos, inprogressTodos, completedTodos]);

  return (
    <View style={styles.containerInner}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#B6B2E6", "#C5DDBA"]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Text style={styles.todoHeadings}>Todo:</Text>
          </View>
          {todos.map(({ title, dueDate, tag, img, body, key }, idx) => {
            return (
              <TodoBox
                key={idx}
                title={title}
                dueDate={dueDate}
                tag={tag}
                myKey={key}
                img={img}
                body={body}
                navigation={navigation}
              />
            );
          })}
          <View>
            <Text style={styles.todoHeadings}>In progress:</Text>
          </View>
          {inprogressTodos.map(
            ({ title, dueDate, tag, img, body, key }, idx) => (
              <TodoBox
                key={idx}
                title={title}
                dueDate={dueDate}
                tag={tag}
                myKey={key}
                img={img}
                body={body}
                navigation={navigation}
              />
            )
          )}
          <View>
            <Text style={styles.todoHeadings}>Completed:</Text>
          </View>
          {completedTodos.map(
            ({ title, dueDate, tag, img, body, key }, idx) => (
              <TodoBox
                key={idx}
                title={title}
                dueDate={dueDate}
                tag={tag}
                myKey={key}
                img={img}
                body={body}
                navigation={navigation}
              />
            )
          )}
        </ScrollView>
      </LinearGradient>
      <Pressable
        accessibilityLabel="Create todo"
        onPress={() => navigation.navigate("Create")}
        style={{
          ...styles.addButton,
        }}
      >
        <MaterialCommunityIcons name="plus-circle" size={80} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    minHeight: "100%",
    width: "100%",
  },
  containerInner: {
    flex: 1,
    width: "100%",
  },
  background: {
    height: "100%",
    width: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    // left: 0,
    alignSelf: "flex-end",
    paddingRight: 10,
    marginBottom: 20,
  },
  todoHeadings: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 5,
  },
});
