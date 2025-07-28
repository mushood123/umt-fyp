/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Dimensions } from 'react-native';
import { lightTheme, purple } from '../../themes';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
      backgroundColor: lightTheme.backgroundColor,
      paddingBottom: 30,
   },
   scrollContainer: {
      flexGrow: 1,
      paddingBottom: 30,
   },
   container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: lightTheme.backgroundColor,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
   },
   headerIcon: {
      marginRight: 12,
   },
   headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: purple.darkest,
      marginLeft: 15,
   },
   formSection: {
      width: '100%',
      marginBottom: 24,
   },
   label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: purple.darkest,
   },
   input: {
      width: '100%',
      marginBottom: 20,
      borderColor: purple.light,
      borderWidth: 1,
      borderRadius: 8,
   },
   descriptionInput: {
      width: '100%',
      marginBottom: 20,
      height: 100,
      textAlignVertical: 'top',
      borderColor: purple.light,
      borderWidth: 1,
      borderRadius: 8,
   },
   timeSection: {
      width: '100%',
      marginBottom: 30,
   },
   dateText: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 16,
      color: purple.darkest,
   },
   timeHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: purple.darkest,
   },
   timeSlots: {
      alignItems: 'center',
   },
   buttonStyle: {
      backgroundColor: purple.light,
      width: screenDimensions.width * 0.85,
      height: 55,
      borderRadius: 12,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   textStyle: {
      color: purple.darkest,
      fontSize: 16,
      fontWeight: '500',
   },
   submitButton: {
      backgroundColor: purple.darkest,
      width: '100%',
      height: 55,
      borderRadius: 12,
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
   },
   submitButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
   },
   selectedTimeSlot: {
      backgroundColor: purple.darkest,
      borderWidth: 2,
      borderColor: purple.light,
   },
   selectedTimeSlotText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
   },
});
