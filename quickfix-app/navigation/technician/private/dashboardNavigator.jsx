/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigation } from './bottomTabNavigator';
import { DrawerContent } from '../../../components';
import { ContactUs, Profile } from '../../../screens';
import { ROUTES } from '../../../utils';

const Drawer = createDrawerNavigator();

export const ActionDashboardNavigator = () => (
   <Drawer.Navigator
      drawerContent={props => (
         <DrawerContent
            {...props}
         />
      )}
      screenOptions={{ headerShown: false }}
   >
      <Drawer.Screen
         name="Home"
         component={BottomTabNavigation}
      />
      <Drawer.Screen
         name={ROUTES.CONTACTUS}
         component={ContactUs}
      />
      <Drawer.Screen
         name={ROUTES.PROFILE}
         component={Profile}
      />
   </Drawer.Navigator >
);
