/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { styles } from './styles';
import { imgLogo } from '../../../../assets';
import { Button, Input } from '../../../../components';
import { CLAUSES, WORDS } from '../../../../constants';
import { formInit } from '../../../Auth/CustomerLogin/utils';

export const ActionLogin = () => {
   const form = useFormik(formInit);
   const { values, errors, handleChange } = form;
   const hasErrors = errors => Boolean(errors?.email || errors?.password);
   const navigation = useNavigation();

   return (
      <View
         style={styles.container}
      >
         <Image
            source={imgLogo}
            style={styles.logo}
         />
         <Text
            style={styles.signInMsg}
         >
            {CLAUSES.ACTION_TEAM_LOGIN}
         </Text>
         <Input
            title={CLAUSES.ENTER_YOUR_EMAIL}
            style={styles.input}
            isValid={errors?.email}
            handleOnChangeText={handleChange('email')}
         />
         <Input
            title={CLAUSES.ENTER_YOUR_PASSWORD_HERE}
            secureTextEntry={true}
            isValid={errors?.password}
            handleOnChangeText={handleChange('password')}
            style={styles.input}

         />

         <Button
            title={WORDS.SIGN_IN}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            disable={hasErrors(errors)}
            onPress={() => navigation.navigate('ActionDashboard')}

         />

      </View>
   );
};
