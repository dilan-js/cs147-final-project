import * as React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function DailySaves({ navigation }) {

  return (
    <View style={styles.container}>
      
    </View>
  );
}

export default function DailySavesScreen() {
  return (
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
            headerBackTitle: () => null,
          }}
        >
          <Stack.Screen 
            name="Today's Saves" 
            component={DailySaves} 
          />
        </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#121212',
    flex: 1,
  },
  segment1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  segment2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  handle: {
    fontSize: 16,
    color: '#C4C4C4',
  },
  picture: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    borderRadius: windowWidth / 4,
    margin: 10
  },
  friends: {
    justifyContent: 'flex-end',
    padding: 5,
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#C4C4C4',
    width: windowWidth / 2,
  },
  qSelection: {
    justifyContent: 'flex-start',
    padding: 5,
    alignItems: 'center',
    flex: 3,
    width: windowWidth / 2,
  },
  text: {
    fontSize: 22,
    color: '#C4C4C4'
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#535353',
    width: '200%'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#C4C4C4',
  }
});