/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, PackageDetails } from '../../../screens';
import { ROUTES } from '../../../utils';

const Stack = createNativeStackNavigator();

export const PackageStack = () => (
   <Stack.Navigator initialRouteName={ROUTES.HOME} >
      <Stack.Screen
         name={ROUTES.HOME}
         component={Home}
         options={{ headerShown: false }}
      />
      <Stack.Screen
         name={ROUTES.PACKAGE_DETAILS}
         component={PackageDetails}
         options={{ headerShown: true }}
      />

   </Stack.Navigator>
);
