import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAoQ5nI83z1zgLwKHxawOiOdVFbhuSY9io",
  authDomain: "crwn-db-9f553.firebaseapp.com",
  databaseURL: "https://crwn-db-9f553.firebaseio.com",
  projectId: "crwn-db-9f553",
  storageBucket: "crwn-db-9f553.appspot.com",
  messagingSenderId: "18868951983",
  appId: "1:18868951983:web:a1600d6833d4201c1f2d5a",
  measurementId: "G-P0RSYMHSP9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapRef = await userRef.get();

  if (!snapRef.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
