import {
  Button, Center, ScrollView, Text,
} from "native-base";
import React from "react";
import { sgred1, sgwhite1 } from "../utils/colors";

export default function AuthScreen() {
  return (
    <ScrollView>
      <Center my={5}>
        <Button backgroundColor={sgred1}>
          <Text color={sgwhite1} bold>
            Use with Google
          </Text>
        </Button>
      </Center>
    </ScrollView>
  );
}
