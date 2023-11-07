import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Availabilities({ navigation }) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [buttonColorsByDate, setButtonColorsByDate] = useState({});

  useEffect(() => 
  {
    const loadData = async () => 
    {
      try 
      {
        const storedButtonColors = await AsyncStorage.getItem('buttonColorsByDate');
        if (storedButtonColors !== null) 
        {
          setButtonColorsByDate(JSON.parse(storedButtonColors));
        } 
        else 
        {
          TodayAvail();
        }
      } 
      catch (e) 
      {
        console.error('Failure', e);
      }
    };

    loadData();
  }, []);

  useEffect(() => 
  {
    const saveData = async () => 
    {
      try 
      {
        await AsyncStorage.setItem('buttonColorsByDate', JSON.stringify(buttonColorsByDate));
      } 
      catch (e) 
      {
        console.error('Failure', e);
      }
    };
    saveData();
  }, [buttonColorsByDate]);

  useEffect(() => 
  {
    if (!(today in buttonColorsByDate)) 
    {
      TodayAvail();
    }
  }, [buttonColorsByDate]);

  const TodayAvail = () => 
  {
    setButtonColorsByDate
    ({
      ...buttonColorsByDate,
      [today]: 
      {
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
  };

  const changeDate = (date) => 
  {
    const dateString = date;
    if (!(dateString in buttonColorsByDate) && (dateString !== selectedDate)) 
    {
      setButtonColorsByDate
      ({
        ...buttonColorsByDate,
        [dateString]: 
        {
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
    setSelectedDate(dateString);
  };

  const changeButtonColor = (buttonTitle) => {
    if (selectedDate) 
    {
      const color1 = buttonColorsByDate[selectedDate];
      const color2 = color1[buttonTitle];
      let color3;
      if (color2 === "green") 
      {
        color3 = "red";
      } 
      else 
      {
        color3 = "green";
      }
      setButtonColorsByDate(prevColorsByDate => 
        ({
        ...prevColorsByDate,
        [selectedDate]: 
        {
          ...prevColorsByDate[selectedDate],
          [buttonTitle]: color3,
        },
      }));
    }
  };

  const getAvailabilityText = (color) => 
  {
    let result;
    if (color === "green") 
    {
      result = "Available";
    } 
    else 
    {
      result = "Unavailable";
    }
    return result;
  };

  const dateFormat = (dateString) => 
  {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const buttonstyle = (color) => 
  ({
    ...styles.timeSlot,
    backgroundColor: color === "green" ? "#DFF2BF" : "#FFB6B6",
    paddingVertical: 25, 
    borderWidth: 1, 
    borderColor: 'gray',
  });

  const styles = StyleSheet.create({
    container: 
    {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: 10,
    },
    
    title: 
    {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginVertical: 8,
      
    },

    dateText: 
    {
      marginVertical: 6,
      fontSize: 16,
      textAlign: 'center',
    },

    button: 
    {
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
    },

    buttonText: 
    {
      fontSize: 14,
    },

    calendarContainer: 
    {
      marginVertical: 10,
      alignSelf: 'center',
      width: 350,
    },


    timeSlot: 
    {
      paddingVertical: 25, 
      paddingHorizontal: 25, 
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      alignSelf: 'stretch', 
    },

    timeText: 
    {
      fontSize: 16,
      color: "#5C5C5C",
      alignSelf: 'flex-start', 
      position: 'absolute', 
      top: 5, 
      left: 5, 
    },
  });


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Choose a date to view availability</Text>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={changeDate}
            width={300}
            selectedStartDate={new Date(selectedDate)}
          />
        </View>

        {selectedDate && buttonColorsByDate[selectedDate] && (
          <View>
            <Text style={styles.dateText}>{dateFormat(selectedDate)}</Text>
            {Object.keys(buttonColorsByDate[selectedDate]).map((timeSlot, index) => (
            
            <TouchableOpacity
              key={index}
              style={buttonstyle(buttonColorsByDate[selectedDate][timeSlot])}
              onPress={() => changeButtonColor(timeSlot)}
            >
              <Text style={styles.timeText}>
                {timeSlot} - {getAvailabilityText(buttonColorsByDate[selectedDate][timeSlot])}
              </Text>
            </TouchableOpacity>
          ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
