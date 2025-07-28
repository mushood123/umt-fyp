/* eslint-disable import/no-cycle */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatList } from '../../../screens';
import { ROUTES } from '../../../utils';

const Stack = createNativeStackNavigator();

export const MessageStack = () => (
   <Stack.Navigator>
      <Stack.Screen
         name={ROUTES.CHAT_LIST}
         component={ChatList}
         options={{ headerShown: true }}
      />
   </Stack.Navigator>
);
