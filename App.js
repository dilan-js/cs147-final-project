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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio, Video } from "expo-av";
import sampleData from "./sampleData/sampleData.js";
export default function App() {
  const { width } = useWindowDimensions();
  const sidePadding = 20;
  const [currentStopTime, setCurrentStopTime] = useState();
  const prevTrackRef = useRef({
    song: sampleData[sampleData.length - 1],
    sound: null,
  });
  const [current, setCurrent] = useState({
    song: sampleData[0],
    sound: null,
    //index should be 'find by index in our sample data
    index: 0,
  });
  const [next, setNext] = useState({
    song: sampleData[1],
    sound: null,
    index: 1,
  });

  const loading = async (songNumber) => {
    const doesNextExist = sampleData[songNumber + 1];

    const { sound: currentSound } = await Audio.Sound.createAsync(
      sampleData[songNumber].musicLink
    );
    console.log(currentSound);
    const { sound: nextSound } = await Audio.Sound.createAsync(
      sampleData[songNumber + 1]?.musicLink
        ? sampleData[songNumber + 1].musicLink
        : sampleData[0].musicLink
    );

    if (prevTrackRef.current.sound == null) {
      const { sound: prevSound } = await Audio.Sound.createAsync(
        prevTrackRef.current.song.musicLink
      );
      prevTrackRef.current = {
        song: prevTrackRef.current.song,
        sound: prevSound,
        index: sampleData.length - 1,
      };
    } else {
      let newPrevSound = current.sound;
      await newPrevSound?.setPositionAsync(0);
      prevTrackRef.current = {
        song: current.song,
        sound: newPrevSound,
        index: current.index,
      };
    }
    setCurrent({
      song: sampleData[songNumber],
      sound: currentSound,
      index: songNumber,
    });
    setNext({
      song: doesNextExist ? sampleData[songNumber + 1] : sampleData[0],
      sound: nextSound,
      index: doesNextExist ? songNumber + 1 : 0,
    });
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    await currentSound.playAsync();
  };

  async function playSound() {
    console.log("Playing Sound");
    if (current.sound) {
      await current.sound.playAsync();
    }
  }

  async function stopSound() {
    if (current.sound) {
      await current.sound.stopAsync();
      console.log("stopped");
    }
  }

  useEffect(() => {
    loading(0);
  }, []);

  const [cardArray, setCardArray] = React.useState([
    {
      color: "red",
      text: "Hello world",
    },
    {
      color: "dodgerblue",
      text: "Hello world",
    },
    {
      color: "yellow",
      text: "yellow world",
    },
    {
      color: "orange",
      text: "organge world",
    },
    {
      color: "black",
      text: "black world",
    },
    {
      color: "pink",
      text: "pink world",
    },
    {
      color: "green",
      text: "green world",
    },
  ]);

  const disabled = false;
  const cardPosition = React.useRef(new Animated.Value(0)).current;

  //HATE THE SONG
  const onSwipedLeft = async () => {
    try {
      await current.sound.stopAsync();
      setCardArray((prev) => {
        let updatedArray = [...prev];
        updatedArray.splice(0, 1);
        const removedCard = updatedArray.splice(0, 1);
        updatedArray.push(removedCard[0]);
        return updatedArray;
      });
      // await current.sound?.unloadAsync();
      //update next
      // loading(current.song.currentIndex+1);
      loading(next.index);
    } catch (error) {
      console.log(error);
    }
  };
  //LOVE THE SONG
  const onSwipedRight = async () => {
    try {
      console.log("THIS IS CURRENT: ", current);
      await current.sound.stopAsync();
      setCardArray((prev) => {
        let updatedArray = [...prev];
        const removedCard = updatedArray.splice(0, 1);
        updatedArray.push(removedCard[0]);
        return updatedArray;
      });

      // await current.sound?.unloadAsync();
      loading(next.index);
    } catch (error) {
      console.log(error);
    }
  };
  const swipedLeft = () => {
    Animated.spring(cardPosition, {
      duration: 250,
      toValue: width * -1.25,
      useNativeDriver: true,
    }).start();
    onSwipedLeft();
    cardPosition.setValue(0);
  };

  const swipedRight = () => {
    Animated.spring(cardPosition, {
      duration: 250,
      toValue: width * 1.25,
      useNativeDriver: true,
    }).start();
    onSwipedRight();
    cardPosition.setValue(0);
  };
  const onEnd = (e, gestureState) => {
    const swiped =
      gestureState.dx < -width / 2
        ? "left"
        : gestureState.dx > width / 2
        ? "right"
        : false; //if the user moves card more than half of width of screen in neg. direction, then treat as swiped and push off.
    if (swiped === "right") {
      swipedRight();
      return;
    } else if (swiped === "left") {
      swipedLeft();
      return;
    } else {
      Animated.spring(cardPosition, {
        duration: 250,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const onMove = (e, gestureState) => {
    cardPosition.setValue(gestureState.dx);
  };

  //10 is how many pixels user needs to move the card to fire off
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (e, gestureState) =>
          Math.abs(gestureState.dx) > 10,
        onMoveShouldSetPanResponderCapture: (e, gestureState) =>
          Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dy) <= 5,
        onPanResponderGrant: () => !disabled,
        onPanResponderMove: onMove,
        onPanResponderRelease: onEnd,
        onPanResponderTerminate: onEnd,
        onShouldBlockNativeResponder: () => true,
        onPanResponderTerminationRequest: () => true,
      }),
    [current, next]
  );

  const styles = {
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 130,
    },
    screen: {
      flex: 1,

      backgroundColor: "#000000",
    },
    staccatoName: {
      color: "#FFFFFF",
    },
    main: {
      flex: 1,
    },
    baseCard: {
      height: 600,
      width: width - 2 * sidePadding,
      position: "absolute",
      left: sidePadding,
      top: 70,
    },
    secondCard: {
      height: 600,
      width: width - 2 * sidePadding,
      top: 90,
      position: "absolute",
      zIndex: 2,
      left: sidePadding,
    },
    thirdCard: {
      height: 600,
      width: width - 2 * sidePadding,
      top: 110,
      position: "absolute",
      zIndex: 3,
      left: sidePadding,
    },
    listeningIcons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.staccatoName}>Staccato</Text>
      </View>
      <View style={styles.main}>
        <Animated.View
          style={[
            styles.baseCard,
            {
              backgroundColor: cardArray[2].color,
              transform: [{ scale: 0.9 }, { perspective: 1000 }],
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.secondCard,
            {
              backgroundColor: cardArray[1].color,
              transform: [{ scale: 0.95 }, { perspective: 1000 }],
            },
          ]}
        >
          <View>
            <Text>HRYOOOO</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.thirdCard,
            {
              transform: [
                { perspective: 1000 },
                {
                  rotate: cardPosition.interpolate({
                    inputRange: [-width, -width / 2, 0, width / 2, width],
                    outputRange: [
                      "-45deg",
                      "-22.5deg",
                      "0deg",
                      "22.5deg",
                      "45deg",
                    ],
                  }),
                },
                {
                  translateX: cardPosition,
                },
                {
                  translateY: cardPosition.interpolate({
                    inputRange: [-width, -width / 2, 0, width / 2, width],
                    outputRange: [-100, -50, 0, 50, 100],
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={{ flex: 1, backgroundColor: cardArray[0].color }}>
            <Text>{cardArray[0].text}</Text>
          </View>
          <View style={styles.listeningIcons}>
            <Text>Icon1</Text>
            <Text>Icon1</Text>
            <Text>Icon1</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => playSound()}>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopSound()}>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
