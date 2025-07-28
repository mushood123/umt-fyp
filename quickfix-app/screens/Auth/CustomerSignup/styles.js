import { StyleSheet, Dimensions } from 'react-native';
import { purple, lightTheme } from '../../../themes';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor,
   },
   logo: {
      width: 300,
      height: 100,
      resizeMode: 'contain',
   },
   signUpMsg: {
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginVertical: 10,
      fontSize: 18,
   },
   scrollContainer: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      width: '90%',
      marginBottom: 20,
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
      marginVertical: 10,
   },
});
