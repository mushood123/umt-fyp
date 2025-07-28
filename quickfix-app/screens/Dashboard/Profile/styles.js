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
      fontSize: 28,
      color: purple.darkest,
      marginBottom: 24,
      alignSelf: 'flex-start',
   },
   cardsContainer: {
      width: '100%',
      alignItems: 'center',
      gap: 16,
   },
   profileCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
   },
   profileField: {
      marginBottom: 16,
   },
   fieldLabel: {
      fontSize: 12,
      color: '#666',
      marginBottom: 4,
   },
   fieldValue: {
      fontSize: 16,
      color: '#222',
   },
   logoutButton: {
      width: '100%',
      backgroundColor: '#ff4444',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
   },
   logoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
   },
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
   },
   editButton: {
      backgroundColor: '#E6F2FF',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 5,
   },
   editButtonText: {
      color: '#0066CC',
      fontWeight: '600',
   },
   input: {
      marginBottom: 15,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   saveButton: {
      backgroundColor: '#0066CC',
      paddingVertical: 12,
      borderRadius: 8,
      flex: 1,
      marginRight: 8,
   },
   cancelButton: {
      backgroundColor: '#F5F5F5',
      paddingVertical: 12,
      borderRadius: 8,
      flex: 1,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: '#ddd',
   },
   buttonTextStyle: {
      color: '#FFFFFF',
      fontWeight: '600',
      textAlign: 'center',
   },
   cancelButtonText: {
      color: '#333333',
      fontWeight: '600',
      textAlign: 'center',
   },
   locationButton: {
      backgroundColor: '#20C997',
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 15,
      width: '100%',
   },
});
