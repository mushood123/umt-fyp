import { StyleSheet, Dimensions } from 'react-native';
import { lightTheme } from '../../../../themes';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor,
      paddingHorizontal: 20,
   },
   scrollContainer: {
      paddingBottom: 30,
      paddingTop: 10,
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
   sectionHeader: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 8,
      backgroundColor: lightTheme.backgroundColor,
   },
   sectionHeaderText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#202020',
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: height * 0.5,
   },
   emptyText: {
      fontSize: 16,
      color: '#757575',
      textAlign: 'center',
   },
});
