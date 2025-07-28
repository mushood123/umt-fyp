import { Alert } from 'react-native';
import { firebase } from '../../../firebase';
import { signInSchema } from '../../../utils/schema';

export const formInit = {
   initialValues: {
      email: '',
      password: '',
   },
   validationSchema: signInSchema,
   validateOnMount: false,
};

export const signInCallback = async values => {
   try {
      await firebase.signInWithEmailAndPassword({
         email: values.email,
         password: values.password,
         successCallback: r => {
            console.log(r);
         },
         errorCallback: e => {
            throw e;
         },
      });
   } catch (e) {
      if (e.code === 'auth/wrong-password') {
         Alert.alert('Login Error', 'Incorrect password. Please try again.');
      } else if (e.code === 'auth/invalid-credential') {
         Alert.alert('Login Error', 'Incorrect password. Please try again.');
      } else if (e.code === 'auth/invalid-email') {
         Alert.alert('Login Error', 'Invalid email address.');
      } else if (e.code === 'auth/user-not-found') {
         Alert.alert('Login Error', 'No user found with this email.');
      } else {
         Alert.alert('Login Error', 'An unexpected error occurred. Please try again.');
      }
   }
};
