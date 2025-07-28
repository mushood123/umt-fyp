/* eslint-disable no-underscore-dangle */
// @ts-nocheck
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useFormik } from 'formik';
import { styles } from './styles';
import { getCurrentDate, getCurrentTimestampReadable, timeSlots } from './utils';
import { Button, Input } from '../../components';
import { CLAUSES } from '../../constants';
import { firebase } from '../../firebase';
import { useNavigation } from 'expo-router';
import useSocket from '../../lib/useSocket';
import TimeSlots from '../../components/TimeSlots';

const workServices = {
   1: 'Heating and Cooling System',
   2: 'Electrical',
   3: 'Plumbering',
   4: 'Drainage',
};

export const PackageDetails = ({ route, navigation }) => {
   const { request, icon: Icon } = route?.params;
   const _user = firebase.getCurrentFirebaseUser();
   const [user, setUser] = useState(null);
   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
   const currentDate = getCurrentDate();
   const { socket, status, error } = useSocket(_user.uid);

   const handleSubmit = async values => {
      try {
         if (!user?.businessCordinates) {
            Alert.alert('Error', 'Business location is required. Please update your profile.');
            return;
         }

         const requestData = {
            ...values,
            businessName: user.businessName,
            contactNumber: user.contactNumber,
            businessCordinates: user.businessCordinates,
            createdBy: _user?.uid,
            requestType: request,
            requestDetail: workServices[request],
         };

         await firebase.setRequest(_user?.uid, requestData);

         // Reset form and time slot
         form.resetForm();
         setSelectedTimeSlot('');
         socket.emit('send_message', { to: 'admin', message: `A new Request for ${workServices[request]}` });
         Alert.alert('Success', 'Your request has been submitted successfully.', [
            {
               text: 'OK',
               onPress: () => navigation.goBack(),
            },
         ]);
      } catch (error) {
         Alert.alert('Error', error.message || 'Failed to submit request. Please try again.');
      }
   };

   const form = useFormik({
      initialValues: {
         problemDescription: '',
         timeSlot: '',
         date: currentDate,
         timeStamp: getCurrentTimestampReadable(),
         status: 'pending',
      },
   });

   useEffect(() => {
      firebase.getUserDataById(_user?.uid, {
         successCB: d => {
            setUser(d);
         },
      });
   }, [_user?.uid, setUser]);

   useEffect(() => {
      if (user) {
         form.setFieldValue('businessName', user.businessName);
         form.setFieldValue('contactNumber', user.contactNumber);
      }
   }, [user]);

   const handleTimeSlotSelect = slot => {
      setSelectedTimeSlot(slot);
      form.setFieldValue('timeSlot', slot);
   };

   return (
      <SafeAreaView style={styles.safeArea}>
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
               <View style={styles.header}>
                  <Icon style={styles.headerIcon} />
                  <Text style={styles.headerText}>{workServices[request]}</Text>
               </View>

               <View style={styles.formSection}>
                  <Text style={styles.label}>{CLAUSES.BUSINESS_NAME}</Text>
                  <Input style={styles.input} disabled value={form.values.businessName} />

                  <Text style={styles.label}>{CLAUSES.CONTACT_NUMBER}</Text>
                  <Input style={styles.input} disabled value={form.values.contactNumber} />

                  <Text style={styles.label}>{CLAUSES.PROBLEM_DESCRIPTION}</Text>
                  <Input
                     style={styles.descriptionInput}
                     multiline
                     numberOfLines={4}
                     value={form.values.problemDescription}
                     handleOnChangeText={form.handleChange('problemDescription')}
                  />
               </View>

               <View style={styles.timeSection}>
                  <Text style={styles.dateText}>{`${CLAUSES.YOUR_REQUEST_IS_FOR_THIS_DATE}: ${currentDate}`}</Text>
                  <Text style={styles.timeHeading}>{CLAUSES.SELECT_A_TIME_SLOT}</Text>

                  <View style={styles.timeSlots}>
                     <TimeSlots
                        timeSlots={timeSlots}
                        onSelectTimeSlot={handleTimeSlotSelect}
                        selectedTimeSlot={selectedTimeSlot}
                     />
                  </View>
               </View>

               <Button
                  buttonStyle={styles.submitButton}
                  textStyle={styles.submitButtonText}
                  title={CLAUSES.SUBMIT_REQUEST}
                  onPress={() => handleSubmit(form.values)}
                  disabled={!form.values.timeSlot || !form.values.problemDescription}
               />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};
