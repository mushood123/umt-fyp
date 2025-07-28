import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const StatusBadge = ({ status = 'pending' }) => {
   const getStatusStyle = () => {
      switch (status.toLowerCase()) {
         case 'completed':
            return {
               backgroundColor: 'rgba(76, 175, 80, 0.1)',
               color: '#2E7D32',
            };
         case 'assigned':
            return {
               backgroundColor: 'rgba(33, 150, 243, 0.1)',
               color: '#1976D2',
            };
         case 'pending':
         default:
            return {
               backgroundColor: 'rgba(158, 158, 158, 0.1)',
               color: '#757575',
            };
      }
   };

   const statusStyles = getStatusStyle();

   return (
      <View style={[styles.statusBadge, { backgroundColor: statusStyles.backgroundColor }]}>
         <Text style={[styles.statusText, { color: statusStyles.color }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
         </Text>
      </View>
   );
};
