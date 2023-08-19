import firestore from "@react-native-firebase/firestore";
import { app, GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const _googleAuth = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const { user } = await auth(app).signInWithCredential(googleCredential);
    const userData = await firestore(app).collection(user.uid).get();
    if (!userData) {
      await firestore(app).collection("USERS").doc(user.uid).update({
        type: "USER",
      });
    }
    return {
      user,
      type: userData?.type ?? "USER",
    };
  } catch (_err) {
    console.log(_err);
    return null;
  }
};
