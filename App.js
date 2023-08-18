import { NativeBaseProvider } from "native-base";
import React from "react";
import { LogBox } from "react-native";
import SplashScreen from "./src/screens/splash.screen";
import "react-native-gesture-handler";

// NOTE - it's used to ignore all yellow logs
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NativeBaseProvider>
      <SplashScreen />
    </NativeBaseProvider>
  );
}
