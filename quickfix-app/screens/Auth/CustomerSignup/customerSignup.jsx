// @ts-nocheck

import React, { useState, useCallback } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { useFormik } from 'formik';
import { styles } from './styles';
import { formInit, signUpCallback } from './utils';
import { imgLogo } from '../../../assets';
import { Button, Input } from '../../../components';
import { CLAUSES, WORDS } from '../../../constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ROUTES } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomerSignup = () => {
   const [selectedLocation, setSelectedLocation] = useState(null);
   const form = useFormik({
      ...formInit,
   });
   const { values, errors, handleChange } = form;

   useFocusEffect(
      useCallback(() => {
         loadSavedLocation();
      }, [])
   );

   const loadSavedLocation = async () => {
      try {
         const locationData = await AsyncStorage.getItem('businessLocation');
         if (locationData) {
            const parsedLocation = JSON.parse(locationData);
            setSelectedLocation(parsedLocation);
            // Update form's business address
            form.setFieldValue('businessAddress', parsedLocation.address);
         }
      } catch (error) {
         console.log('Error loading location:', error);
      }
   };

   const signupPressed = useCallback(() => {
      // Check for missing or invalid inputs
      const requiredFields = [
         { key: 'businessName', label: CLAUSES.ENTER_YOUR_BUSINESS_NAME },
         { key: 'businessAddress', label: CLAUSES.ENTER_YOUR_BUSINESS_ADDRESS },
         { key: 'contactName', label: CLAUSES.ENTER_YOUR_CONTACT_NAME },
         { key: 'contactNumber', label: CLAUSES.ENTER_YOUR_CONTACT_NUMBER },
         { key: 'email', label: CLAUSES.ENTER_YOUR_EMAIL },
         { key: 'preferredUserID', label: CLAUSES.ENTER_YOUR_PREFERRED_USER_ID },
         { key: 'password', label: CLAUSES.ENTER_YOUR_PASSWORD_HERE },
      ];

      for (const field of requiredFields) {
         if (!values[field.key] || values[field.key].trim() === '') {
            Alert.alert('Missing Input', `Please fill in ${field.label}`);
            return;
         }
         if (errors[field.key]) {
            Alert.alert('Invalid Input', `Please correct the ${field.label}`);
            return;
         }
      }

      // If all fields are valid, proceed with signup
      signUpCallback({
         ...values,
         businessCordinates: selectedLocation?.coordinates || null,
         businessAddress: selectedLocation?.address || values.businessAddress,
      });
   }, [values, errors, selectedLocation]);

   const navigation = useNavigation();
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={50}
         style={styles.container}
      >
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={imgLogo} style={styles.logo} />
            <Text style={styles.signUpMsg}>{CLAUSES.SIGNUP}</Text>
            <Input
               title={CLAUSES.ENTER_YOUR_BUSINESS_NAME}
               style={styles.input}
               isValid={errors?.businessName}
               handleOnChangeText={handleChange('businessName')}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_BUSINESS_ADDRESS}
               style={styles.input}
               isValid={errors?.businessAddress}
               value={selectedLocation?.address || values.businessAddress}
               editable={!selectedLocation} // Disable manual editing if location is selected
               handleOnChangeText={handleChange('businessAddress')}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_CONTACT_NAME}
               style={styles.input}
               isValid={errors?.contactName}
               handleOnChangeText={handleChange('contactName')}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_CONTACT_NUMBER}
               keyboardType="number-pad"
               isValid={errors?.contactNumber}
               handleOnChangeText={handleChange('contactNumber')}
               style={styles.input}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_EMAIL}
               isValid={errors?.email}
               style={styles.input}
               handleOnChangeText={handleChange('email')}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_PREFERRED_USER_ID}
               isValid={errors?.preferredUserID}
               style={styles.input}
               handleOnChangeText={handleChange('preferredUserID')}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_PASSWORD_HERE}
               style={styles.input}
               secureTextEntry={true}
               isValid={errors?.password}
               handleOnChangeText={handleChange('password')}
            />
            <Button
               title={selectedLocation ? 'Change Business Location' : CLAUSES.ADD_YOUR_ADDRESS}
               buttonStyle={styles.buttonStyle}
               textStyle={styles.textStyle}
               onPress={() => {
                  // @ts-ignore
                  navigation.navigate(ROUTES.BUSINESS_ADDRESS);
               }}
            />

            <Button
               onPress={signupPressed}
               title={WORDS.SIGN_UP}
               buttonStyle={styles.buttonStyle}
               textStyle={styles.textStyle}
               // disable={hasErrors(errors)}
            />
         </ScrollView>
      </KeyboardAvoidingView>
   );
};
