import { firebase } from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveBusinessLocation = async (uid, locationData) => {
   try {
      await firebase.database().ref(`users/${uid}/userData/businessLocation`).set({
         latitude: locationData.latitude,
         longitude: locationData.longitude,
         address: locationData.address,
      });
      return true;
   } catch (error) {
      console.log('Error saving location:', error);
      return false;
   }
};

export const saveLocationToStorage = async locationData => {
   try {
      await AsyncStorage.setItem('businessLocation', JSON.stringify(locationData));
      return true;
   } catch (error) {
      console.log('Error saving to AsyncStorage:', error);
      return false;
   }
};

export const getLocationFromStorage = async () => {
   try {
      const data = await AsyncStorage.getItem('businessLocation');
      return data ? JSON.parse(data) : null;
   } catch (error) {
      console.log('Error reading from AsyncStorage:', error);
      return null;
   }
};
