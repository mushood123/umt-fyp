import messaging from '@react-native-firebase/messaging';

// async function registerForPushNotificationsAsync() {
//    let token;

//    if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== 'granted') {
//          const { status } = await Notifications.requestPermissionsAsync();
//          finalStatus = status;
//       }

//       if (finalStatus !== 'granted') {
//          alert('Failed to get push token!');
//          return;
//       }

//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log('Expo Push Token:', token);
//    } else {
//       alert('Must use physical device for Push Notifications');
//    }

//    if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//          name: 'default',
//          importance: Notifications.AndroidImportance.MAX,
//          vibrationPattern: [0, 250, 250, 250],
//          lightColor: '#FF231F7C',
//       });
//    }

//    return token;
// }

async function requestUserPermission() {
   const authStatus = await messaging().requestPermission();
}

export { requestUserPermission };
