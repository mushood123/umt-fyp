// Card.jsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import DescriptionTruncate from '../DescriptionTruncate';

export const Card = ({
   title = 'Card Title',
   description,
   icon: Icon,
   onPress = () => {},
   showArrow = true,
   time = null,
}) => (
   <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
         <View style={styles.iconContainer}>{Icon && <Icon width={24} height={24} />}</View>
         <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {description && <DescriptionTruncate description={description} />}
            {time && <Text style={styles.description}>{time}</Text>}
         </View>
         {showArrow && (
            <View style={styles.arrowContainer}>
               <ArrowIcon />
            </View>
         )}
      </View>
   </TouchableOpacity>
);

const ArrowIcon = () => (
   <View style={styles.arrowIconContainer}>
      <View style={styles.arrowLine} />
      <View style={styles.arrowPoint} />
   </View>
);
