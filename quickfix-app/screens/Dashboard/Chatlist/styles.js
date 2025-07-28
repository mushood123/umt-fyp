/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Dimensions } from 'react-native';
import { lightTheme } from '../../../themes';

// const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor,
      width: '100%',
   },
   scrollView: {
      width: '100%',
   },
   scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 12,
   },
   contactCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      width: '100%',
   },
   contactName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 6,
   },
   messagePreview: {
      fontSize: 14,
      color: '#757575',
      marginTop: 4,
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
