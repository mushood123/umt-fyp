import { StyleSheet, Dimensions } from 'react-native';
import { lightTheme, purple } from '../../themes';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: lightTheme.backgroundColor,
   },
   actionTeam: {
      alignSelf: 'flex-start',
      marginVertical: 15,
      marginLeft: 15,
      fontWeight: 'bold',
      textDecorationLine: 'underline'

   },
   textStyle: {
      color: purple.darkest,
      fontSize: 16,
      fontWeight: '500',
   },
   buttonStyle: {
      backgroundColor: purple.light,
      width: screenDimensions.width * 0.9,
      height: 55,
      borderRadius: 20,
   },
   welcomeText: {
      fontWeight: 'bold',
      fontSize: 26,
      textAlign: 'center',
      paddingLeft: screenDimensions.width * 0.05,
      paddingRight: screenDimensions.width * 0.05,
   },
   descriptionText: {
      fontSize: 15,
      textAlign: 'center',
      paddingLeft: screenDimensions.width * 0.05,
      paddingRight: screenDimensions.width * 0.05,
      marginTop: screenDimensions.height * 0.03,
      marginBottom: screenDimensions.height * 0.04,
   },
   choiceText: {
      marginTop: screenDimensions.height * 0.02,
      marginBottom: screenDimensions.height * 0.02,
   },
   image: {
      height: screenDimensions.height * 0.4,
      width: screenDimensions.width * 1,
      resizeMode: 'contain',
   },
   containerFooter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: screenDimensions.height * 0.05,
   },
   contactText: {
      color: purple.light,
   },
});
