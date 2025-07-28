import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase } from '../firebase';
import { Navigation } from '../navigation';
import { requestUserPermission } from '../utils/fcm';
import { requestNotificationPermission, createNotificationChannels } from '../utils/notification';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

enableScreens();

// Configure notification behavior
Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
   }),
});

async function setupFirebaseMessaging() {
   try {
      const permissionGranted = await requestNotificationPermission();
      if (!permissionGranted) return;
      const authStatus = await messaging().requestPermission();
      const enabled =
         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
         const fcmToken = await messaging().getToken();
         // console.log("FCM Token:", fcmToken);
         // Register for remote messages (iOS)
         await messaging().registerDeviceForRemoteMessages();

         // Handle Background Notifications
         messaging().setBackgroundMessageHandler(async remoteMessage => {
            await Notifications.scheduleNotificationAsync({
               content: {
                  title: remoteMessage.notification?.title || 'New Notification',
                  body: remoteMessage.notification?.body || 'You have a new message',
                  sound: 'default',
               },
               trigger: null, // Show immediately
            });
         });

         // Handle Foreground Notifications
         messaging().onMessage(async remoteMessage => {
            await Notifications.scheduleNotificationAsync({
               content: {
                  title: remoteMessage.notification?.title || 'New Notification',
                  body: remoteMessage.notification?.body || 'You have a new message',
                  sound: 'default',
               },
               trigger: null, // Show immediately
            });
         });
      } else {
         // Again ask for permission because permission denied
         requestNotificationPermission();
      }
   } catch (error) {
      Alert.alert('Notification setup issue', 'Something went wrong while setup of messaging');
   }
}

const App = () => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsubscribe = firebase.onAuthStateChanged(user => {
         setUser(user);
      });
      requestUserPermission();
      setupFirebaseMessaging();
      createNotificationChannels();

      return unsubscribe;
   }, []);

   return (
      <>
         <Navigation user={user} />
         <StatusBar style={'dark'} />
      </>
   );
};

export default App;
