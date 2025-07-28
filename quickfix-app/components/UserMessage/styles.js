/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginVertical: 6,
      paddingHorizontal: 10,
      maxWidth: '100%',
   },
   ownMessageContainer: {
      justifyContent: 'flex-end',
   },
   messageBubble: {
      backgroundColor: '#FFF5E6',
      borderRadius: 18,
      borderTopLeftRadius: 4,
      paddingHorizontal: 16,
      paddingVertical: 10,
      maxWidth: '80%',
   },
   ownMessageBubble: {
      backgroundColor: '#2196F3',
      borderTopLeftRadius: 18,
      borderTopRightRadius: 4,
      alignSelf: 'flex-end',
   },
   messageText: {
      fontSize: 16,
      color: '#212121',
   },
   ownMessageText: {
      color: '#FFFFFF',
   },
});
