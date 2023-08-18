import {
  Button, Center, Container, ScrollView, Text,
} from "native-base";
import React from "react";
import CardTemplate from "../templates/card.template";
import { sgred1, sgwhite1 } from "../utils/colors";
import { push } from "../utils/navigation";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Center flex={1}>
        <Container my={3} justifyContent="center" alignItems="center">
          <Button onPress={() => push("Authentication")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              Authenticate
            </Text>
          </Button>
          <CardTemplate
            coverImage="https://placekitten.com/200/300"
            title="Sample Card Title"
            text="This is a sample card description."
          />
          <CardTemplate
            coverImage="https://placekitten.com/200/300"
            title="Sample Card Title"
            text="This is a sample card description."
          />
          <CardTemplate
            coverImage="https://placekitten.com/200/300"
            title="Sample Card Title"
            text="This is a sample card description."
          />
        </Container>
      </Center>
    </ScrollView>
  );
}
