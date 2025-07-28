import React, { useCallback } from 'react';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { formInit, signInCallback } from './utils';
import { imgLogo } from '../../../assets';
import { Button, Input } from '../../../components';
import { CLAUSES, WORDS } from '../../../constants';
import { ROUTES } from '../../../utils';

export const CustomerLogin = () => {
   // @ts-ignore
   const form = useFormik(formInit);
   const { values, errors, handleChange } = form;
   // @ts-ignore
   const hasErrors = errors => Boolean(errors?.email || errors?.password);
   const onLoginPressed = useCallback(() => signInCallback(values), [values]);
   const navigation = useNavigation();
   return (
      <KeyboardAvoidingView style={styles.container}>
         <Image source={imgLogo} style={styles.logo} />
         <Text style={styles.signInMsg}>{CLAUSES.SIGN_IN}</Text>
         <Input
            title={CLAUSES.ENTER_YOUR_EMAIL}
            style={styles.input}
            // @ts-ignore
            isValid={errors?.email}
            handleOnChangeText={handleChange('email')}
         />
         <Input
            title={CLAUSES.ENTER_YOUR_PASSWORD_HERE}
            secureTextEntry={true}
            // @ts-ignore
            isValid={errors?.password}
            handleOnChangeText={handleChange('password')}
            style={styles.input}
         />

         <Button
            title={WORDS.SIGN_IN}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            disable={hasErrors(errors)}
            onPress={onLoginPressed}
         />

         <View style={styles.containerFooter}>
            <Text style={styles.contactText}>{CLAUSES.NOT_HAVE_AN_ACCOUNT}</Text>
            <Text
               onPress={() => {
                  // @ts-ignore
                  navigation.navigate(ROUTES.CUSTOMERSIGNUP);
               }}
               style={styles.textStyle}
            >
               {CLAUSES.CONTACT_US}
            </Text>
         </View>
      </KeyboardAvoidingView>
   );
};
