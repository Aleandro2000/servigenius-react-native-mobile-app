import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import SplashScreen from "./src/screens/splash.screen";
import "react-native-gesture-handler";
import { UserContext } from "./src/contexts/user.context";
import { googleAuthInit } from "./src/firebase/config";

// NOTE - it's used to ignore all yellow logs
LogBox.ignoreAllLogs();

export default function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    googleAuthInit();
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <NativeBaseProvider>
        <SplashScreen />
      </NativeBaseProvider>
    </UserContext.Provider>
  );
}
