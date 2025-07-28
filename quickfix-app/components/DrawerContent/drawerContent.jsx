import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { WORDS } from '../../constants';
import { firebase } from '../../firebase';
import { ROUTES } from '../../utils/routes';
import { Button } from '../Button';

export const DrawerContent = props => {
   const [user, setUser] = useState(null);
   const { navigation } = props;
   const handleNavigate = screenName => {
      if (screenName === "Home") {
         navigation.navigate(screenName, { screen: ROUTES.DASHBOARD_HOME });
      } else {
         navigation.navigate(screenName);
      }
   };

   const handleLogout = () => {
      firebase.signOut(() => console.log('sign-out'))
   };
   useEffect(() => {
      setUser(firebase.getCurrentFirebaseUser())
   }, [setUser, user])

   return (
      <View style={styles.container}>
         <LinearGradient
            colors={['#3A7BD5', '#00D2FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profilePicContainer}
         >
            <View style={styles.profilePicWrapper}>
               <Image style={styles.profilePic} />
            </View>
            <Text style={styles.userName}>{user?.displayName}</Text>
         </LinearGradient>

         <View style={styles.contentContainer}>
            <View style={styles.menuContainer}>
               <Button
                  title="Home"
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.textStyle}
                  onPress={() => {
                     handleNavigate('Home');
                  }}
               />
               <Button
                  title="Profile"
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.textStyle}
                  onPress={() => {
                     handleNavigate('Profile');
                  }}
               />
               <Button
                  title="Contact Us"
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.textStyle}
                  onPress={() => {
                     handleNavigate('ContactUs');
                  }}
               />
            </View>

            <TouchableOpacity
               onPress={handleLogout}
               style={styles.logoutButton}
               activeOpacity={0.8}
            >
               <LinearGradient
                  colors={['#FF5F6D', '#FFC371']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.logoutGradient}
               >
                  <Text style={styles.logoutText}>{WORDS.LOGOUT}</Text>
               </LinearGradient>
            </TouchableOpacity>
         </View>
      </View>
   );
};
