/* eslint-disable import/no-cycle */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from './profile';
import { BusinessAddress } from './BusinessLoc';
import { ROUTES } from '../../../utils';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
   <Stack.Navigator initialRouteName={ROUTES.PROFILE}>
      <Stack.Screen name={'Profile'} component={Profile} options={{ headerShown: false }} />

      <Stack.Screen name={ROUTES.BUSINESS_ADDRESS} component={BusinessAddress} options={{ headerShown: false }} />
   </Stack.Navigator>
);
