import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { firebase } from '../firebase';
import { styles } from './styles';
import { loader } from '../assets';
import { CLAUSES } from '../constants';
import { DashboardNavigator, PublicNavigator } from './client';
import { ActionDashboardNavigator } from './technician';

export const Navigation = ({ user }) => {
   const [userDetails, setUserDetails] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (user === null) {
         setUserDetails(null);
         setIsLoading(false);
      } else {
         setIsLoading(true);
         firebase.getUserDataById(user.uid, {
            successCB: data => {
               console.log('User data fetched:', data);
               setUserDetails(data);
               setIsLoading(false);
            },
            errorCB: error => {
               console.error('Error fetching user data:', error);
               setUserDetails(null);
               setIsLoading(false);
            },
         });
      }
   }, [user]);

   if (user === null) {
      return <PublicNavigator />;
   }

   if (isLoading) {
      return (
         <View style={styles.loaderContainer}>
            <LottieView source={loader} autoPlay loop style={styles.lottie} />
         </View>
      );
   }

   if (!userDetails) {
      return <Text>{CLAUSES.ERROR_FETCHING_USER_DETAILS}</Text>;
   }

   return userDetails?.role === 1 ? <ActionDashboardNavigator /> : <DashboardNavigator />;
};
