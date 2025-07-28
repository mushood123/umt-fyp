import { StyleSheet, Dimensions } from 'react-native';
import { purple, lightTheme } from '../../../themes';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: lightTheme.backgroundColor,
   },
   logo: {
      width: 350,
      height: 150,
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
   map: {
      width: '100%',
      height: '70%',
   },
   addressContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   addressText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 16,
      textAlign: 'center',
   },
   confirmButton: {
      backgroundColor: purple.light,
      width: '100%',
      height: 50,
      borderRadius: 12,
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
   },
   searchContainer: {
      position: 'absolute',
      top: 20,
      width: '90%',
      zIndex: 1,
   },
   autocompleteContainer: {
      flex: 0,
      width: '100%',
      backgroundColor: 'transparent',
   },
   searchInput: {
      height: 50,
      borderRadius: 10,
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   searchResults: {
      backgroundColor: '#fff',
      borderRadius: 10,
      marginTop: 5,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
   },
   loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   searchResultItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
   },
   searchResultText: {
      fontSize: 14,
      color: '#333',
   },
   permissionBanner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffebee',
      padding: 10,
      zIndex: 2,
      borderBottomWidth: 1,
      borderBottomColor: '#ffcdd2',
   },
   permissionText: {
      color: '#c62828',
      textAlign: 'center',
      fontSize: 12,
   },
});
