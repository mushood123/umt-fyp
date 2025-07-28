/* eslint-disable react-native/no-color-literals */
// Card styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { purple } from '../../themes';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
   container: {
      width: width - 32,
      backgroundColor: '#fff',
      borderRadius: 16,
      shadowColor: purple.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
      marginBottom: 4,
      borderWidth: 1,
      borderColor: 'rgba(211, 195, 233, 0.3)',
   },
   contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
   },
   iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
   },
   textContainer: {
      flex: 1,
   },
   title: {
      fontSize: 16,
      fontWeight: '600',
      color: purple.darkest,
      marginBottom: 4,
   },
   description: {
      fontSize: 14,
      color: purple.darker,
      opacity: 0.7,
   },
   arrowContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   arrowIconContainer: {
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
   },
   arrowLine: {
      width: 8,
      height: 1.5,
      backgroundColor: purple.light,
      position: 'absolute',
      right: 0,
      transform: [{ rotate: '45deg' }, { translateY: -2.5 }],
   },
   arrowPoint: {
      width: 8,
      height: 1.5,
      backgroundColor: purple.light,
      position: 'absolute',
      right: 0,
      transform: [{ rotate: '-45deg' }, { translateY: 2.5 }],
   },
});
