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

import Home from "../staccato/screens/HomeSongCards/Home";
export default function App() {
  return (
    <>
      <Home />
    </>
  );
}
