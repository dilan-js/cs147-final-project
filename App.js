import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import AssetExample from './Components/AssetExample';
import { Card } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import GenreScreen from './screens/GenreScreen/GenreScreen';
import PickArtistScreen from './screens/PickArtistScreen/PickArtistScreen';
import ReasonScreen from './screens/ReasonScreen/ReasonScreen';
import SongComponentScreen from './screens/SongComponentScreen/SongComponentScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShareScreen from './screens/ShareScreen.js/ShareScreen';
import ShareConfirmationScreen from './screens/ShareConfirmationScreen/ShareConfirmationScreen';
import HomeSongCards from './screens/HomeSongCards/Home';
import QueueView from './screens/QueueView/QueueView';
import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;

function LogoTitle() {
  return (
   <Image style={styles.logo} source={require('./assets/logo.png')}/>
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
            <Image style={styles.back} source={require('./assets/previous.png')}/>
          ),
          headerBackTitle: () => null,
        }}
      >
        {/* <Stack.Screen 
          name="Share Snippet" 
          component={ShareScreen} 
        />
        <Stack.Screen 
          name="ShareConfirmationScreen" 
          component={ShareConfirmationScreen} 
          options={{ headerShown: false }}
        /> 
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
        /> */}
        <Stack.Screen 
          name="HomeSongCardsScreen" 
          component={HomeSongCards}
          options={{ headerTitle: props => <LogoTitle {...props} /> }}  
        />
        <Stack.Screen 
          name="QueueView" 
          component={QueueView}
          options={{ headerTitle: props => <LogoTitle {...props} /> }}  
        />
        {/* <Stack.Screen 
          name="Profile"
          component={ProfileScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 30,
    height: 45,
  },
  back: {
    width: 25,
    height: 25
  }
});
