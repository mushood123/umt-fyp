// styles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { lightTheme } from '../../../themes';
import { purple } from '../../../themes/purple';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
   scrollView: {
      flex: 1,
   },
   gradientBackground: {
      flex: 1,
      minHeight: '100%',
   },
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
   },
   header: {
      width: '100%',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 60 : 45,
      paddingBottom: 20,
      backgroundColor: purple.lightest,
   },
   logo: {
      width: 200,
      height: 40,
      resizeMode: 'contain',
   },
   contentContainer: {
      width: '100%',
      paddingHorizontal: 16,
      marginBottom: 30,
   },
   title: {
      fontWeight: '700',
      fontSize: 24,
      color: purple.darkest,
      marginBottom: 24,
      paddingLeft: 4,
   },
   cardsContainer: {
      width: '100%',
      alignItems: 'center',
      gap: 16,
   },
});
