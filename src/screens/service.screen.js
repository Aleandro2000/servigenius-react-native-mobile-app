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
        setCurrentUser(null);
        reset("Home");
      }
    }).catch(() => { });
  };

  return (
    <ScrollView>
      <Center flex={1}>
        <Container width="xl" my={3} justifyContent="center" alignItems="center">
          <Button w="full" my={2} onPress={handleLogout} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              LOGOUT
            </Text>
          </Button>
          <Button w="full" my={2} onPress={() => push("Home")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              Home
            </Text>
          </Button>
          <Button w="full" my={2} onPress={() => push("Contact")} backgroundColor={sgred1}>
            <Text color={sgwhite1} bold>
              Contact
            </Text>
          </Button>
          {
            currentUser?.type === "ADMIN" ? (
              <Button
                w="full"
                my={2}
                onPress={() => push("Add&Edit Post", {
                  postId: null,
                  post: null,
                })}
                backgroundColor={sgred1}
              >
                <Text color={sgwhite1} bold>
                  ADD POST
                </Text>
              </Button>
            ) : null
          }
          {
            data?.filter((item) => item?.post?.type === "SERVICE")?.map((item, key) => (
              <CardTemplate
                key={`Item ${key + 1}`}
                coverImage={item?.postImage}
                title={item?.post?.title}
                text={item?.post?.text}
                type={item?.post?.type}
                postId={item?.postId}
              />
            ))
          }
        </Container>
      </Center>
    </ScrollView>
  );
}
