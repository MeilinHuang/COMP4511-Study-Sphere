import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TodoBox(params) {
  // console.log("params", params);
  const [daysLeft, setDaysLeft] = useState(null);

  const informMessage = () => {
    if (daysLeft === 0) {
      return { message: "Due Today", color: "red" };
    } else if (daysLeft === 1) {
      return { message: "Due Tomorrow", color: "orange" };
    } else if (daysLeft > 1) {
      return { message: `${daysLeft} Days Left`, color: "green" };
    } else if (daysLeft < 0) {
      return { message: "Deadline passed", color: "gray" };
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
      {/* {!params.img && <View style={{ width: 40, height: 40 }}></View>} */}
      <View style={{ padding: 2 }}>
        {/* TASK NAME AND DAYSLEFT */}
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
            <Text
              style={{
                color: informMessage().color,
                paddingLeft: params.img ? 0 : 60,
              }}
            >
              {informMessage().message}
            </Text>
          )}
        </View>
        {/* BODY, DURATION AND ACTION ICONS*/}
        <View style={{ flexDirection: "row" }}>
          {/* BODY AND DURATION */}
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={{ width: 240 }}>{params.body}</Text>
            <Text style={{ fontWeight: 500 }}>
              {params.duration ? `${params.duration} minutes` : "25 minutes"}
            </Text>
          </View>
          {/* ACTION ICONS */}
          {params.tag !== "Completed" ? (
            <View style={styles.buttonsContainer}>
              <View style={{ paddingLeft: params.img ? 0 : 60 }}>
                <Pressable
                  accessibilityLabel="Start timer"
                  onPress={() =>
                    params.navigation.navigate("Timer", {
                      origTitle: params.title,
                      origDueDate: params.dueDate,
                      origTag: params.tag,
                      origKey: params.myKey,
                      origBody: params.body,
                      origDuration: params.duration,
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
                      origDuration: params.duration,
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
                  onPress={() => {
                    console.log("clicked");
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
                    });
                  }}
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
            <View
              style={[
                styles.buttonsContainer,
                { paddingLeft: params.img ? 0 : 60 },
              ]}
            >
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
