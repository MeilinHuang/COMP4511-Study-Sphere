import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudySessionCard from '../components/StudySessionCard';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function StudySessions({
  navigation,
  route,
  users,
  courses,
  studySessions,
  userId,
  setUsers,
  setCourses,
  setStudySessions,
  setUserId,
}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'All Sessions',
      accessibilityLabel: 'Viewing all study sessions',
    },
    {
      key: 'second',
      title: 'My Sessions',
      accessibilityLabel: 'Viewing my study sessions',
    },
  ]);
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const [listOfStudySessions, setListOfStudySessions] = useState([]);

  const userOfInterest = users.filter((user) => user.id === userId);
  useEffect(() => {
    getCreatedStudySessions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCreatedStudySessions();
    }, [])
  );

  const handleJoin = async (idx) => {
    try {
      const dataOfInterest = await AsyncStorage.getItem('createSessionData');
      if (dataOfInterest) {
        const parsedData = JSON.parse(dataOfInterest);
        const updatedSessions = parsedData.map((data, sessionIdx) => {
          if (sessionIdx === idx) {
            return {
              ...data,
              participants: [
                ...data.participants,
                userOfInterest[0].name,
              ],
            };
          }
          return data;
        });
        await AsyncStorage.setItem(
          'createSessionData',
          JSON.stringify(updatedSessions)
        );
        setListOfStudySessions(updatedSessions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeave = (idx) => {
    const updatedSession = [...listOfStudySessions];

    const userIndex = updatedSession[idx].participants;
    console.log(userIndex);
  };
  console.log(listOfStudySessions)

  const renderAllSessions = () => {
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          placeholder='Search for study sessions'
          onChangeText={setSearch}
          value={search}
          lightTheme
          round
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.innerSearchContainer}
          inputStyle={styles.searchPlaceholder}
          placeholderTextColor='#6A74CF'
          accessibilityRole='search'
        />
        {listOfStudySessions.map((data, idx) => (
          <StudySessionCard
            key={idx}
            studySessionInfo={data}
            userId={userId}
            navigation={navigation}
            sessionIdx={idx}
            handleJoin={handleJoin}
            handleLeave={handleLeave}
          />
        ))}
        <Pressable
          accessibilityLabel='Logout'
          onPress={() => navigation.navigate('Login')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    );
  };

  // const getAllKeysAndValues = async () => {
  //   try {
  //     const allKeys = await AsyncStorage.getAllKeys();
  //     const items = await AsyncStorage.multiGet(allKeys);

  //     // Log or display the stored key-value pairs
  //     items.forEach(([key, value]) => {
  //       console.log(`Key: ${key}, Value: ${value}`);
  //       // You can display this information in your app or handle it accordingly
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // getAllKeysAndValues();

  const renderMySessions = () => {
    const sessionsOwner = listOfStudySessions.filter(
      (session) => session.owner === userId
    );
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          placeholder='Search for my study sessions'
          onChangeText={setSearch}
          value={search}
          lightTheme
          round
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.innerSearchContainer}
          inputStyle={styles.searchPlaceholder}
          placeholderTextColor='#6A74CF'
          accessibilityRole='search'
        />
        {sessionsOwner.map((data, idx) => (
          <StudySessionCard
            key={idx}
            studySessionInfo={data}
            userId={userId}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    );
  };

  // console.log(listOfStudySessions);

  const getCreatedStudySessions = async () => {
    try {
      const dataOfInterest = await AsyncStorage.getItem('createSessionData');
      if (dataOfInterest) {
        const parsedData = JSON.parse(dataOfInterest);
        setListOfStudySessions(parsedData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderScene = SceneMap({
    first: renderAllSessions,
    second: renderMySessions,
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B6B2E6', '#C5DDBA']} style={styles.background}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.shadowProp}
              tabStyle={styles.topTab}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: focused ? 'white' : 'black',
                    backgroundColor: focused ? 'black' : 'transparent',
                    borderColor: focused ? 'white' : 'transparent',
                    width: Number((layout.width / routes.length).toFixed() - 4),
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          )}
        />
        <Pressable
          accessibilityLabel='Create study session'
          onPress={() => navigation.navigate('CreateStudySession')}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            paddingRight: 10,
          }}
        >
          <MaterialCommunityIcons name='plus-circle' size={80} color='black' />
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
