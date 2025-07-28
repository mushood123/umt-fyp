// @ts-nocheck
import auth from '@react-native-firebase/auth';
import { database } from './database';
import messaging from '@react-native-firebase/messaging';

export const createUserWithEmailAndPassword = ({ email, password, successCallback, errorCallback }) => {
   auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
         successCallback('User account created & signed in!');
      })
      .catch(error => {
         errorCallback(error);
      });
};

export const signInWithEmailAndPassword = async ({ email, password, successCallback, errorCallback }) => {
   try {
      const token = await messaging().getToken();

      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      // Save FCM token to user's data in realtime database
      await database().ref(`users/${userCredential.user.uid}/fcmToken`).set(token);

      successCallback('signed in!');
   } catch (error) {
      errorCallback(error);
   }
};

export const signOut = successCB => {
   auth()
      .signOut()
      .then(() => {
         successCB();
      });
};

export const onAuthStateChanged = callBack => {
   auth().onAuthStateChanged(callBack);
};

export const getCurrentFirebaseUser = () => auth().currentUser;
