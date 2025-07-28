import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { imgOnBoarding } from '../../assets';
import { Button } from '../../components';
import { CLAUSES, WORDS } from '../../constants';
import { ROUTES } from '../../utils/routes';

export const OnBoarding = () => {
   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <Image source={imgOnBoarding} style={styles.image} />
         <Text style={styles.welcomeText}>{CLAUSES.WELCOME_MESSAGE}</Text>
         <Text style={styles.descriptionText}>{CLAUSES.DESCRIPTION}</Text>
         <Button
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            title={CLAUSES.LOGIN}
            onPress={() => {
               navigation.navigate(ROUTES.CUSTOMERLOGIN);
            }}
         />
         <Text style={styles.choiceText}>{WORDS.OR}</Text>
         <Button
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            title={CLAUSES.SIGNUP}
            onPress={() => {
               navigation.navigate(ROUTES.CUSTOMERSIGNUP);
            }}
         />
         <View style={styles.containerFooter}>
            <Text style={styles.contactText}>{CLAUSES.HAVE_ANY_QUESTIONS}</Text>
            <Text
               onPress={() => {
                  navigation.navigate(ROUTES.CONTACTUS);
               }}
               style={styles.textStyle}
            >
               {CLAUSES.CONTACT_US}
            </Text>
         </View>
      </View>
   );
};
