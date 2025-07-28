/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { lightTheme } from '../../../themes';

export const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      paddingBottom: 100,
      backgroundColor: lightTheme.backgroundColor,
   },
   subscriptionWrapper: {
      width: '90%',
      marginTop: 20,
      height: 120,
   },
   statusCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
   },
   statusLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
   },
   statusValue: {
      fontSize: 14,
      fontWeight: '600',
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 16,
      overflow: 'hidden',
   },
   statusActive: {
      color: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
   },
   statusExpired: {
      color: '#F44336',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
   },
   lottie: {
      width: 150,
      height: 150,
   },
   loadingText: {
      color: '#666',
      fontSize: 16,
   },
   cardContainer: {
      width: '90%',
      marginTop: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
   },
   usageContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
   },
   usageTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      color: '#333',
   },
   progressBarContainer: {
      height: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 4,
      overflow: 'hidden',
   },
   progressBar: {
      height: '100%',
      backgroundColor: '#D4AF37',
   },
   usageDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
   },
   usageText: {
      fontSize: 12,
      color: '#666',
   },
   dataContainer: {
      backgroundColor: '#ffffff',
      width: '100%',
   },
   row: {
      borderBottomColor: '#f0f0f0',
      borderBottomWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
   },
   lastRow: {
      borderBottomWidth: 0,
   },
   cellLabel: {
      color: '#333',
      fontSize: 14,
   },
   cellValue: {
      fontWeight: '600',
      color: '#444',
      fontSize: 14,
   },
   termsContainer: {
      width: '90%',
      marginTop: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   termsTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      color: '#333',
   },
   conditions: {
      marginVertical: 4,
      fontSize: 14,
      color: '#555',
      lineHeight: 20,
   },
});
