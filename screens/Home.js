import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  PanResponder,
  Image,
  Modal,
  Pressable,
} from "react-native";
import {useSelector} from 'react-redux';
import {setAction, getState} from '../redux/actions';
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { Audio, Video } from "expo-av";
import sampleData from "../sampleData/sampleData";
import Cuco from "../sampleData/CUCO.png";

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const currentQueue = useSelector((state) =>  state.queue.songs);
  const [progress, setProgress] = useState(0);
  const { width } = useWindowDimensions();
  const sidePadding = 20;
  const [currentStopTime, setCurrentStopTime] = useState();
  const prevTrackRef = useRef();
  const [current, setCurrent] = useState({
    song: sampleData[0],
    sound: null,
    duration: 0,
    //index should be 'find by index in our sample data
    index: 0,
  });
  const [next, setNext] = useState({
    song: sampleData[1],
    sound: null,
    duration: 0,
    index: 1,
  });

  

  const [playing, setPlaying] = useState(true);


   const goToQueue = () => {
      navigation.navigate("QueueView");
    }


  //LOADING
  //cant do based off index b/c we loop through the deck
  const loading = async (songNumber, initial) => {
    setDisabled(true);
    const doesNextExist = sampleData[songNumber + 1];
    const { sound: currentSound } = await Audio.Sound.createAsync(
      sampleData[songNumber].musicLink
    );
    const { sound: nextSound } = await Audio.Sound.createAsync(
      sampleData[songNumber + 1]?.musicLink
        ? sampleData[songNumber + 1].musicLink
        : sampleData[0].musicLink
    );

    //if initial is not false, meaning we are loading the next track
    //reset position to zero, put current into previous position.
    if (!initial) {
      let newPrevSound = current.sound;
      await newPrevSound?.setPositionAsync(current.song.start * 1000);
      prevTrackRef.current = {
        song: current.song,
        duration: 15,
        sound: newPrevSound,
        index: current.index,
      };
    }

   
    const {
      playableDurationMillis: currentSongDuration,
    } = await currentSound.getStatusAsync();
    const {
      playableDurationMillis: nextSongDuration,
    } = await nextSound.getStatusAsync();

    setCurrent({
      song: sampleData[songNumber],
      sound: currentSound,
      duration: 15,
      index: songNumber,
    });

    setNext({
      song: doesNextExist ? sampleData[songNumber + 1] : sampleData[0],
      sound: nextSound,
      duration: 15,
      index: doesNextExist ? songNumber + 1 : 0,
    });
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    // await currentSound.playAsync();

    await currentSound.setStatusAsync({
      shouldPlay: playing,
      positionMillis: sampleData[songNumber].start * 1000,
    });

    setProgress(0);
    setDisabled(false);
  };

  const undoSwipe = async () => {
    //already saving prev. track in the ref
    //don't show undo button on first card.
    const currentPlayStatus = playing;
    const newCurrentSong = prevTrackRef.current;
    prevTrackRef.current = null;
    setPlaying(false);
    setProgress(0);
    setCurrent({
      song: newCurrentSong.song,
      sound: newCurrentSong.sound,
      duration: newCurrentSong.duration,
      index: newCurrentSong.index,
    });
    setNext({
      song: current.song,
      sound: current.sound,
      duraton: current.duration,
      index: current.index,
    });
    await current.sound.setStatusAsync({
      shouldPlay: false,
      positionMillis: current.song.start * 1000,
    });

    await newCurrentSong.sound.setStatusAsync({
      shouldPlay: currentPlayStatus,
      positionMillis: newCurrentSong.song.start * 1000,
    });

    setPlaying(currentPlayStatus);
  };

  async function playSound() {
    console.log("Playing Sound");
    if (current.sound) {
      await current.sound.setStatusAsync({
        shouldPlay: true,
        positionMillis: (current.song.start + progress) * 1000,
      });
      setPlaying(true);
    }
  }

  async function stopSound() {
    if (current.sound) {
      await current.sound.setStatusAsync({
        shouldPlay: false,
        positionMillis: (current.song.start + progress) * 1000,
      });
      setPlaying(false);
      console.log("stopped");
    }
  }

  //this only happens on first load.
  useEffect(() => {
    loading(0, true);
  }, []);

  const [cardArray, setCardArray] = React.useState([
    {
      color: "#f4f4f4",
      text: "Hello world",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
    {
      color: "#f4f4f4",
      songTitle: "Lovetripper",
      artist: "Cuco",
      coverArt: { Cuco },
    },
  ]);

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
      await current.sound.stopAsync();
      setCardArray((prev) => {
        let updatedArray = [...prev];
        const removedCard = updatedArray.splice(0, 1);
        updatedArray.push(removedCard[0]);
        return updatedArray;
      });
      // await current.sound?.unloadAsync();
      const currentSongQueue = getState().queue.songs;
      setAction("queue", {songs: [...currentSongQueue, current.song]});
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

  const padWithZero = (string: number) => {
    return ("0" + string).slice(-2);
  };

  const humanizeDuration = (seconds: number) => {
    const isHoursMode = seconds >= 3600;
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60 - hours * 60);
    let secs = Math.floor(seconds - hours * 3600 - minutes * 60);
    return isHoursMode
      ? padWithZero(hours) +
          ":" +
          padWithZero(minutes) +
          ":" +
          padWithZero(secs)
      : padWithZero(minutes) + ":" + padWithZero(secs);
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
      top: 20,
      backgroundColor: "#f4f4f4",
      borderRadius: 10
    },
    secondCard: {
      height: 600,
      width: width - 2 * sidePadding,
      top: 40,
      position: "absolute",
      zIndex: 2,
      left: sidePadding,
      borderRadius: 10
    },
    thirdCard: {
      height: 600,
      width: width - 2 * sidePadding,
      top: 60,
      position: "absolute",
      zIndex: 3,
      left: sidePadding,
      borderRadius: 10
    },
    listeningIcons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    songTitle: {
      fontSize: 25,
      fontWeight: "500",
      textAlign: "center",
      padding: 5
    },
    artist: {
      fontSize: 16,
      fontWeight: "500",
      color: "#f4b400",
      textDecorationLine: "underline",
      textAlign: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    modalButtonOpen: {
      backgroundColor: "#F194FF",
    },
    modalButtonClose: {
      backgroundColor: "#2196F3",
    },
    modalTextStyle: {
      color: "black",
      zIndex: 5,
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalCenteredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
  };

  const onSeek = async (position) => {
    //position is the exact place user slid to
    await current.sound.setStatusAsync({
      shouldPlay: playing,
      positionMillis: current.song.start + position,
    });
    setProgress(position);
  };

  useEffect(() => {
    let progressInterval;
    if (playing) {
      progressInterval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      progressInterval && clearInterval(progressInterval);
    };
  }, [playing]);

  useEffect(() => {
    if (progress >= 15) {
      (async function resetTrack() {
        await current.sound.stopAsync();
        await current.sound.setStatusAsync({
          //if when we slide to the end and want to
          //start autoplay: do this; otherwise: shouldPlay: playing. Remove setPLaying also
          shouldPlay: true,
          positionMillis: current.song.start * 1000,
        });
        setProgress(0);
        setPlaying(true);
      })();
    }
  }, [progress, current, playing]);
  return (
    <View style={styles.screen}>
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
          pointerEvents={disabled ? "none" : "auto"}
        >
          <View
            style={{
               flex: 1,
              backgroundColor: "#f4f4f4",
              paddingTop: 30,
              paddingLeft: 0,
              alignItems: "center",
              justifyContent: 'space-evenly',
              borderRadius: 5,
            }}
          >
            <View
              style={{
                 justifyContent: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              <Image source={require("../sampleData/CUCO.png")} />
              <Text style={styles.songTitle}>{cardArray[0].songTitle}</Text>

              {/* <View style={styles.modalCenteredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.modalButtonClose]}
                          onClick={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.modalTextStyle}>Hide Modal</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonOpen]}
                    onClick={() => {
                      setModalVisible(true);
                      console.log("clicked modal");
                    }}
                  >
                    <Text style={{ color: "black" }}>Show Modal</Text>
                  </TouchableOpacity>
                </View> */}
              <Text style={styles.artist}>{cardArray[0].artist}</Text>
              <View
                style={{
                   backgroundColor: "#f4f4f4",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 10
                }}
              >
                <FontAwesome
                  name="undo"
                  size={30}
                  disabled={prevTrackRef.current == null}
                  onPress={undoSwipe}
                  color={prevTrackRef.current == null ? "#d8d8d8" : "black"}
                />

                <FontAwesome
                  onPress={playing ? stopSound : playSound}
                  name={playing ? "pause-circle" : "play-circle"}
                  size={50}
                  color="black"
                />
                <FontAwesome name="share" size={30} color="black" />
              </View>
              <View
                style={{
                 backgroundColor: "#f4f4f4",
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingHorizontal: 20,
                }}
              >
                <Slider
                  style={{ height: 40, marginHorizontal: 10 }}
                  minimumValue={0}
                  value={Math.floor(progress)}
                  onSlidingComplete={onSeek}
                  maximumValue={current.duration}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{humanizeDuration(progress)}</Text>
                  <Text>-{humanizeDuration(current.duration - progress)}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* <View style={styles.container}>
        <TouchableOpacity onPress={() => playSound()}>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopSound()}>
          <Text>BUtton </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToQueue}>
        <Text>Queue: {currentQueue.length}  </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>BUtton 1</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
