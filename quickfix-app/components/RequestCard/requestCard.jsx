import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { StatusBadge } from './utils';

export const RequestCard = ({
   Icon = () => <View style={styles.defaultIcon} />,
   title = 'Default Title',
   problemDescription = 'Default Description',
   status = 'pending',
   businessName = '',
   contactNumber = '',
   timeSlot = '',
   date = '',
   onPress = () => {},
}) => (
   <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconCircle}>
         <Icon size={24} color="#FFFFFF" />
      </View>

      <View style={styles.contentContainer}>
         <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
               {title}
            </Text>

            <Text style={styles.businessText} numberOfLines={1}>
               {businessName} • {contactNumber}
            </Text>

            <Text style={styles.descriptionText} numberOfLines={2}>
               {problemDescription || 'No description provided'}
            </Text>

            <View style={styles.timeContainer}>
               <Text style={styles.timeText}>
                  {date} • {timeSlot}
               </Text>
            </View>
         </View>

         <StatusBadge status={status} />
      </View>
   </TouchableOpacity>
);
