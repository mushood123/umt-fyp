import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TimeSlots = ({
   timeSlots = [
      '8:00 AM - 10:00 AM',
      '10:00 AM - 12:00 PM',
      '12:00 PM - 2:00 PM',
      '2:00 PM - 4:00 PM',
      '6:00 PM - 8:00 PM',
   ],
   onSelectTimeSlot,
   selectedTimeSlot,
   date, // Optional date prop for comparing with a specific date
}) => {
   const [selected, setSelected] = useState(selectedTimeSlot || null);
   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

   // Effect to update internal state if the prop changes from parent
   useEffect(() => {
      setSelected(selectedTimeSlot);
   }, [selectedTimeSlot]);

   // Filter time slots based on current time
   useEffect(() => {
      const filterTimeSlots = () => {
         const now = new Date();
         const currentHour = now.getHours();
         const currentMinute = now.getMinutes();

         // If a specific date is provided and it's a future date, show all slots
         if (date) {
            const selectedDate = new Date(date);
            const today = new Date();

            // Reset time components for date comparison
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate.getTime() > today.getTime()) {
               setAvailableTimeSlots([...timeSlots]);
               return;
            }
         }

         // Filter time slots based on current time
         const filtered = timeSlots.filter(slot => {
            const [startTime, endTime] = slot.split(' - ');
            const [startHour, startMinuteWithSuffix] = startTime.split(':');
            const [startMinute, startSuffix] = startMinuteWithSuffix.split(' ');

            const [endHour, endMinuteWithSuffix] = endTime.split(':');
            const [endMinute, endSuffix] = endMinuteWithSuffix.split(' ');

            // Convert to 24-hour format
            let start24Hour = parseInt(startHour);
            if (startSuffix === 'PM' && start24Hour !== 12) start24Hour += 12;
            if (startSuffix === 'AM' && start24Hour === 12) start24Hour = 0;

            let end24Hour = parseInt(endHour);
            if (endSuffix === 'PM' && end24Hour !== 12) end24Hour += 12;
            if (endSuffix === 'AM' && end24Hour === 12) end24Hour = 0;

            // Convert current time for comparison
            const currentTimeInMinutes = currentHour * 60 + currentMinute;
            const endTimeInMinutes = end24Hour * 60 + parseInt(endMinute);

            // Show slot if the end time is in the future
            return endTimeInMinutes > currentTimeInMinutes;
         });

         setAvailableTimeSlots(filtered);
      };

      filterTimeSlots();

      // Optionally set up an interval to refresh the available time slots every minute
      const intervalId = setInterval(filterTimeSlots, 60000);

      return () => clearInterval(intervalId);
   }, [timeSlots, date]);

   const handleSelect = timeSlot => {
      setSelected(timeSlot);
      if (onSelectTimeSlot) {
         onSelectTimeSlot(timeSlot);
      }
   };

   return (
      <View style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.timeSlotsContainer}>
               {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((timeSlot, index) => (
                     <TouchableOpacity
                        key={index}
                        style={[styles.timeSlot, selected === timeSlot && styles.selectedTimeSlot]}
                        onPress={() => handleSelect(timeSlot)}
                     >
                        <Text style={[styles.timeText, selected === timeSlot && styles.selectedTimeText]}>
                           {timeSlot}
                        </Text>
                     </TouchableOpacity>
                  ))
               ) : (
                  <Text style={styles.noSlotsText}>No available time slots for today</Text>
               )}
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginVertical: 0,
      width: '100%',
   },
   timeSlotsContainer: {
      width: '100%',
   },
   timeSlot: {
      width: '100%',
      padding: 15,
      borderRadius: 8,
      backgroundColor: '#e9ecef',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ced4da',
      alignItems: 'center',
      justifyContent: 'center',
   },
   selectedTimeSlot: {
      backgroundColor: '#007bff',
      borderColor: '#0056b3',
   },
   timeText: {
      fontSize: 16,
      color: '#212529',
   },
   selectedTimeText: {
      color: '#ffffff',
      fontWeight: 'bold',
   },
   noSlotsText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#6c757d',
      marginTop: 20,
      marginBottom: 20,
   },
});

export default TimeSlots;
