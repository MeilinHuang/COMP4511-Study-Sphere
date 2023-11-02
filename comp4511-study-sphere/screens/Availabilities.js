import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';

export default function Availabilities({ navigation }) 
{
  const [selectedDate, setSelectedDate] = useState(null);
  const [buttonColorsByDate, setButtonColorsByDate] = useState({});


 const handleDateChange = (date) => {
    setSelectedDate(date);
    // Initialize button colors for the selected date if not already set
    if (!buttonColorsByDate[date]) {
      setButtonColorsByDate({
        ...buttonColorsByDate,
        [date]: {
          "7 AM": "green",
          "8 AM": "green",
          "9 AM": "green",
          "10 AM": "green",
          "11 AM": "green",
          "12 PM": "green",
          "1 PM": "green",
          "2 PM": "green",
          "3 PM": "green",
          "4 PM": "green",
          "5 PM": "green",
        },
      });
    }
  };

  const toggleButtonColor = (buttonTitle) => {
    if (selectedDate) {
      setButtonColorsByDate((prevColorsByDate) => ({
        ...prevColorsByDate,
        [selectedDate]: {
          ...prevColorsByDate[selectedDate],
          [buttonTitle]:
            prevColorsByDate[selectedDate][buttonTitle] === "green"
              ? "red"
              : "green",
        },
      }));
    }
  };



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Availabilities Screen</Text>
      <CalendarPicker
        onDateChange={handleDateChange}
        width={300} // Adjust the width as needed
      />
      {selectedDate && (
        <View>
          <Text>Selected Date: {selectedDate.toString()}</Text>
          {Object.keys(buttonColorsByDate[selectedDate]).map((buttonTitle) => (
            <Button
              key={buttonTitle}
              title={buttonTitle}
              onPress={() => toggleButtonColor(buttonTitle)}
              color={buttonColorsByDate[selectedDate][buttonTitle]}
            />
          ))}
        </View>
      )}
    </View>
  );
}