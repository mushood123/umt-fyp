/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   background: {
      width: '100%',
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
   },
   contentContainer: {
      padding: 20,
      position: 'relative',
   },
   labelText: {
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: 14,
      marginBottom: 6,
   },
   titleText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
   },
   badgeContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
   },
   badgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
   },
});
