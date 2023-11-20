import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Overlay } from 'react-native-elements';
import userIcon from '../assets/user.png';
import { formatTime } from '../utils/helpers';

import warning from '../assets/warning.png';

export default function StudySessionDetails({
  navigation,
  route,
  users,
  userId,
}) {
  const { studySessionInfo } = route.params;
  console.log(studySessionInfo.owner);
  const owner = users.filter((user) => user.id === studySessionInfo.owner);
  console.log(owner[0].name);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerInner}>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Course: </Text>
            <Text style={styles.detailsInfo}>{studySessionInfo.course}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Date: </Text>
            <Text style={styles.detailsInfo}>
              {studySessionInfo.dateFormatted}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Time: </Text>
            <Text style={styles.detailsInfo}>
              {`${formatTime(
                studySessionInfo.fromTime.hours,
                studySessionInfo.fromTime.minutes
              )} - ${formatTime(
                studySessionInfo.toTime.hours,
                studySessionInfo.toTime.minutes
              )}`}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Members: </Text>
            <Text style={styles.detailsInfo}>
              {studySessionInfo.participants.length + 1}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Location: </Text>
            <Text style={styles.detailsInfo}>{studySessionInfo.location}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>List of Members:</Text>
          {studySessionInfo.participants.map((participant, idx) => {
            return (
              <View key={idx} style={styles.userContainer}>
                <Image
                  source={userIcon}
                  accessible={false}
                  style={styles.userIcon}
                />
                <Text style={styles.userName}>{participant}</Text>
              </View>
            );
          })}
          <View style={styles.userContainer}>
            <Image
              source={userIcon}
              accessible={false}
              style={styles.userIcon}
            />
            <Text style={styles.userName}>{owner[0].name} (Owner)</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInner: {
    minHeight: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    height: '100%',
    width: '100%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    minHeight: 30,
  },
  tabLabel: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    textAlign: 'center',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  topTab: {
    backgroundColor: '#c1c3ec',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  innerSearchContainer: { backgroundColor: 'white' },
  searchPlaceholder: { fontWeight: 'bold' },
  accessDeniedView: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: '#6A74CF',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // textWrap: "wrap",
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  icon_message_box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // textWrap: "wrap",
  },
  icon: {
    width: 40,
    height: 40,
  },
  message: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  buttonJoin: {
    padding: 10,
    color: 'white',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#22810B',
    marginHorizontal: 20,
  },
  buttonLeave: {
    padding: 10,
    color: 'white',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#D72424',
    // marginHorizontal: 10,
  },
  buttonJoinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLeaveText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  modalHeading: {
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  modalButtonsView: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 10,
    color: 'white',
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  leaveConfirmButton: {
    padding: 10,
    color: 'white',
    backgroundColor: '#D72424',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  messageConfirm: {
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  detailsContainer: {
    justifyContent: 'center',
    borderColor: '#6A74CF',
    borderWidth: 2,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    // textWrap: "wrap",
  },
  detailsTitle: {
    fontWeight: 'bold',
    // textWrap: "wrap",
  },
  detailsInfo: {
    fontWeight: 'light',
    // textWrap: "wrap",
  },
  details: {
    flexDirection: 'row',
    marginTop: 5,
    // textWrap: "wrap",
    flexWrap: 'wrap',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    // textWrap: "wrap",
  },
  userIcon: {
    height: 30,
    width: 30,
  },
  userName: {
    fontWeight: 'semibold',
    marginLeft: 10,
  },
  study_sessions_button: {
    margin: 20,
    padding: 10,
    backgroundColor: '#9747FF',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  study_sessions_button_text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
