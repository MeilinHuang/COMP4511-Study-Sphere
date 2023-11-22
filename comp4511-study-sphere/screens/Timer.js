import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const onComplete = () => {
    // Do something when the countdown completes
    console.log("Countdown completed!");
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={10} // Set the countdown duration in seconds
        onComplete={onComplete}
        colors={[["#004777", 0.4], ["#F7B801", 0.4], ["#A30000"]]}
      >
        {({ remainingTime, animatedColor }) => (
          <View style={styles.timerContainer}>
            <Text style={{ color: animatedColor, fontSize: 24 }}>
              {remainingTime}
            </Text>
          </View>
        )}
      </CountdownCircleTimer>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          style={styles.controlButton}
        >
          <Text style={{ color: "#FFF" }}>{isPlaying ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      marginTop: 20,
    },
    controlButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
  });