import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GenreScreen({ navigation }) {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <Text style={styles.question}>Select Genre(s)</Text>
      </View>
      <View style={styles.inner}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={()=> {
              clicked1 ? setClicked1(false) : setClicked1(true)
            }}
            style={clicked1 ? styles.clicked : styles.box}
          >
            <Text style={styles.boxText}>Pop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> {
              clicked2 ? setClicked2(false) : setClicked2(true)
            }}
            style={clicked2 ? styles.clicked : styles.box}
          >
            <Text style={styles.boxText}>Rap</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={()=> {
              clicked3 ? setClicked3(false) : setClicked3(true)
            }}
            style={clicked3 ? styles.clicked : styles.box}
          >
            <Text style={styles.boxText}>R&B</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> {
              clicked4 ? setClicked4(false) : setClicked4(true)
            }}
            style={clicked4 ? styles.clicked : styles.box}
          >
            <Text style={styles.boxText}>Indie Rock</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.outer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {navigation.navigate('PickArtistScreen')}}
        >
          <Image style={styles.arrow} source={require('../../assets/arrow.png')}/>
        </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#535353',
    width: windowWidth / 3,
    height: windowWidth / 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    borderWidth: 2,
    borderRadius: 10
  },
  clicked: {
    backgroundColor: '#535353',
    width: windowWidth / 3,
    height: windowWidth / 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    borderColor: '#F4B400',
    borderWidth: 2,
    borderRadius: 10
  },
  boxText: {
    fontSize: 24,
    color: '#C4C4C4',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  arrow: {
    padding: 25,
    width: 32,
    height: 32,
    color: '#F4B400'
  },
  outer: {
    flex: 1,
    justifyContent: 'center'    
  },
  inner: {
    flex: 2
  },
  question: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#C4C4C4',
    textAlign: 'center'
  }
});
