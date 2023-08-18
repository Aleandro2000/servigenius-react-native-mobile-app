import React from "react";
import {
  Box, Text, Image,
} from "native-base";

export default function CardTemplate({ coverImage, title, text }) {
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
      <Image source={{ uri: coverImage }} alt="Cover Image" size="xl" resizeMode="cover" mb={4} />
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.600">
        {text}
      </Text>
    </Box>
  );
}
