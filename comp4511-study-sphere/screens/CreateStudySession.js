import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';
import { Divider } from '@rneui/themed';
import { FontAwesome5 } from '@expo/vector-icons';

const labels = ['Participant Information', 'Location'];

const customStyles = {
  labelColor: '#000000',
  stepStrokeCurrentColor: '#4f46e5',
  separatorUnFinishedColor: '#d1d5db',
  separatorFinishedColor: '#4f46e5',
  stepIndicatorFinishedColor: '#522ea3',
  stepIndicatorUnFinishedColor: '#e0e3e7',
  stepIndicatorLabelCurrentColor: '#522ea3',
  currentStepLabelColor: '#4f46e5',
};

const customDivider = () => {
  return (
    <Divider
      style={{ width: '94%', marginLeft: 15, marginRight: 15, marginTop: 10 }}
      color='#4f46e5'
      insetType='left'
      subHeaderStyle={{}}
      width={1}
      orientation='horizontal'
    />
  );
};

export default function CreateStudySessionScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentParticipant, setCurrentParticipant] = useState('');
  const [currParticipantArray, setCurrParticipantArray] = useState([]);

  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  const selectStepIndicator = ({ position: pos, stepProgress }) => {
    if (pos < currentPosition) {
      return <MaterialIcons name='done-outline' size={18} color='white' />;
    }

    return <Text>{pos + 1}</Text>;
  };

  const addParticipantToArray = () => {
    if (currentParticipant) {
      setCurrParticipantArray([...currParticipantArray, currentParticipant]);
      // reset previous participant
      setCurrentParticipant('');
    }
  };

  const removeParticipant = (idx) => {
    const currentParticipants = [...currParticipantArray];
    // go ahead and remove this entity
    currentParticipants.splice(idx, 1);
    setCurrParticipantArray(currentParticipants);
  }

  const getParticipantsAdded = () => {
    return (
      <View style={styles.bubbleParentContainer}>
      {currParticipantArray.map((participant, idx) => (
        <View style={styles.bubbleContainer} key={idx}>
          <Pressable style={styles.purpleBubble}>
            <View style={styles.bubbleContent}>
              <Text style={styles.bubbleText}>{participant}</Text>
              <Pressable style={styles.removeButton} onPress={() => removeParticipant(idx)}>
                <MaterialIcons name='highlight-remove' size={30} color='white' />
              </Pressable>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
    );
  };

  console.log(currentParticipant);
  console.log(currParticipantArray);

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
        {customDivider()}
        <View style={styles.formContainer}>
          <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
            Add Participants:
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Enter a course or class or username'
              value={currentParticipant}
              onChangeText={(text) => setCurrentParticipant(text)}
              style={styles.textInput}
            />
            <Pressable style={styles.addButton} onPress={addParticipantToArray}>
              <FontAwesome5 name='plus' size={20} color='white' />
            </Pressable>
          </View>
          <View>{getParticipantsAdded()}</View>
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
    marginTop: 10,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  textInput: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 20,
    width: 330,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  formContainer: {
    padding: 8,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    fontWeight: 'bold',
  },
  purpleBubble: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  bubbleText: {
    color: 'white',
    fontSize: 15,
  },
  bubbleParentContainer: {
    flexDirection: 'row',
    // make sure to determine the width based on the text
    flexWrap: 'wrap',
  },
  bubbleContainer: {
    flexDirection: 'row',
  },
  bubbleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 8,
  },
});
