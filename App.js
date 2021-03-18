import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  PanResponder,
  Image
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio, Video } from "expo-av";
import sampleData from "./sampleData/sampleData.js";
import { Icons } from './assets/Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import WelcomeScreen from './screens/WelcomeScreen';
import GenreScreen from './screens/GenreScreen';
import PickArtistScreen from './screens/PickArtistScreen';
import ReasonScreen from './screens/ReasonScreen';
import SongComponentScreen from './screens/SongComponentScreen';

import HomeScreen from './screens/Home';
import AllSavesScreen from './screens/AllSavesScreen';
import FriendRecScreen from './screens/FriendRecScreen';
import ProfileScreen from './screens/ProfileScreen';
import DailySavesScreen from './screens/DailySavesScreen';
import {Provider} from 'react-redux';
import store from './redux/store';

function LogoTitle() {
  return (
   <Image style={styles.logo} source={require('./screens/logo.png')}/>
  );
}

function TabNav({navigation}) {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              color = focused ? '#f4b400' : '#c4c4c4';
            } else if (route.name === 'Friend Recs') {
              iconName = 'people';
              color = focused ? '#f4b400' : '#c4c4c4';
            } else if (route.name === 'Daily Saves') {
              iconName = 'bookmark';
              color = focused ? '#f4b400' : '#c4c4c4';
            } else if (route.name === 'All Saves') {
              iconName = 'bookmarks';
              color = focused ? '#f4b400' : '#c4c4c4';
            } else if (route.name === 'Profile') {
              iconName = 'person';
              color = focused ? '#f4b400' : '#c4c4c4';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
          tabBarOptions={{
            activeTintColor: '#f4b400',
            inactiveTintColor: '#c4c4c4',
            style: {backgroundColor: "#535353"}
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Friend Recs" component={FriendRecScreen} />
          <Tab.Screen name="Daily Saves" component={DailySavesScreen} />
          <Tab.Screen name="All Saves" component={AllSavesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

        
  );
}


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#535353",
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: '#C4C4C4',
          },
          headerBackImage: () => (
            <Image style={styles.back} source={require('./screens/previous.png')}/>
          ),
          headerBackTitle: () => null,
        }}
      >
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GenreScreen" 
          component={GenreScreen} 
          options={{ headerTitle: props => <LogoTitle {...props} /> }}
        />
        <Stack.Screen 
          name="PickArtistScreen" 
          component={PickArtistScreen}
          options={{ headerTitle: props => <LogoTitle {...props} /> }} 
        />
        <Stack.Screen 
          name="ReasonScreen" 
          component={ReasonScreen}
          options={{ headerTitle: props => <LogoTitle {...props} /> }} 
        />
        <Stack.Screen 
          name="SongComponentScreen" 
          component={SongComponentScreen}
          options={{ headerTitle: props => <LogoTitle {...props} /> }}  
        />
        <Stack.Screen 
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ 
            headerShown: false, 
            headerLeft: null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 45,
  },
  back: {
    width: 25,
    height: 25
  }
});
