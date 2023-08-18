import {
  Box, Center, Image, PresenceTransition,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DEFAULT_DURATION, LONG_DURATION } from "../utils/durations";
import { sgred1, sgwhite1 } from "../utils/colors";
import HomeScreen from "./home.screen";
import ServiceScreen from "./service.screen";
import ContactScreen from "./contact.screen";
import AuthScreen from "./auth.screen";
import { navigationRef } from "../utils/navigation";

const Stack = createStackNavigator();

export default function SplashScreen() {
  const [loaded, setLoaded] = useState(false);
  const routeNameRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, LONG_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return !loaded ? (
    <Box flex={1} flexDirection="row" justifyContent="center" alignItems="center" bg={sgwhite1}>
      <PresenceTransition
        initial={{
          opacity: 0,
        }}
        visible
        animate={{
          opacity: 1,
          transition: {
            duration: DEFAULT_DURATION,
          },
        }}
      >
        <Center>
          <Image
            width={300}
            height={300}
            source={require("../../assets/logo.png")}
            alt="ServiGenius Logo Ilustration"
            resizeMode="contain"
          />
        </Center>
      </PresenceTransition>
    </Box>
  ) : (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          orientation: "portrait",
          headerStyle: { backgroundColor: sgred1 },
          headerTintColor: sgwhite1,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Authentication" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
