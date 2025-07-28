import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Function to create notification channels (Android only)
export async function createNotificationChannels() {
   if (Platform.OS === 'android') {
      // Create the default channel (matches app.json)
      await Notifications.setNotificationChannelAsync('default', {
         name: 'Default Notifications',
         importance: Notifications.AndroidImportance.DEFAULT, // Normal priority
         vibrationPattern: [0, 250, 250, 250], // Vibration pattern
         lightColor: '#FF231F7C', // Notification LED color
         sound: 'default', // Use default notification sound
         showBadge: true, // Show badge on app icon
      });

      // Create an additional high-priority channel (optional)
      await Notifications.setNotificationChannelAsync('alerts', {
         name: 'Alerts',
         importance: Notifications.AndroidImportance.HIGH, // High priority (pops on screen)
         vibrationPattern: [0, 500, 500, 500],
         lightColor: '#FF0000', // Red LED
         sound: 'default',
         showBadge: true,
         enableVibrate: true,
         enableLights: true,
      });

      // Create a low-priority channel (optional)
      await Notifications.setNotificationChannelAsync('updates', {
         name: 'Updates',
         importance: Notifications.AndroidImportance.LOW, // Low priority (silent by default)
         vibrationPattern: null, // No vibration
         sound: null, // No sound
         showBadge: false,
      });
   }
}
export const subscribeToTopic = async topic => {
   try {
      await messaging().subscribeToTopic(topic);
      // console.log("Subscribed to global notifications");
   } catch (error) {
      // console.error("Subscription to topic failed:", error);
   }
};

// Function to request notification permissions and get the FCM token
export async function getFCMToken() {
   try {
      // Request permission for notifications (required on iOS, optional on Android)
      const authStatus = await messaging().requestPermission();
      const enabled =
         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
         // Get the FCM token
         const fcmToken = await messaging().getToken();
         if (fcmToken) {
            // console.log("FCM Token:", fcmToken);
            return fcmToken;
         } else {
            return null;
         }
      } else {
         Alert.alert('Permission Denied', 'Please enable notifications in settings.');
      }
   } catch (error) {}
}

export async function setupForegroundHandler() {
   try {
      // Request permission
      const authStatus = await messaging().requestPermission();
      if (
         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
         authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
         const fcmToken = await messaging().getToken();
         console.log('FCM Token:', fcmToken);

         // Register for remote messages (iOS)
         await messaging().registerDeviceForRemoteMessages();

         // Background handler
         messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background Notification:', remoteMessage);
         });

         // Foreground handler
         messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
         });
      } else {
         console.log('Notification permission denied');
      }
   } catch (error) {
      console.error('Messaging Setup Error:', error);
   }
}

export async function requestNotificationPermission() {
   const { status } = await Notifications.requestPermissionsAsync();
   if (status !== 'granted') {
      return false;
   }
   return true;
}
