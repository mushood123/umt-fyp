/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { renderRequests, technicainType, toggleActivityStatus } from './utils';
import { loader } from '../../../../assets';
import { RequestViewModal } from '../../../../components';
import { firebase } from '../../../../firebase';
import { userRef } from '../../../../firebase/database';

export const ActionHome = () => {
   const user = firebase.getCurrentFirebaseUser();
   const [requestData, setRequestData] = useState(null);
   const [currentTechnician, setCurrentTechnician] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [modalVisibility, setModalVisibility] = useState(false);
   const [modalRequest, setModalRequest] = useState(null);
   const [workService, setWorkService] = useState(null);
   const requestId = useRef(null);

   useEffect(() => {
      userRef(user?.uid)
         .child('userData')
         .on('value', snapshot => {
            if (snapshot.exists()) {
               const userData = snapshot.val();
               setCurrentTechnician(userData);
               console.log(technicainType[userData?.designation]);
               setWorkService(technicainType[userData?.designation]);
            } else {
               setCurrentTechnician(null);
               setWorkService(null);
            }
         });
   }, [user]);

   useEffect(() => {
      const stopListening = firebase.getRequest(user?.uid, workService, {
         successCB: s => {
            setLoading(false);
            setRequestData(s);
         },
         errorCB: e => {
            setLoading(false);
         },
      });

      return () => stopListening();
   }, [workService]);

   // if (modalRequest) {
   //    requestId.current = Object.keys(requestData).find(
   //       id => JSON.stringify(requestData[id]) === JSON.stringify(modalRequest)
   //    );
   // }

   const handleSetTechnicianDetails = () => {
      firebase.setTechnicianDetails(requestId.current, user.displayName, user.uid);
   };

   return isLoading ? (
      <View style={styles.loaderContainer}>
         <LottieView source={loader} autoPlay loop style={styles.lottie} />
      </View>
   ) : (
      <>
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Pending Requests</Text>
         </View>

         {(currentTechnician?.status ?? '') === 'active' ? (
            <ScrollView
               style={styles.container}
               contentContainerStyle={styles.scrollContainer}
               showsVerticalScrollIndicator={false}
            >
               {renderRequests(requestData, setModalVisibility, setModalRequest)}
            </ScrollView>
         ) : (
            <TouchableOpacity
               style={[
                  styles.statusButton,
                  currentTechnician?.status === 'active' ? styles.statusActive : styles.statusOffline,
               ]}
               onPress={toggleActivityStatus}
            >
               <View style={styles.statusButtonFirstPart}>
                  <View
                     style={[
                        styles.statusDot,
                        currentTechnician?.status === 'active' ? styles.dotActive : styles.dotOffline,
                     ]}
                  />
                  <Text style={styles.statusButtonText}>{'Offline'}</Text>
               </View>
               <View>
                  {/* Small click to toggle hint */}
                  <Text
                     style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: 13,
                     }}
                  >
                     Click to go {currentTechnician?.status === 'active' ? 'Offline' : 'Online'}
                  </Text>
               </View>
            </TouchableOpacity>
         )}

         <RequestViewModal
            modalVisible={modalVisibility}
            setModalVisible={setModalVisibility}
            requestData={modalRequest}
            currentTechnician={currentTechnician}
            isTechnician
            setTechnicianDetails={handleSetTechnicianDetails}
         />
      </>
   );
};
