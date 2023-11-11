import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TodoBox(params) {
  return (
    <View style={styles.container} key={params.myKey}>
      {params.img && (
        <Image
          accessible={true}
          accessibilityLabel="An image"
          accessibilityHint="The image was added to the todo by the user"
          accessibilityIgnoresInvertColors={true}
          source={{ uri: params.img }}
          style={{
            height: 40,
            width: 40,
            alignSelf: "center",
            borderRadius: 20,
          }}
        />
      )}
      <View>
        <Text>{params.title}</Text>
        <Text>Description: {params.body}</Text>
        <Text>Due Date: {new Date(params.dueDate).toLocaleDateString()}</Text>
      </View>
      {params.tag === "To-do" || params.tag === "In progress" ? (
        <View style={styles.buttonsContainer}>
          <Pressable
            accessibilityLabel="Mark todo as completed"
            onPress={() =>
              params.navigation.navigate("Study Tools", {
                title: params.title,
                dueDate: params.dueDate,
                tag: "Complete",
                body: params.body,
                img: params.img,
                payload: {
                  action: "edit",
                  oldTag: params.tag,
                  key: params.myKey,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={30}
              color="black"
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Edit todo"
            onPress={() =>
              params.navigation.navigate("Edit", {
                origTitle: params.title,
                origDueDate: params.dueDate,
                origTag: params.tag,
                origKey: params.myKey,
                origBody: params.body,
                origImg: params.img,
              })
            }
          >
            <MaterialCommunityIcons
              name="pencil-circle-outline"
              size={30}
              color="black"
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Delete Todo"
            onPress={() =>
              params.navigation.navigate("Study Tools", {
                title: params.title,
                dueDate: params.dueDate,
                tag: params.tag,
                body: params.body,
                img: params.img,
                payload: {
                  action: "delete",
                  key: params.myKey,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="delete-circle-outline"
              size={30}
              color="black"
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Pressable
            accessibilityLabel="Unmark todo as completed"
            onPress={() =>
              params.navigation.navigate("Study Tools", {
                title: params.title,
                dueDate: params.dueDate,
                tag: "To-do",
                body: params.body,
                img: params.img,
                payload: {
                  action: "edit",
                  oldTag: params.tag,
                  key: params.myKey,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={30}
              color="green"
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Delete Todo"
            onPress={() =>
              params.navigation.navigate("Study Tools", {
                title: params.title,
                dueDate: params.dueDate,
                tag: params.tag,
                body: params.body,
                img: params.img,
                payload: {
                  action: "delete",
                  key: params.myKey,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="delete-circle-outline"
              size={30}
              color="black"
            />
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
