/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Button, Input, UserMessage } from '../../../components';
import { firebase } from '../../../firebase';

export const Messages = ({ route }) => {
   const { senderKey: receiverKey } = route?.params;
   const [chatMessages, setChatMessages] = useState([]);
   const [sentMessage, setSentMessage] = useState([]);
   const user = firebase.getCurrentFirebaseUser();
   const scrollViewRef = useRef(null);

   const senderName = user?.displayName;

   useEffect(() => {
      const onValueChange = firebase.getChatMessages(user?.uid, receiverKey, {
         successCB: _messages => {
            setChatMessages(Object.values(_messages ?? []).reverse());
         },
      });
      return () => firebase.getChatMessagesCloseConnection(user?.uid, receiverKey, onValueChange);
   }, []);

   const handleSendMessage = useCallback(() => {
      if (sentMessage && sentMessage.trim()) {
         firebase.sendMessage(user?.uid, receiverKey, senderName, {
            message: sentMessage,
            id: user?.uid,
         });
         setSentMessage(''); // Clear input after sending
      }
   }, [user?.uid, receiverKey, senderName, sentMessage]);

   return (
      <KeyboardAvoidingView style={styles.container}>
         <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            bounces
         >
            <View style={styles.messagesContainer}>
               {Object.values(chatMessages).map(({ message, id }, index) => (
                  <UserMessage message={message} isOwnMessage={id === user?.uid} key={index} />
               ))}
            </View>
         </ScrollView>

         <View style={styles.inputContainer}>
            <Input style={styles.input} value={sentMessage} handleOnChangeText={setSentMessage} />
            <Button
               title="OK"
               textStyle={styles.sendButtonText}
               buttonStyle={styles.sendButton}
               onPress={handleSendMessage}
               disable={sentMessage.length <= 0}
            />
         </View>
      </KeyboardAvoidingView>
   );
};
