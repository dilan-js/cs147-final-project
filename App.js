import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
  const [sound, setSound] = React.useState();
  const [currentStopTime, setCurrentStopTime] = useState();

  const loading = async () => {
    const { sound } = await Audio.Sound.createAsync(sampleData.song1.musicLink);
    console.log("THIS IS SOUND: ", sound);
    setSound(sound);
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  };

  async function playSound() {
    console.log("Playing Sound");
    if (sound) {
      await sound.playAsync();
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      console.log("stopped");
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    loading();
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

  const onSwipedLeft = () => {
    setCardArray((prev) => {
      let updatedArray = [...prev];
      updatedArray.splice(0, 1);
      const removedCard = updatedArray.splice(0, 1);
      updatedArray.push(removedCard[0]);
      return updatedArray;
    });
  };
  const onSwipedRight = () => {
    setCardArray((prev) => {
      let updatedArray = [...prev];
      const removedCard = updatedArray.splice(0, 1);
      updatedArray.push(removedCard[0]);
      return updatedArray;
    });
  };
  console.log(cardArray);
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
  const panResponder = React.useRef(
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
    })
  ).current;

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
