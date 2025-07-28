/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable import/no-cycle */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SvgHistory, SvgPending } from '../../../assets';
import { History, Pending } from '../../../screens';
import { ROUTES } from '../../../utils';

const Tab = createMaterialTopTabNavigator();

export const TopBarNavigator = () => (
   <Tab.Navigator >
      <Tab.Screen
         name={ROUTES.PENDING}
         component={Pending}
         options={{
            tabBarIcon: ({ focused }) => (
               <SvgPending
                  size="30px"
               />
            )
         }}
      />
      <Tab.Screen
         name={ROUTES.HISTORY}
         component={History}
         options={{
            tabBarIcon: ({ focused }) => (
               <SvgHistory
                  size="30px"
               />
            )
         }}
      />
   </Tab.Navigator>
);
