import firebase from "@react-native-firebase/app";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_MESSAGING_SENDER, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_WEB_CLIENT_ID,
} from "../../env";

export const app = !firebase.app.length ? firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER,
  appId: FIREBASE_APP_ID,
}) : firebase.app();

export const googleAuthInit = () => GoogleSignin.configure({
  offlineAccess: true,
  webClientId: FIREBASE_WEB_CLIENT_ID,
});
