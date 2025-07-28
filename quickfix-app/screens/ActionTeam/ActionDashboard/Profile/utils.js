/* eslint-disable no-console */
import { firebaseDB } from '../../../../constants';
import { firebase as fDB } from '../../../../firebase';
import { firebase } from '@react-native-firebase/database';

export const database = () => firebase.app().database(firebaseDB);

// Get current authenticated user
export const getCurrentUser = () => {
   return fDB.getCurrentFirebaseUser ? fDB.getCurrentFirebaseUser() : null;
};

// Fetch user details from Realtime Database
export const getUserDetails = async uid => {
   if (!uid) return null;
   try {
      const snapshot = await database().ref?.(`users/${uid}/userData`).once('value');
      if (snapshot && snapshot.exists()) {
         return snapshot.val();
      }
      return null;
   } catch (error) {
      return null;
   }
};

export const toggleActivityStatus = async () => {
   const user = getCurrentUser();
   if (!user || !user.uid) return false;

   try {
      const ref = database().ref(`users/${user.uid}/userData/status`);
      const snapshot = await ref.once('value');

      if (snapshot.exists()) {
         const currentStatus = snapshot.val();
         const newStatus = currentStatus === 'active' ? 'offline' : 'active';

         await ref.set(newStatus);
         console.log(`Status updated to: ${newStatus}`);
         return newStatus;
      } else {
         // If status is not set, default to 'active'
         await ref.set('active');
         console.log('Status initialized to: active');
         return 'active';
      }
   } catch (error) {
      console.log('Failed to toggle status:', error);
      return false;
   }
};

export const handleLogout = async () => {
   try {
      await fDB.signOut();
      return true;
   } catch (error) {
      console.log('Logout error:', error);
      return false;
   }
};
