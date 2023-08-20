import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import SplashScreen from "./src/screens/splash.screen";
import "react-native-gesture-handler";
import { UserContext } from "./src/contexts/user.context";
import { googleAuthInit } from "./src/firebase/config";
import { DataContext } from "./src/contexts/data.context";
import { getAllPostsWithImages } from "./src/firebase/queries/post.query";

// NOTE - it's used to ignore all yellow logs
LogBox.ignoreAllLogs();

export default function App() {
  const [currentUser, setCurrentUser] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    googleAuthInit();
    if (!data) {
      getAllPostsWithImages().then((result) => {
        setData(result);
      }).catch();
    }
  }, []);

  return (
    <DataContext.Provider value={[data, setData]}>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <NativeBaseProvider>
          <SplashScreen />
        </NativeBaseProvider>
      </UserContext.Provider>
    </DataContext.Provider>
  );
}
