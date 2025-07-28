import { StyleSheet, Dimensions } from 'react-native';
import { purple, lightTheme } from '../../../themes';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: lightTheme.backgroundColor,
   },
   logo: {
      width: 350,
      height: 250,
      resizeMode: 'stretch',
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
   input: {
      width: '90%',
      marginBottom: 20,
   },
   signInMsg: {
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginVertical: 30,
      fontSize: 18,
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
