import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Friend(props) {
  const [clicked, setClicked] = useState(false);
  const [text, onChangeText] = useState(null);

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={()=> {
              clicked ? setClicked(false) : setClicked(true)
            }}
            style={clicked ? styles.friendClicked : styles.friend}>
        <View style={styles.picture}>
          <Image style={styles.image} source={require('../assets/profileIcon.png')}/>
        </View>
        <View style={styles.names}>
          <Text style={clicked ? styles.clickedName : styles.name}>{props.name}</Text>
          <Text style={clicked ? styles.clickedHandle : styles.handle}>{props.handle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    height: windowHeight / 8,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#535353',
    margin: 15,
    borderRadius: 5
  },
  friendClicked: {
    height: windowHeight / 8,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#F4B400',
    margin: 15,
  },
  picture: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  image: {
    width: windowWidth / 6,
    height: windowWidth / 6,
    borderRadius: windowWidth / 12,
  },
  names: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4C4C4'
  },
  handle: {
    fontSize: 16,
    color: '#C4C4C4'
  },
  clickedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212'
  },
  clickedHandle: {
    fontSize: 16,
    color: '#121212'
  },
});

        // {clicked && <TextInput
        //   editable
        //   maxLength={140}
        //   multiline
        //   numberOfLines={3}
        //   placeholder="Leave a message!"
        //   value={text}
        //   onChangeText={onChangeText}
        // />}