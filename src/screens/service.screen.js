import {
  Button, Center, Container, ScrollView, Text,
} from "native-base";
import React, { useContext } from "react";
import CardTemplate from "../templates/card.template";
import { sgred1, sgwhite1 } from "../utils/colors";
import { _logout } from "../firebase/auth";
import { UserContext } from "../contexts/user.context";
import { push, reset } from "../utils/navigation";
import { DataContext } from "../contexts/data.context";

export default function ServiceScreen() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [data] = useContext(DataContext);

  const handleLogout = () => {
    _logout().then((result) => {
      if (result) {
        setCurrentUser();
        reset("Home");
      }
    }).catch(() => {});
  };

  return (
    <ScrollView>
      <Center flex={1}>
        <Container my={3} justifyContent="center" alignItems="center">
          <Button my={2} onPress={handleLogout} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              LOGOUT
            </Text>
          </Button>
          <Button my={2} onPress={() => push("Contact")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              Contact
            </Text>
          </Button>
          <Button my={2} onPress={() => push("Add&Edit Post")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              ADD POST
            </Text>
          </Button>
          {
            data?.filter((item) => item?.post?.type === "SERVICE")?.map((item, key) => (
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
