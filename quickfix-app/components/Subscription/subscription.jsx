/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { CLAUSES } from '../../constants';

export const Subscription = ({
   title = CLAUSES.PAY_AS_YOU_GO,
}) => (
   <LinearGradient
      colors={['#8E6D05', '#D4AF37', '#FFD700']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.background}
   >
      <View style={styles.contentContainer}>
         <Text style={styles.labelText}>
            {CLAUSES.OPTED_PACKAGE}
         </Text>
         <Text style={styles.titleText}>
            {title}
         </Text>

         <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Premium</Text>
         </View>
      </View>
   </LinearGradient>
);
