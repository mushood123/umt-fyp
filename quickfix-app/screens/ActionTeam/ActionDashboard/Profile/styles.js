// styles.js
import { StyleSheet, Platform } from 'react-native';
import { purple } from '../../../../themes';

export const styles = StyleSheet.create({
   scrollView: {
      flex: 1,
   },
   statusButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 24,
      marginVertical: 16,
   },
   statusButtonFirstPart: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   statusActive: {
      backgroundColor: '#d4f8e8',
   },
   statusOffline: {
      backgroundColor: '#ffd6d6',
   },
   statusDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginRight: 10,
   },
   dotActive: {
      backgroundColor: '#1ec773',
   },
   dotOffline: {
      backgroundColor: '#e74c3c',
   },
   statusButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
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
});
