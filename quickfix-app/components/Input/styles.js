import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   emptyContainer: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 2,
      borderColor: 'red',
   },
   container: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 2,
      borderColor: 'black',
   },
   text: {
      fontSize: 15,
      color: 'white',
   },
   textInput: {
      fontSize: 15,
      color: '#294f8e',
      flex: 1,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   passwordToggle: {
      paddingHorizontal: 10,
      paddingVertical: 5,
   },
   passwordToggleText: {
      fontSize: 14,
      color: '#294f8e',
      fontWeight: '500',
   },
});
