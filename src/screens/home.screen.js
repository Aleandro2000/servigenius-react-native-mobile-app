import {
  Button, Center, Container, ScrollView, Text,
} from "native-base";
import React, { useContext } from "react";
import CardTemplate from "../templates/card.template";
import { sgred1, sgwhite1 } from "../utils/colors";
import { push } from "../utils/navigation";
import { DataContext } from "../contexts/data.context";

export default function HomeScreen() {
  const [data] = useContext(DataContext);

  return (
    <ScrollView>
      <Center flex={1}>
        <Container my={3} justifyContent="center" alignItems="center">
          <Button onPress={() => push("Authentication")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              Authenticate
            </Text>
          </Button>
          {
            data?.filter((item) => item?.post?.type === "HOME")?.map((item, key) => (
              <CardTemplate
                key={`Item ${key + 1}`}
                coverImage={item?.postImage}
                title={item?.post?.title}
                text={item?.post?.text}
              />
            ))
          }
        </Container>
      </Center>
    </ScrollView>
  );
}
