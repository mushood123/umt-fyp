// @ts-nocheck
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const ContactCard = ({
   name,
   message,
   style,
   onPress = () => { },
}) => {
   const firstChar = name ? name.charAt(0).toUpperCase() : '?';

   return (
      <TouchableOpacity
         style={[styles.card, style]}
         onPress={onPress}
      >
         <View style={styles.leftSection}>
            <View style={styles.circle}>
               <Text style={styles.initial}>{firstChar}</Text>
            </View>
         </View>
         <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{message || 'Contact'}</Text>
         </View>
      </TouchableOpacity>
   );
};
