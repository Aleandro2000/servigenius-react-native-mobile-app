import React, { useContext, useState } from "react";
import {
  Box, Text, Image, Button, Center,
} from "native-base";
import { deletePost } from "../firebase/queries/post.query";
import { sgred1, sgwhite1 } from "../utils/colors";
import { DataContext } from "../contexts/data.context";
import { push } from "../utils/navigation";
import { UserContext } from "../contexts/user.context";

export default function CardTemplate({
  postId, coverImage, title, text, type,
}) {
  const [currentUser] = useContext(UserContext);
  const [data, setData] = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deletePost(postId).then((result) => {
      if (result) {
        setData(data?.filter((item) => item?.postId !== postId));
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <Box
      shadow={2}
      rounded="lg"
      overflow="hidden"
      width="100%"
      bg="white"
      p={4}
      m={4}
    >
      {
        currentUser?.type === "ADMIN" ? (
          <Button mb={5} disabled={loading} onPress={handleDelete} background={sgred1}>
            <Text color={sgwhite1}>
              {!loading ? "DELETE" : "WAITING..."}
            </Text>
          </Button>
        ) : null
      }
      <Center>
        <Image source={{ uri: coverImage }} alt="Cover Image" size="xl" resizeMode="cover" my={4} />
      </Center>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.600">
        {text}
      </Text>
      {
        currentUser?.type === "ADMIN" ? (
          <Button
            disabled={loading}
            mt={10}
            onPress={() => push("Add&Edit Post", {
              post: {
                title,
                text,
                type,
              },
              coverImage,
              postId,
            })}
            background={sgred1}
          >
            <Text color={sgwhite1}>
              EDIT
            </Text>
          </Button>
        ) : null
      }
    </Box>
  );
}
