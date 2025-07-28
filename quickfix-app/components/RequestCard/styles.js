import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 10,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: '100%',
   },
   iconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#3498DB',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
   },
   defaultIcon: {
      width: 24,
      height: 24,
      backgroundColor: 'white',
   },
   contentContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   textContainer: {
      flex: 1,
      marginRight: 12,
   },
   titleText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#333',
      marginBottom: 4,
   },
   descriptionText: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
   },
   statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
   },
   statusText: {
      fontSize: 12,
      fontWeight: '600',
   },
   businessText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
   },
   timeContainer: {
      marginTop: 8,
   },
   timeText: {
      fontSize: 12,
      color: '#888',
      fontStyle: 'italic',
   },
});
