import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import { database } from '../../../firebase/database';
import { SvgMessages } from '../../../assets';
import { Card } from '../../../components';

export const Notifications = () => {
   const [notifications, setNotifications] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Set up real-time listener
      const currentUser = auth().currentUser;
      if (currentUser) {
         const db = database();
         const userRef = db.ref(`users/${currentUser.uid}/notifications`);

         const unsubscribe = userRef.on('value', snapshot => {
            const dbNot = snapshot.val();
            const notificationsArray = dbNot ? Object.keys(dbNot).map(key => ({ ...dbNot[key], id: key })) : [];

            // Update isSeened to true for notifications where isSeened is false
            notificationsArray.forEach(notification => {
               if (notification.isSeened === false) {
                  userRef.child(notification.id).update({ isSeened: true });
               }
            });

            setNotifications(notificationsArray);
            setLoading(false);
         });

         // Cleanup subscription
         return () => userRef.off('value', unsubscribe);
      }
   }, []);

   const hasNotifications = notifications && notifications.length > 0;

   if (loading) {
      return (
         <View style={styles.centeredContainer}>
            <Text>Loading...</Text>
         </View>
      );
   }

   return (
      <ScrollView
         style={[
            styles.container,
            !hasNotifications && styles.centeredContainer, // center bell if no notifications
         ]}
      >
         <View>
            {!hasNotifications && (
               <View style={styles.noNotificationsWrapper}>
                  <SvgMessages size="200px" />
                  <Text style={styles.noNotificationsText}>No Notifications</Text>
               </View>
            )}

            {hasNotifications &&
               notifications?.map(notif => (
                  <Card
                     key={notif.id}
                     icon={SvgMessages}
                     title={notif.from ?? 'Admin'}
                     description={notif.message ?? ''}
                     time={new Date(notif.sendedAt).toLocaleString()}
                     onPress={() => {}}
                     showArrow={false}
                  />
               ))}
         </View>
      </ScrollView>
   );
};
