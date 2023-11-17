import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const labels = ['Participant Information', 'Location'];

const customStyles = {
  labelColor: '#000000',
  stepStrokeCurrentColor: '#522ea3',
  separatorUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#8159de',
  stepIndicatorFinishedColor: '#522ea3',
  stepIndicatorUnFinishedColor: 'grey',
  stepIndicatorLabelCurrentColor: '#522ea3',
  currentStepLabelColor: '#522ea3',
};

export default function CreateStudySessionScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(0);

  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  const selectStepIndicator = ({ position: pos, stepProgress }) => {
    if (pos < currentPosition) {
      return <MaterialIcons name='done-outline' size={18} color='white' />;
    }

    return <Text>{pos + 1}</Text>;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B6B2E6', '#C5DDBA']} style={styles.background}>
        <View style={styles.stepperContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            onPress={onPageChange}
            stepCount={labels.length}
            renderStepIndicator={selectStepIndicator}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  stepperContainer: {
    marginTop: 10
  },
  background: {
    height: '100%',
    width: '100%',
  },
});
