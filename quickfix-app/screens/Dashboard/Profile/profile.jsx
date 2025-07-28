import React, { useEffect, useState, useCallback, memo, useRef } from 'react';
import {
   ScrollView,
   View,
   Text,
   ActivityIndicator,
   TouchableOpacity,
   Alert,
   KeyboardAvoidingView,
   Platform,
   TextInput,
} from 'react-native';
import { styles } from './styles';
import { getCurrentUser, getUserDetails, handleLogout, updateUserProfile } from './utils';
import { ROUTES } from '../../../utils';
import { Button } from '../../../components';
import { CLAUSES } from '../../../constants';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({ navigation }) => {
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [selectedLocation, setSelectedLocation] = useState(null);
   const [formData, setFormData] = useState({
      businessName: '',
      businessAddress: '',
      contactName: '',
      contactNumber: '',
      email: '',
      preferredUserID: '',
      password: '',
   });
   const inputRefs = useRef({});

   useFocusEffect(
      useCallback(() => {
         loadSavedLocation();
      }, [])
   );

   useEffect(() => {
      fetchUser();
   }, []);

   useEffect(() => {
      if (userData && !isEditing) {
         setFormData({
            businessName: userData.businessName || '',
            businessAddress: userData.businessAddress || '',
            contactName: userData.contactName || '',
            contactNumber: userData.contactNumber || '',
            email: userData.email || '',
            preferredUserID: userData.preferredUserID || '',
            password: userData.password || '',
         });
      }
   }, [userData, isEditing]);

   const fetchUser = useCallback(async () => {
      setLoading(true);
      const user = getCurrentUser();
      if (user?.uid) {
         const data = await getUserDetails(user.uid);
         setUserData(data);
      }
      setLoading(false);
   }, []);

   const loadSavedLocation = useCallback(async () => {
      try {
         const locationData = await AsyncStorage.getItem('businessLocation');
         if (locationData) {
            const parsedLocation = JSON.parse(locationData);
            setSelectedLocation(parsedLocation);
            if (isEditing) {
               setFormData(prev => ({
                  ...prev,
                  businessAddress: parsedLocation.address,
               }));
            }
         }
      } catch (error) {
         console.log('Error loading location:', error);
      }
   }, [isEditing]);

   const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
   };

   const toggleEditMode = useCallback(() => {
      if (isEditing) {
         setIsEditing(false);
         if (userData) {
            setFormData({
               businessName: userData.businessName || '',
               businessAddress: userData.businessAddress || '',
               contactName: userData.contactName || '',
               contactNumber: userData.contactNumber || '',
               email: userData.email || '',
               preferredUserID: userData.preferredUserID || '',
               password: userData.password || '',
            });
         }
      } else {
         setIsEditing(true);
      }
   }, [isEditing, userData]);

   const handleSave = useCallback(async () => {
      const requiredFields = [
         { key: 'businessName', label: 'Business Name' },
         { key: 'businessAddress', label: 'Business Address' },
         { key: 'contactName', label: 'Contact Name' },
         { key: 'contactNumber', label: 'Contact Number' },
         { key: 'email', label: 'Email' },
      ];

      for (const field of requiredFields) {
         if (!formData[field.key] || formData[field.key].trim() === '') {
            Alert.alert('Missing Input', `Please fill in ${field.label}`);
            return;
         }
      }

      try {
         setLoading(true);
         const updatedData = {
            ...formData,
            businessCordinates: selectedLocation?.coordinates || userData?.businessCordinates || null,
            businessAddress: selectedLocation?.address || formData.businessAddress,
         };

         const user = getCurrentUser();
         if (!user?.uid) {
            Alert.alert('Error', 'User not found');
            setLoading(false);
            return;
         }

         await updateUserProfile(user.uid, updatedData);
         setUserData(updatedData);
         setIsEditing(false);
         Alert.alert('Success', 'Profile updated successfully');
      } catch (error) {
         console.error('Error updating profile:', error);
         Alert.alert('Error', 'Failed to update profile');
      } finally {
         setLoading(false);
      }
   }, [formData, selectedLocation, userData]);

   const onLogoutPress = useCallback(() => {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
         { text: 'Cancel', style: 'cancel' },
         {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
               const success = await handleLogout();
               if (success) {
                  navigation.replace(ROUTES.ONBOARDING);
               }
            },
         },
      ]);
   }, [navigation]);

   const focusNextField = nextField => {
      if (inputRefs.current[nextField]) {
         inputRefs.current[nextField].focus();
      }
   };

   const ProfileField = memo(
      ({ label, value }) => (
         <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldValue}>{value || 'Not provided'}</Text>
         </View>
      ),
      (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.label === nextProps.label
   );

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}
      >
         <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            showsVerticalScrollIndicator={false}
         >
            <View style={{ width: '100%', padding: 24 }}>
               <View style={styles.headerContainer}>
                  <Text style={styles.title}>My Profile</Text>
                  {!loading && userData && !isEditing && (
                     <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
                        <Text style={styles.editButtonText}>Edit</Text>
                     </TouchableOpacity>
                  )}
               </View>

               {loading && <ActivityIndicator size="large" color="#888" />}
               {!loading && !userData && <Text>No user data found.</Text>}
               {!loading && userData && (
                  <View style={styles.profileCard}>
                     {isEditing ? (
                        <View>
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>Business Name</Text>
                              <TextInput
                                 style={styles.input}
                                 value={formData.businessName}
                                 onChangeText={text => handleChange('businessName', text)}
                                 key="businessName"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['Business Name'] = ref)}
                                 returnKeyType="next"
                                 onSubmitEditing={() => focusNextField('Contact Name')}
                              />
                           </View>
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>Contact Name</Text>
                              <TextInput
                                 style={styles.input}
                                 value={formData.contactName}
                                 onChangeText={text => handleChange('contactName', text)}
                                 key="contactName"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['Contact Name'] = ref)}
                                 returnKeyType="next"
                                 onSubmitEditing={() => focusNextField('Contact Number')}
                              />
                           </View>
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>Contact Number</Text>
                              <TextInput
                                 style={styles.input}
                                 value={formData.contactNumber}
                                 onChangeText={text => handleChange('contactNumber', text)}
                                 key="contactNumber"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['Contact Number'] = ref)}
                                 returnKeyType="next"
                                 onSubmitEditing={() => focusNextField('Email Address')}
                              />
                           </View>
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>Email Address</Text>
                              <TextInput
                                 style={styles.input}
                                 value={formData.email}
                                 onChangeText={text => handleChange('email', text)}
                                 key="email"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['Email Address'] = ref)}
                                 returnKeyType="next"
                                 onSubmitEditing={() => focusNextField('Business Address')}
                              />
                           </View>
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>Business Address</Text>
                              <TextInput
                                 style={styles.input}
                                 value={selectedLocation?.address || formData.businessAddress}
                                 onChangeText={text => handleChange('businessAddress', text)}
                                 key="businessAddress"
                                 editable={!selectedLocation}
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['Business Address'] = ref)}
                                 returnKeyType="next"
                                 onSubmitEditing={() => focusNextField('User ID')}
                              />
                           </View>
                           <Button
                              title={selectedLocation ? 'Change Business Location' : CLAUSES.ADD_YOUR_ADDRESS}
                              buttonStyle={styles.locationButton}
                              textStyle={styles.buttonTextStyle}
                              onPress={() => navigation.navigate(ROUTES.BUSINESS_ADDRESS)}
                           />
                           <View style={styles.profileField}>
                              <Text style={styles.fieldLabel}>User ID</Text>
                              <TextInput
                                 style={styles.input}
                                 value={formData.preferredUserID}
                                 onChangeText={text => handleChange('preferredUserID', text)}
                                 key="preferredUserID"
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 ref={ref => (inputRefs.current['User ID'] = ref)}
                                 returnKeyType="done"
                                 blurOnSubmit={true}
                              />
                           </View>
                           <View style={styles.buttonContainer}>
                              <Button
                                 title="Save"
                                 buttonStyle={styles.saveButton}
                                 textStyle={styles.buttonTextStyle}
                                 onPress={handleSave}
                              />
                              <Button
                                 title="Cancel"
                                 buttonStyle={styles.cancelButton}
                                 textStyle={styles.cancelButtonText}
                                 onPress={toggleEditMode}
                              />
                           </View>
                        </View>
                     ) : (
                        <View>
                           <ProfileField label="Business Name" value={userData.businessName} />
                           <ProfileField label="Contact Name" value={userData.contactName} />
                           <ProfileField label="Contact Number" value={userData.contactNumber} />
                           <ProfileField label="Email Address" value={userData.email} />
                           <ProfileField label="Business Address" value={userData.businessAddress} />
                           <ProfileField label="User ID" value={userData.preferredUserID} />
                        </View>
                     )}
                  </View>
               )}
               {!loading && userData && (
                  <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                     <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>
               )}
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
};
