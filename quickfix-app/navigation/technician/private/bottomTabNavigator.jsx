/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
// @ts-nocheck
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgHistory, SvgHome, SvgMessages, SvgProfile } from '../../../assets';
import { ActionHistory, ActionHome, ActionNotification, ActionTeamProfile } from '../../../screens';
import { ROUTES } from '../../../utils';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => (
   <Tab.Navigator
      initialRouteName="Home"
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
         name={ROUTES.HOME}
         component={ActionHome}
         options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <SvgHome size="30px" />,
         }}
      />
      <Tab.Screen
         name={ROUTES.HISTORY}
         component={ActionHistory}
         options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <SvgHistory size="30px" />,
         }}
      />
      <Tab.Screen
         name={ROUTES.NOTIFICATIONS}
         component={ActionNotification}
         options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <SvgMessages size="30px" />,
         }}
      />
      <Tab.Screen
         name={ROUTES.PROFILE}
         component={ActionTeamProfile}
         options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <SvgProfile size="30px" />,
         }}
      />
   </Tab.Navigator>
);
