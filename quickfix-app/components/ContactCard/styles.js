// import { StyleSheet, Dimensions } from 'react-native';

import { StyleSheet, Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('screen');

// const screenDimensions = Dimensions.get('screen');

// export const styles = StyleSheet.create({
//    container: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'white',
//       height: 80,
//       width: screenDimensions.width * 0.9,
//       marginVertical: 10,
//       borderWidth: 1,
//       borderRadius: 10,
//    },
// });

export const styles = StyleSheet.create({
   card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      height: 80,
      width: screenDimensions.width * 0.9,
   },
   leftSection: {
      marginRight: 12,
   },
   circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF5E6',  // Cream color background
   },
   initial: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',  // Black text
   },
   textContainer: {
      flex: 1,
      justifyContent: 'center',
   },
   name: {
      fontSize: 16,
      color: '#333333',
      fontWeight: 'bold',  // Made name bold
   },
   message: {
      fontSize: 14,
      color: '#666666',
      marginTop: 4,
   },
});
