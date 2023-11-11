import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const tagData = [
  { label: "To-do", value: "To-do" },
  { label: "In progress", value: "In progress" },
  { label: "Complete", value: "Complete" },
];

export default function Create({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState(null);
  const [body, setBody] = useState("");
  const [img, setImg] = useState(null);
  const [isFocusTag, setIsFocusTag] = useState(false);
  const [date, setDate] = useState(new Date().toJSON());

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // base64: true,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text aria-label="Label for Title" nativeID="labelTitle">
        Title:
      </Text>
      <TextInput
        accessibilityLabel="Title"
        accessibilityHint="The todo's title"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ height: 50, backgroundColor: "white" }}
      />
      <View style={styles.hr}></View>
      <Text aria-label="Label for Tag" nativeID="labelTag">
        Tag:
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocusTag && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={tagData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusTag ? "Select Tag" : "..."}
        searchPlaceholder="Search..."
        value={tag}
        onFocus={() => setIsFocusTag(true)}
        onBlur={() => setIsFocusTag(false)}
        onChange={(item) => {
          setTag(item.value);
          setIsFocusTag(false);
        }}
      />
      <View style={styles.hr}></View>
      <Text aria-label="Label for Due Date" nativeID="labelDueDate">
        Due Date:
      </Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date(date)}
        mode={"date"}
        is24Hour={true}
        onChange={(event, selectedDate) => {
          setDate(selectedDate.toJSON());
        }}
      />
      <View style={styles.hr}></View>
      <Text aria-label="Label for Description" nativeID="labelDescription">
        Description:
      </Text>
      <TextInput
        accessibilityLabel={"Description"}
        accessibilityHint="The todo's description"
        placeholder="Description"
        value={body}
        onChangeText={setBody}
        style={{ height: 150, backgroundColor: "white" }}
        multiline={true}
      />
      <View style={styles.hr}></View>
      {img ? (
        <View>
          <Text aria-label="Label for Image" nativeID="labelImage">
            Image:
          </Text>
          <Image
            source={{ uri: img }}
            style={{ height: 200, width: 300, alignSelf: "center" }}
          />
        </View>
      ) : (
        <Text aria-label="Label for Image" nativeID="labelImage">
          Choose {img && "a different "}image:
        </Text>
      )}
      <Button title="Pick an image" onPress={pickImage} />
      <View style={styles.hr}></View>
      <Button
        title="Create Todo"
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          navigation.navigate("Study Tools", {
            title,
            dueDate: date,
            tag,
            body,
            img,
            payload: { action: "add" },
          });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    marginBottom: 10,
  },
});
