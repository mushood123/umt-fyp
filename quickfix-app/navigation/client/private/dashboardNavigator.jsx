/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-cycle */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigation } from './bottomTabNavigator';
import { DrawerContent } from '../../../components';
import { ChatBot, ContactUs, Messages } from '../../../screens';
import { ROUTES } from '../../../utils';
import { ProfileStack } from '../../../screens/Dashboard/Profile';

const Drawer = createDrawerNavigator();

export const DashboardNavigator = () => (
   <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
         headerShown: false,
         drawerStyle: { width: 300 },
      }}
   >
      <Drawer.Screen name={ROUTES.HOME} component={BottomTabNavigation} />
      <Drawer.Screen name={ROUTES.CONTACTUS} component={ContactUs} />
      <Drawer.Screen name={ROUTES.PROFILE} component={ProfileStack} />

      <Drawer.Screen name={ROUTES.CHAT} component={Messages} options={{ headerShown: true }} />
      <Drawer.Screen name={ROUTES.CHATBOT} component={ChatBot} options={{ headerShown: true }} />
   </Drawer.Navigator>
);
