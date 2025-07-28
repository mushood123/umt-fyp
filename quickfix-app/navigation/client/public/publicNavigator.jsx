/* eslint-disable import/no-cycle */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerLogin, CustomerSignup, OnBoarding, ContactUs, Dashboard, ActionTeam } from '../../../screens';
import { ROUTES } from '../../../utils';
import { BusinessAddress } from '../../../screens/Auth';

const Stack = createNativeStackNavigator();

export const PublicNavigator = () => (
   <Stack.Navigator initialRouteName={ROUTES.ONBOARDING}>
      <Stack.Screen
         name={ROUTES.ONBOARDING}
         component={OnBoarding}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.CUSTOMERLOGIN}
         component={CustomerLogin}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.CUSTOMERSIGNUP}
         component={CustomerSignup}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.CONTACTUS}
         component={ContactUs}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.DASHBOARD}
         component={Dashboard}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.ACTION_TEAM}
         component={ActionTeam}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.BUSINESS_ADDRESS}
         component={BusinessAddress}
         options={{ headerShown: false }}
      />

   </Stack.Navigator>
);
