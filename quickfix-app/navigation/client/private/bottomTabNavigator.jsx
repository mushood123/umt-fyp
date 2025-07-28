/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageStack } from './messageNavigator';
import { PackageStack } from './packageDetailsNavigator';
import { SvgHome, SvgMessages, SvgNotifications, SvgPackage, SvgRequests, SvgProfile } from '../../../assets';
import { Notifications, Package, Requests } from '../../../screens';
import { ROUTES } from '../../../utils';
import auth from '@react-native-firebase/auth';
import { database } from '../../../firebase/database';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { ProfileStack } from '../../../screens/Dashboard/Profile';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
   const [notifications, setNotifications] = useState([]);

   useEffect(() => {
      const currentUser = auth().currentUser;
      if (currentUser) {
         const db = database();
         const userRef = db.ref(`users/${currentUser.uid}/notifications`);

         const handleNotifications = snapshot => {
            const notificationData = snapshot.val();
            const notificationsArray = notificationData
               ? Object.keys(notificationData)
                    .map(key => ({ ...notificationData[key], id: key }))
                    .filter(no => !no.isSeened)
               : [];

            setNotifications(notificationsArray);
         };

         // Set up real-time listener
         userRef.on('value', handleNotifications, error => {});

         // Cleanup subscription listener
         return () => userRef.off('value', handleNotifications);
      }
   }, []);

   return (
      <Tab.Navigator
         screenOptions={{
            tabBarShowLabel: true,
            tabBarLabelStyle: {
               fontSize: 12,
               fontWeight: '500',
               marginBottom: 4,
            },
            tabBarStyle: {
               // position: 'absolute',
               // bottom: 12,
               borderRadius: 24,
               height: 64,
               backgroundColor: '#fff',
               shadowColor: '#000',
               shadowOffset: { width: 0, height: 4 },
               shadowOpacity: 0.12,
               shadowRadius: 8,
               elevation: 8,
               borderTopWidth: 0,
               paddingHorizontal: 12,
            },
         }}
      >
         <Tab.Screen
            name={ROUTES.DASHBOARD_HOME}
            component={PackageStack}
            options={{
               title: ROUTES.HOME,
               headerShown: false,
               tabBarIcon: ({ focused }) => <SvgHome size="30px" />,
               tabBarLabel: 'Home',
            }}
         />
         <Tab.Screen
            name={ROUTES.REQUESTS}
            component={Requests}
            options={{
               headerShown: false,
               tabBarIcon: ({ focused }) => <SvgRequests size="30px" />,
               tabBarLabel: 'Requests',
            }}
         />
         <Tab.Screen
            name={ROUTES.PACKAGE}
            component={Package}
            options={{
               headerShown: false,
               tabBarIcon: ({ focused }) => <SvgPackage size="30px" />,
               tabBarLabel: 'Packages',
            }}
         />
         <Tab.Screen
            name={ROUTES.MESSAGES}
            component={MessageStack}
            options={{
               headerShown: false,
               tabBarIcon: ({ focused }) => <SvgMessages size="30px" />,
               tabBarLabel: 'Messages',
            }}
         />
         <Tab.Screen
            name={ROUTES.NOTIFICATIONS}
            component={Notifications}
            options={{
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View>
                     <SvgNotifications size="30px" />
                     {notifications?.length > 0 && (
                        <View style={styles.badge}>
                           <Text style={styles.badgeText}>{notifications.length}</Text>
                        </View>
                     )}
                  </View>
               ),
               tabBarLabel: 'Notifications',
            }}
         />
         <Tab.Screen
            name={ROUTES.PROFILE}
            component={ProfileStack}
            options={{
               headerShown: false,
               tabBarIcon: ({ focused }) => <SvgProfile size="30px" />,
               tabBarLabel: 'Profile',
            }}
         />
      </Tab.Navigator>
   );
};
