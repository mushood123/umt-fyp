// Home.jsx
import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { serviceCards } from './utils';
import { imgLogo } from '../../../assets';
import { Card } from '../../../components';
import { CLAUSES } from '../../../constants';
import { purple } from '../../../themes/purple';

export const Home = ({ navigation }) => (
   <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ backgroundColor: 'transparent' }}
   >
      <LinearGradient
         colors={[purple.lightest, '#fcf9ff']}
         style={styles.gradientBackground}
      >
         <View style={styles.container}>
            <View style={styles.header}>
               <Image
                  source={imgLogo}
                  style={styles.logo}
               />
            </View>

            <View style={styles.contentContainer}>
               <Text style={styles.title}>{CLAUSES.RAISE_SERVICE_REQUEST}</Text>

               <View style={styles.cardsContainer}>
                  {serviceCards.map(card => (
                     <Card
                        key={card.id}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        onPress={() => {
                           if (card.navigateTo) {
                              navigation.navigate(card.navigateTo, card.navigateParams);
                           } else if (card.onPress) {
                              card.onPress();
                           }
                        }}
                     />
                  ))}
               </View>
            </View>
         </View>
      </LinearGradient>
   </ScrollView>
);
