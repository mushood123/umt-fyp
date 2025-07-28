// Profile.jsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { database, getCurrentUser, handleLogout, toggleActivityStatus } from './utils';

export const ActionTeamProfile = ({ navigation }) => {
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [status, setStatus] = useState(null);
   const [statusUpdating, setStatusUpdating] = useState(false);

   useEffect(() => {
      fetchUser();
   }, []);

   const fetchUser = async () => {
      setLoading(true);
      const user = getCurrentUser();
      if (user?.uid) {
         database()
            .ref?.(`users/${user.uid}/userData`)
            .on('value', snapshot => {
               if (snapshot.exists()) {
                  const userData = snapshot.val();
                  setUserData(userData);
                  setStatus(userData?.status || 'offline'); // Initialize status
               } else {
                  setUserData(null);
                  setStatus('offline');
               }
            });
      }
      setLoading(false);
   };

   const handleToggleStatus = async () => {
      setStatusUpdating(true);
      const newStatus = await toggleActivityStatus();
      if (newStatus) setStatus(newStatus);
      setStatusUpdating(false);
   };

   const ProfileField = ({ label, value }) => (
      <View style={styles.profileField}>
         <Text style={styles.fieldLabel}>{label}</Text>
         <Text style={styles.fieldValue}>{value || 'Not provided'}</Text>
      </View>
   );

   const onLogoutPress = () => {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
         { text: 'Cancel', style: 'cancel' },
         {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
               const success = await handleLogout();
               if (success) {
                  navigation.replace('CustomerLogin');
               }
            },
         },
      ]);
   };

   return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
         <View style={{ width: '100%', padding: 24 }}>
            <Text style={styles.title}>My Profile</Text>
            {loading ? (
               <ActivityIndicator size="large" color="#888" />
            ) : userData ? (
               <>
                  <View style={styles.profileCard}>
                     <ProfileField label="Name" value={userData.name} />
                     <ProfileField label="Email Address" value={userData.email} />
                     <ProfileField label="Designation" value={userData.designation} />
                     <ProfileField label="Phone Number" value={userData.phone} />
                  </View>

                  {/* Toggle Status Button */}
                  <TouchableOpacity
                     style={[styles.statusButton, status === 'active' ? styles.statusActive : styles.statusOffline]}
                     onPress={handleToggleStatus}
                     disabled={statusUpdating}
                  >
                     <View style={styles.statusButtonFirstPart}>
                        <View style={[styles.statusDot, status === 'active' ? styles.dotActive : styles.dotOffline]} />
                        {statusUpdating ? (
                           <ActivityIndicator size="small" color="#555" />
                        ) : (
                           <Text style={styles.statusButtonText}>{status === 'active' ? 'Active' : 'Offline'}</Text>
                        )}
                     </View>
                     <View>
                        {/* Small click to toggle hint */}
                        {!statusUpdating && (
                           <Text
                              style={{
                                 textAlign: 'center',
                                 color: '#666',
                                 fontSize: 13,
                              }}
                           >
                              Click to go {status === 'active' ? 'Currently Offline' : 'Currently Online'}
                           </Text>
                        )}
                     </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                     <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>
               </>
            ) : (
               <Text>No user data found.</Text>
            )}
         </View>
      </ScrollView>
   );
};
