// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { loader } from '../../../assets';
import { ContactCard } from '../../../components';
import { firebase } from '../../../firebase';
import { ROUTES } from '../../../utils/routes';

export const ChatList = () => {
   const [messages, setMessages] = useState([]);
   const [isLoading, setLoading] = useState(true);
   const navigation = useNavigation();
   useEffect(() => {
      setLoading(true);
      const user = firebase.getCurrentFirebaseUser();
      const onValueChange = firebase.getMessagesList(user?.uid, {
         successCB: _messages => {
            setMessages(_messages ?? []);
            setLoading(false);
         },
      });
      return () => firebase.getMessagesListCloseConnection(user?.uid, onValueChange);
   }, []);
   return isLoading ? (
      <View style={styles.loaderContainer}>
         <LottieView source={loader} autoPlay loop style={styles.lottie} />
      </View>
   ) : (
      <View style={styles.container}>
         <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            <ContactCard
               name="Quickfix-Chatbot"
               message="Hi"
               onPress={() => {
                  navigation.navigate(ROUTES.CHATBOT);
               }}
               style={styles.contactCard}
            />
            {Object.keys(messages).map((name, index) => (
               <ContactCard
                  name={`${name?.split('_')[1]}`}
                  message={` ${Object.values(messages[name])[0].message}`}
                  onPress={() => {
                     navigation.navigate(ROUTES.CHAT, { senderId: name?.split('_')[0], senderKey: name });
                  }}
                  style={styles.contactCard}
                  key={index}
               />
            ))}
         </ScrollView>
      </View>
   );
};
