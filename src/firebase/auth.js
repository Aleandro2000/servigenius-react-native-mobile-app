import firestore from "@react-native-firebase/firestore";
import { app, GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const _googleAuth = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const { user } = await auth(app).signInWithCredential(googleCredential);
    const userData = await firestore(app).collection("users").doc(user.uid).get();
    if (!userData.exists) {
      await firestore(app).collection("users").doc(user.uid).set({
        type: "user",
      });
    }
    return {
      user,
      type: userData?.type ?? "users",
    };
  } catch (_err) {
    return null;
  }
};

export const _logout = async () => {
  try {
    await auth(app).signOut();
    return true;
  } catch (_err) {
    return false;
  }
};
