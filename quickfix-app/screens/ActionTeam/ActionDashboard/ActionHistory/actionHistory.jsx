/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { renderRequests, technicainType } from './utils';
import { loader } from '../../../../assets';
import { RequestViewModal } from '../../../../components';
import { firebase } from '../../../../firebase';

export const ActionHistory = () => {
   const user = firebase.getCurrentFirebaseUser();
   const [requestData, setRequestData] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [modalVisibility, setModalVisibility] = useState(false);
   const [modalRequest, setModalRequest] = useState(null);
   const [workService, setWorkService] = useState(null);
   const [currentTechnician, setCurrentTechnician] = useState(null);

   useEffect(() => {
      firebase.getUserDataById(user?.uid, {
         successCB: s => setWorkService(technicainType[s?.designation]),
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
            setError(e);
         },
      });

      return () => stopListening();
   }, [workService]);

   return isLoading ? (
      <View style={styles.loaderContainer}>
         <LottieView source={loader} autoPlay loop style={styles.lottie} />
      </View>
   ) : (
      <>
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Completed Requests</Text>
         </View>

         <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
         >
            {renderRequests(requestData, setModalVisibility, setModalRequest)}
         </ScrollView>

         <RequestViewModal
            modalVisible={modalVisibility}
            setModalVisible={setModalVisibility}
            requestData={modalRequest}
            currentTechnician={currentTechnician}
            isTechnician
         />
      </>
   );
};
