import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { app } from "@react-native-google-signin/google-signin";
import { isFirebaseStorageLink } from "../../utils/utils";

export const savePost = async (postId, title, text, type, imageUri) => {
  let newPostId = postId;
  try {
    if (!postId) {
      const newPostRef = await firestore(app).collection("posts").add({
        title,
        text,
        type,
      });
      newPostId = newPostRef.id;
    } else {
      await firestore(app).collection("posts").doc(newPostId).set({
        title,
        text,
        type,
      });
    }
    console.log(imageUri);
    if (!isFirebaseStorageLink(imageUri)) {
      const imageRef = storage(app).ref(`ost_images/${newPostId}`);
      await imageRef.putFile(imageUri);
      return {
        post: {
          title,
          text,
          type,
        },
        postImage: await imageRef.getDownloadURL(),
        postId: newPostId,
      };
    }
    return {
      post: {
        title,
        text,
        type,
      },
      postImage: imageUri,
      postId: newPostId,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deletePost = async (postId) => {
  try {
    await firestore(app).collection("posts").doc(postId).delete();
    const imageRef = storage(app).ref(`ost_images/${postId}`);
    if (imageRef) {
      await imageRef.delete();
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getAllPostsWithImages = async () => {
  try {
    const postsSnapshot = await firestore(app).collection("posts").get();
    const posts = [];

    for (const postDoc of postsSnapshot.docs) {
      const post = postDoc.data();
      const postId = postDoc.id;

      const imageRef = storage(app).ref(`ost_images/${postId}`);
      const imageURL = await imageRef.getDownloadURL();
      const postWithImage = {
        post,
        postImage: imageURL,
        postId,
      };
      posts.push(postWithImage);
    }
    return posts;
  } catch (error) {
    return [];
  }
};
