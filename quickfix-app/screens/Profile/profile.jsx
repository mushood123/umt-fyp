// @ts-nocheck
import React, { useEffect } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { useFormik } from 'formik';
import { styles } from './styles';
import { formInit, hasErrors } from './utils';
import { imgLogo } from '../../assets';
import { Input, Button } from '../../components';
import { CLAUSES, WORDS } from '../../constants';
import { firebase } from '../../firebase';

export const Profile = () => {
   const user = firebase.getCurrentFirebaseUser();

   const form = useFormik(formInit({}));
   const { values, errors, handleChange, setValues } = form;

   useEffect(() => {
      firebase.getUserDataById(user?.uid, {
         successCB: d => setValues(d)
      });
   }, [user?.uid, setValues]);

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={10}
         style={styles.container}
      >
         <ScrollView
            contentContainerStyle={styles.scrollContainer}
         >
            <Image
               source={imgLogo}
               style={styles.logo}
            />
            <Text
               style={styles.profile}
            >
               {WORDS.PROFILE}
            </Text>
            <Input
               title={CLAUSES.BUSINESS_NAME}
               value={values.businessName}
               isValid={errors.businessName}
               disable
               style={styles.input}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_BUSINESS_ADDRESS}
               value={values.businessAddress}
               isValid={errors.businessAddress}
               handleOnChangeText={handleChange('businessAddress')}
               style={styles.input}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_CONTACT_NAME}
               value={values.contactName}
               isValid={errors.contactName}
               handleOnChangeText={handleChange('contactName')}
               style={styles.input}
            />
            <Input
               title={CLAUSES.ENTER_YOUR_CONTACT_NUMBER}
               value={values.contactNumber}
               isValid={errors.contactNumber}
               handleOnChangeText={handleChange('contactNumber')}
               keyboardType="numeric"
               style={styles.input}
            />
            <Input
               title={WORDS.EMAIL}
               value={values.email}
               isValid={errors.email}
               handleOnChangeText={handleChange('email')}
               disable
               style={styles.input}
            />
            <Button
               title={WORDS.SUBMIT}
               disable={hasErrors(errors)}
               onPress={() => console.log('VALUES', values)}
               buttonStyle={styles.buttonStyle}
               textStyle={styles.textStyle}
            />
         </ScrollView>
      </KeyboardAvoidingView>
   );
};
