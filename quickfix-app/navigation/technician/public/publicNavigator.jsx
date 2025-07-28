/* eslint-disable import/no-cycle */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionDashboard, ActionLogin } from '../../../screens';

const Stack = createNativeStackNavigator();

export const ActionPublicNavigator = () => (
   <Stack.Navigator initialRouteName="ActionLogin">
      <Stack.Screen
         name="ActionLogin"
         component={ActionLogin}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name="ActionDashboard"
         component={ActionDashboard}
         options={{ headerShown: false }}
      />

   </Stack.Navigator>
);
