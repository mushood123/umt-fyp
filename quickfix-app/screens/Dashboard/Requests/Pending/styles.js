/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { lightTheme } from '../../../../themes';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor,
      paddingHorizontal: 16,
      paddingTop: 20,
   },
   scrollContainer: {
      paddingBottom: 20,
   },
   loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: lightTheme.backgroundColor,
   },
   lottie: {
      width: 150,
      height: 150,
   },
});
