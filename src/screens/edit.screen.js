import React, { useContext, useState } from "react";
import {
  Button, TextArea, Input, Text, ScrollView, Box,
} from "native-base";
import { launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { savePost } from "../firebase/queries/post.query";
import { sgred1, sgwhite1 } from "../utils/colors";
import { DataContext } from "../contexts/data.context";
import { messages } from "../utils/messages";

export default function EditScreen({
  navigation, route,
}) {
  const { postId, coverImage, post } = route.params;
  const [imageUri, setImageUri] = useState(coverImage ?? null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [text, setText] = useState(post?.text ?? "");
  const [type, setType] = useState(post?.type ?? "");
  const [data, setData] = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (setValue) => (value) => setValue(value);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSavePost = async () => {
    if (title && text && type && imageUri) {
      setLoading(true);
      savePost(postId ?? null, title, text, type, imageUri).then((result) => {
        setData([...data, result]);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "SUCCESS",
          text: messages.SUCCESSFULLY,
        });
        setLoading(false);
        if (postId) {
          setData(data?.map((item) => {
            if (item?.postId === postId) {
              return {
                ...item,
                ...{
                  post: result.post,
                  postImage: result.postImage,
                },
              };
            }
            return item;
          }));
        }
        navigation.goBack();
      }).catch(() => {
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "FAILED",
          text: messages.FAILED,
        });
      });
    }
  };

  return (
    <ScrollView p={3}>
      <Button backgroundColor={sgred1} onPress={handleChooseImage}>
        <Text color={sgwhite1}>{!imageUri ? "Choose Image" : "Uploaded"}</Text>
      </Button>
      <Input defaultValue={title} onChangeText={handleChange(setTitle)} my={1} p={3} _focus={{ borderColor: sgred1, bg: sgwhite1 }} borderColor={sgred1} borderWidth={2} borderRadius={10} placeholder="Title" />
      <TextArea defaultValue={text} onChangeText={handleChange(setText)} my={1} p={3} _focus={{ borderColor: sgred1, bg: sgwhite1 }} borderColor={sgred1} borderWidth={2} borderRadius={10} placeholder="Text" />
      <Box my={1} p={3} borderColor={sgred1} borderWidth={2} borderRadius={10}>
        <Picker
          placeholder="Type"
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="HOME" value="HOME" />
          <Picker.Item label="SERVICE" value="SERVICE" />
          <Picker.Item label="CONTACT" value="CONTACT" />
        </Picker>
      </Box>
      <Button backgroundColor={sgred1} onPress={handleSavePost}>
        <Text color={sgwhite1}>
          {!loading ? "Save Post" : "Loading..."}
        </Text>
      </Button>
    </ScrollView>
  );
}
