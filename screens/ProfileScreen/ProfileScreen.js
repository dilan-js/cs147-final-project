import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.segment1}>
        <Image style={styles.picture} source={require('../../assets/profile.png')} />
        <Text style={styles.name}> Ben Early </Text>
        <Text style={styles.handle}> @benearly </Text>
      </View>
      <View style={styles.segment2}>
        <View style={styles.friends}>
          <Text style={styles.text}> Friends </Text>
        </View>
        <View style={styles.qSelection}>
          <Text style={styles.text}> Queue Criteria </Text>
        </View>
      </View>
    </View>
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
  }
});
