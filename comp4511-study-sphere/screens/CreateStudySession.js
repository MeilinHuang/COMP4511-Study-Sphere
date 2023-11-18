import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';
import { Divider } from '@rneui/themed';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const labels = ['Participant Information', 'Group Availabilities', 'Location'];

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
  const [date, setDate] = useState(dayjs());
  const [timeVisible, setTimeVisible] = useState(false);
  const [fromTime, setFromTime] = useState({ hours: 12, minutes: 0 });
  const [toTime, setToTime] = useState({ hours: 12, minutes: 0 });
  const [toTimeVisible, setToTimeVisible] = useState(false);
  const [location, setLocation] = useState('');

  const onTimeDismiss = useCallback(() => {
    setTimeVisible(false);
  }, [setTimeVisible]);

  const onTimeConfirm = useCallback(
    ({ hours, minutes }) => {
      setTimeVisible(false);
      setFromTime({ hours, minutes });
      console.log({ hours, minutes });
    },
    [setTimeVisible, setFromTime]
  );

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const onToTimeDismiss = useCallback(() => {
    setToTimeVisible(false);
  }, [setToTimeVisible]);

  const onToTimeConfirm = useCallback(
    ({ hours, minutes }) => {
      setToTimeVisible(false);
      setToTime({ hours, minutes });
      console.log({ hours, minutes });
    },
    [setToTimeVisible, setToTime]
  );

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
  };

  const getParticipantsAdded = () => {
    return (
      <View style={styles.bubbleParentContainer}>
        {currParticipantArray.map((participant, idx) => (
          <View style={styles.bubbleContainer} key={idx}>
            <Pressable style={styles.purpleBubble}>
              <View style={styles.bubbleContent}>
                <Text style={styles.bubbleText}>{participant}</Text>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeParticipant(idx)}
                >
                  <MaterialIcons
                    name='highlight-remove'
                    size={30}
                    color='white'
                  />
                </Pressable>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    );
  };

  const navigateToAvailabilitesStep = () => {
    setCurrentPosition(1);
  };

  const navigateLocationStep = () => {
    setCurrentPosition(2);
  };

  /**
   * The following helper function returns a jsx component for the back and next buttons
   * in each step of the form
   * @param {currentPosition, setCurrentPosition, onPressFunction, nextButtonText}
   * @returns
   */
  const BackNextButton = ({
    currentPosition,
    setCurrentPosition,
    onPressFunction,
    nextButtonText,
  }) => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.backNextButton, { flex: 0.25, paddingRight: 4 }]}
          onPress={() => setCurrentPosition(currentPosition - 1)}
          disabled={currentPosition === 0}
        >
          <Ionicons name='arrow-back-sharp' size={24} color='white' />
          <Text style={styles.nextPageBtnText}>Back</Text>
        </Pressable>
        <Pressable
          style={[styles.backNextButton, { flex: 0.75 }]}
          onPress={onPressFunction}
        >
          <Text style={styles.nextPageBtnText}>{nextButtonText}</Text>
          <MaterialIcons name='navigate-next' size={30} color='white' />
        </Pressable>
      </View>
    );
  };

  console.log(location);

  /**
   * The following function takes the time format given in the date picker
   * and converts it to a string that has it well formatted
   * @param {*} hrs
   * @param {*} min
   * @returns
   */
  const formatTime = (hrs, min) => {
    let hour = hrs % 12 || 12;
    const minute = min < 10 ? `0${min}` : min;
    const timeOfDay = hrs < 12 ? 'AM' : 'PM';

    return `${hour}:${minute} ${timeOfDay}`;
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
        {customDivider()}
        {currentPosition === 0 && (
          <ScrollView>
            <View style={styles.formContainer}>
              <Text
                style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}
              >
                Add Participants:
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Enter a course or class or username'
                  value={currentParticipant}
                  onChangeText={(text) => setCurrentParticipant(text)}
                  style={styles.textInput}
                />
                <Pressable
                  style={styles.addButton}
                  onPress={addParticipantToArray}
                >
                  <FontAwesome5 name='plus' size={20} color='white' />
                </Pressable>
              </View>
              <View>{getParticipantsAdded()}</View>
              <Text
                style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}
              >
                Select Date:
              </Text>
              <View style={{ backgroundColor: 'white', borderRadius: 15 }}>
                <DateTimePicker
                  value={date}
                  mode='date'
                  display='default'
                  locale='en'
                  onValueChange={(date) => setDate(dayjs(date))}
                  displayFullDays={false}
                  selectedItemColor='#4f46e5'
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {`Selected, ${date.format('DD MMMM YYYY')}`}
              </Text>
            </View>
            <Pressable
              style={styles.nextPage}
              onPress={navigateToAvailabilitesStep}
            >
              <Text style={styles.nextPageBtnText}>Group Availabilites</Text>
              <MaterialIcons name='navigate-next' size={30} color='white' />
            </Pressable>
          </ScrollView>
        )}

        {currentPosition === 1 && (
          <ScrollView style={styles.formContainer}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Group Availability on {date.format('DD MMMM YYYY')}
            </Text>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
              }}
            >
              Select Time:
            </Text>
            <View style={styles.selectTimeSection}>
              <View style={styles.timeBtns}>
                <Button
                  onPress={() => setTimeVisible(true)}
                  uppercase={false}
                  mode='outlined'
                  style={{
                    backgroundColor: '#4f46e5',
                    width: '50%',
                    marginRight: 5,
                  }}
                  labelStyle={{ color: 'white' }}
                >
                  Select Start Time
                </Button>
                <TimePickerModal
                  visible={timeVisible}
                  onDismiss={onTimeDismiss}
                  onConfirm={onTimeConfirm}
                  hours={fromTime.hours}
                  minutes={fromTime.minutes}
                />
                <Button
                  onPress={() => setToTimeVisible(true)}
                  uppercase={false}
                  mode='outlined'
                  style={{
                    backgroundColor: '#4f46e5',
                    width: '50%',
                  }}
                  labelStyle={{ color: 'white' }}
                >
                  Select Finish Time
                </Button>
                <TimePickerModal
                  visible={toTimeVisible}
                  onDismiss={onToTimeDismiss}
                  onConfirm={onToTimeConfirm}
                  hours={toTime.hours}
                  minutes={toTime.minutes}
                />
              </View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {`From ${formatTime(
                  fromTime.hours,
                  fromTime.minutes
                )} - To ${formatTime(toTime.hours, toTime.minutes)}`}
              </Text>
            </View>
            <BackNextButton
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              onPressFunction={navigateLocationStep}
              nextButtonText='Location'
            />
          </ScrollView>
        )}
        {currentPosition === 2 && (
          <ScrollView>
            <View style={styles.formContainer}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Book Location (Optional):
              </Text>
              <View style={styles.mapContainer}>
                <View style={styles.searchBar}>
                  <TextInput
                    placeholder='Please enter a location'
                    style={styles.searchInput}
                    value={location}
                    onChangeText={handleLocationChange}
                  />
                </View>
                {/* Point at the UNSW library for now */}
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: -33.9173,
                    longitude: 151.2335,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: -33.9173,
                      longitude: 151.2335,
                    }}
                    title='UNSW'
                    description='University of New South Wales'
                  />
                </MapView>
              </View>
            </View>
            <BackNextButton
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              onPressFunction={() => console.log(location)}
              nextButtonText='Create Session'
            />
          </ScrollView>
        )}
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
  nextPage: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  nextPageBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectTimeSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  timeBtns: {
    flexDirection: 'row',
  },
  mapContainer: {
    alignItems: 'center',
    margin: 20,
    // only way to fix weird radius issues
    borderRadius: 40,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    aspectRatio: 1,
    margin: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  backNextContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  backNextButton: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 20,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 5,
  },
});
