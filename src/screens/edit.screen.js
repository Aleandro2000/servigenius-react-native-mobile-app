import React, { useContext, useState } from "react";
import {
  Button, TextArea, Input, Text, ScrollView,
} from "native-base";
import { launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import { savePost } from "../firebase/queries/post.query";
import { sgred1, sgwhite1 } from "../utils/colors";
import { DataContext } from "../contexts/data.context";
import { messages } from "../utils/messages";

export default function EditScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useContext(DataContext);

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
      savePost(null, title, text, type, imageUri).then((result) => {
        setData([...data, result]);
        navigation.goBack();
      }).catch(() => {});
    }
  };

  return (
    <ScrollView p={3}>
      <Button backgroundColor={sgred1} onPress={handleChooseImage}>
        <Text color={sgwhite1}>{!imageUri ? "Choose Image" : "Uploaded"}</Text>
      </Button>
      <Input defaultValue={title} onChangeText={handleChange(setTitle)} my={1} p={3} _focus={{ borderColor: sgred1, bg: sgwhite1 }} borderWidth={2} borderRadius={10} placeholder="Title" />
      <TextArea defaultValue={text} onChangeText={handleChange(setText)} my={1} p={3} _focus={{ borderColor: sgred1, bg: sgwhite1 }} borderWidth={2} borderRadius={10} placeholder="Text" />
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
      <Button backgroundColor={sgred1} onPress={handleSavePost}>
        <Text color={sgwhite1}>
          Save Post
        </Text>
      </Button>
    </ScrollView>
  );
}
