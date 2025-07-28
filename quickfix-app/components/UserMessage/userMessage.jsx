// @ts-nocheck
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const UserMessage = ({
   message,
   isOwnMessage = false
}) => (
   <View style={[
      styles.container,
      isOwnMessage ? styles.ownMessageContainer : {}
   ]}
   >
      <View style={[
         styles.messageBubble,
         isOwnMessage ? styles.ownMessageBubble : {}
      ]}
      >
         <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : {}
         ]}
         >
            {message}
         </Text>
      </View>
   </View>
);
