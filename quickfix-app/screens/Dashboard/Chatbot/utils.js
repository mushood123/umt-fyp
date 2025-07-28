// @ts-nocheck
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const sendMessage = async (inputMessage, setMessages, setInputMessage) => {
   if (inputMessage.trim() === '') return;

   const API_URL = process.env.EXPO_PUBLIC_API_URL;
   const BEARER_TOKEN = process.env.EXPO_PUBLIC_BEARER_TOKEN;

   if (!API_URL || !BEARER_TOKEN) {
      Alert.alert('Configuration Error', 'API URL or Token is missing.');
      return;
   }
   // Prepare user message for UI
   const userMessage = {
      message: inputMessage,
      id: 'user',
      timestamp: Date.now(),
   };
   setMessages(prevMessages => [...prevMessages, userMessage]);
   const user = auth().currentUser;
   try {
      // Prepare API request object
      const requestObject = {
         query: inputMessage,
         sessionId: user?.uid ?? 'guest',
      };
      // Send message to API
      const response = await axios.post(API_URL, requestObject, {
         headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
         },
         timeout: 10000,
      });

      // Log full response forEWaht debugging
      // console.log('API Full Response:', JSON.stringify(response.data, null, 2));

      // Extract bot response
      const botResponseText =
         response.data.response?.response || response.data.message || "Sorry, I couldn't process that.";

      // Add bot response to chat
      const botMessage = {
         message: botResponseText,
         id: 'bot',
         timestamp: Date.now(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      // Clear input
      setInputMessage('');
   } catch (error) {
      // Add error message to chat
      const errorMessage = {
         message: 'Error sending message. Please check your connection.',
         id: 'bot',
         timestamp: Date.now(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
   }
};
