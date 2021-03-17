import React, { useState } from "react";
import PropTypes from "prop-types"; //consider using this!
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Friend from "../../Components/Friend";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default function ShareScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => {navigation.navigate('ShareConfirmationScreen')}}>
          <Image style={styles.arrow} source={require('../../assets/arrow.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Friend name={"Josh Lara"} handle={"@jlara"} pic={'../../assets/profileIcon.png'}/>
        <Friend name={"Dilan Nana"} handle={"@NanaDilan"} pic={'../../assets/profileIcon.png'}/>
        <Friend name={"Jane Doe"} handle={"@JohnD"} pic={'../../assets/profileIcon.png'}/>
        <Friend name={"John Doe"} handle={"@JaneD"} pic={'../../assets/profileIcon.png'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    flexDirection: 'column'
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    flex: 9
  },
  top: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '95%',
    flex: 1,
  },
  arrow: {
    width: windowWidth / 10,
    height: windowWidth / 10
  }
});
