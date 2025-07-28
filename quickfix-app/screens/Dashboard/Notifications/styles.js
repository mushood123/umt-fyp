import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      position: 'relative',
      padding: 8,
   },
   centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
   },
   noNotificationsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   noNotificationsText: {
      marginTop: 16,
      fontSize: 18,
      color: '#888',
   },
});
