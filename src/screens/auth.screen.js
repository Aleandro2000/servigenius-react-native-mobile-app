import {
  Button, Center, ScrollView, Text,
} from "native-base";
import React, { useContext } from "react";
import { sgred1, sgwhite1 } from "../utils/colors";
import { _googleAuth } from "../firebase/auth";
import { UserContext } from "../contexts/user.context";
import { push } from "../utils/navigation";

export default function AuthScreen() {
  const [, setCurrentUser] = useContext(UserContext);

  const handleAuth = () => {
    _googleAuth().then((user) => {
      if (user) {
        setCurrentUser(user);
        push("Service");
      }
    }).catch(() => {});
  };

  return (
    <ScrollView>
      <Center my={5}>
        <Button onPress={handleAuth} backgroundColor={sgred1}>
          <Text color={sgwhite1} bold>
            Use with Google
          </Text>
        </Button>
      </Center>
    </ScrollView>
  );
}
