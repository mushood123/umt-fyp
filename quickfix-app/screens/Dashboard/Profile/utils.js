/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseDB } from '../../../constants';
import { firebase as fDB } from '../../../firebase';
import { firebase } from '@react-native-firebase/database';
import { ref, update } from 'firebase/database';
import { database } from '../../../firebase/database';

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

export const handleLogout = async () => {
   try {
      await fDB.signOut();
      return true;
   } catch (error) {
      console.log('Logout error:', error);
      return false;
   }
};

export const updateUserProfile = async (userId, userData) => {
   try {
      // Remove any sensitive data that shouldn't be updated
      const { password, ...safeData } = userData;

      // Update Firebase Realtime Database
      // Get a reference to the database

      // Reference to the specific user data path
      await database().ref(`users/${userId}/userData`).update(safeData);

      // Also update local storage for offline access
      await AsyncStorage.setItem(
         'userData',
         JSON.stringify({
            ...userData,
            uid: userId,
         })
      );

      return true;
   } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
   }
};
