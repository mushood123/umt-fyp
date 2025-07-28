import { firebase } from '../../../firebase';
import { signUpSchema } from '../../../utils/schema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const formInit = {
   initialValues: {
      preferredUserID: '',
      contactNumber: '',
      contactName: '',
      businessName: '',
      businessAddress: '',
      email: '',
      password: '',
   },
   validationSchema: signUpSchema,
   validateOnMount: false,
};

export const signUpCallback = async values => {
   try {
      // Create user account
      const userCredential = await auth().createUserWithEmailAndPassword(values.email, values.password);
      const userId = userCredential.user.uid;
      // Save user data including location
      await firebase
         .database()
         .ref(`users/${userId}/userData`)
         .set({
            ...values,
            businessLocation: values.businessLocation || null,
            businessAddress: values.businessAddress || '',
            role: 2,
         });

      // Make package
      await firebase
         .database()
         .ref(`payments/${userId}`)
         .set({
            name: 'Pay As You Go',
            total: 20,
            remaining: 20,
            createdAt: new Date().toISOString(),
            validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString(),
         });

      await firebase
         .database()
         .ref(`messages/${userId}`)
         .child(`${userId}_Quick-Fix`)
         .push({ message: 'Welcome To the app', id: userId });

      // Clear saved location from AsyncStorage after successful signup
      await AsyncStorage.removeItem('businessLocation');

      return true;
   } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
         Alert.alert('Signup Error', 'This email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
         Alert.alert('Signup Error', 'Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
         Alert.alert('Signup Error', 'Password is too weak. Please use a stronger password.');
      } else {
         Alert.alert('Signup Error', 'An unexpected error occurred. Please try again.');
      }
      console.log('Signup error:', error);
      return false;
   }
};

export const hasErrors = errors =>
   Boolean(
      errors?.businessName ||
         errors?.businessAddress ||
         errors?.contactName ||
         errors?.contactNumber ||
         errors?.email ||
         errors?.preferredUserID ||
         errors?.password
   );
