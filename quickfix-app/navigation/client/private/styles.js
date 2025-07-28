import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});
