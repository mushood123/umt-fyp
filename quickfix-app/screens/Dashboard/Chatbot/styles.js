/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { lightTheme, purple } from '../../../themes';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor
   },
   messagesContainer: {
      paddingHorizontal: 10,
      paddingVertical: 15
   },
   messageContainer: {
      maxWidth: '80%',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10
   },
   scrollContent: {
      flexGrow: 1,
      padding: 6,
   },
   userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007bff',
   },
   botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#e5e5ea'
   },
   messageText: {
      color: 'black',
      fontSize: 16
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#E5E5E5',
      backgroundColor: '#FFFFFF',
   },
   input: {
      flex: 1,
      marginRight: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      maxHeight: 100,
   },
   sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: purple.dark,
   },
   sendButtonText: {
      color: 'white',
      fontWeight: 'bold'
   }
});
