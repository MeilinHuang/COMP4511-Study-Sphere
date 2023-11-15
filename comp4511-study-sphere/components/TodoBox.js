import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TodoBox(params) {
  // console.log("params", params);
  const [daysLeft, setDaysLeft] = useState(null);

  const informMessage = (day) => {
    if (day === null) {
      return { message: "-", color: "black" };
    } else {
      if (day === 0) {
        return { message: "Due Today", color: "red" };
      } else if (day === 1) {
        return { message: "Due Tomorrow", color: "orange" };
      } else if (day > 1) {
        return { message: `${day} Days Left`, color: "green" };
      } else if (day < 0) {
        return { message: "Deadline passed", color: "gray" };
      }
    }
  };

  useEffect(() => {
    if (params.dueDate) {
      const currentDate = new Date();
      const dueDate = new Date(params.dueDate);
      const timeDifference = dueDate.getTime() - currentDate.getTime();
      const daysDifference =
        timeDifference >= 0
          ? Math.ceil(timeDifference / (1000 * 3600 * 24))
          : -1;
      setDaysLeft(daysDifference);
    }
  }, [params.dueDate]);

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
      {!params.img && <View style={{ width: 40, height: 40 }}></View>}
      <View style={{ padding: 2 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginRight: 4 }}>
            {params.title}
          </Text>
          {daysLeft !== null && (
            <Text style={{ color: informMessage(daysLeft).color }}>
              {informMessage(daysLeft).message}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ width: 240 }}>{params.body}</Text>
            <Text style={{ fontWeight: 500, bottom: -10 }}>
              {params.duration ? `${params.duration} minutes` : "25 minutes"}
            </Text>
          </View>

          {params.tag !== "Completed" ? (
            <View style={styles.buttonsContainer}>
              <View>
                <Pressable
                  accessibilityLabel="Start timer"
                  onPress={() =>
                    params.navigation.navigate("Timer", {
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
                    name="play-circle-outline"
                    size={30}
                    color="black"
                  />
                </Pressable>
                <Pressable
                  accessibilityLabel="Mark todo as completed"
                  onPress={() =>
                    params.navigation.navigate("Study Tools", {
                      title: params.title,
                      dueDate: params.dueDate,
                      tag: "Completed",
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
              </View>
              <View>
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
      </View>
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
    // backgroundColor: "#C1C3EC",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // backgroundColor: "transparent",
    // opacity: "50%",
    marginTop: 5,
    marginBottom: 5,
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
