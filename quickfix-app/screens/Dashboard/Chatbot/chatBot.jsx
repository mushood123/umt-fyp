import React, { useState, useRef, useEffect } from 'react';
import {
   KeyboardAvoidingView,
   View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { sendMessage } from './utils';
import { Button, Input, UserMessage } from '../../../components';

export const ChatBot = () => {
   const [messages, setMessages] = useState([]);
   const [inputMessage, setInputMessage] = useState('Hi');
   const scrollViewRef = useRef(null);

   useEffect(() => {
      sendMessage(inputMessage, setMessages, setInputMessage);
      setInputMessage('');
   }, []);

   return (
      <KeyboardAvoidingView
         style={styles.container}

      >
         <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            bounces
         >
            <View style={styles.messagesContainer}>
               {messages.map((message, index) => (
                  <UserMessage
                     message={message.message}
                     isOwnMessage={message.id === 'user'}
                     key={index}
                  />
               ))}
            </View>
         </ScrollView>

         <View style={styles.inputContainer}>
            <Input
               style={styles.input}
               value={inputMessage}
               handleOnChangeText={setInputMessage}
               title="Type a message..."
            />
            <Button
               title="OK"
               buttonStyle={styles.sendButton}
               textStyle={styles.sendButtonText}
               onPress={() => sendMessage(inputMessage, setMessages, setInputMessage)}
               disable={inputMessage.length <= 0}
            />
         </View>
      </KeyboardAvoidingView>
   );
};
