/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { iconSelector } from './utils';
import { loader } from '../../../../assets';
import { RequestCard, RequestViewModal } from '../../../../components';
import { firebase } from '../../../../firebase';

export const Pending = () => {
   const user = firebase.getCurrentFirebaseUser();
   const [userRequests, setUserRequests] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [modalVisibility, setModalVisibility] = useState(false)
   const [modalRequest, setModalRequest] = useState(null)
   useEffect(() => {
      setLoading(true)
      firebase.getUserRequests(user?.uid, {
         successCB: d => {
            setUserRequests(d);
            setLoading(false)
         },
         errorCB: e => {
            setUserRequests(e);
            setLoading(false)
         }
      });

   }, [user?.uid, setUserRequests]);

   return (
      isLoading ? (
         <View style={styles.loaderContainer}>
            <LottieView
               source={loader}
               autoPlay
               loop
               style={styles.lottie}
            />
         </View>
      ) : (
         <>
            <ScrollView
               style={styles.container}
               contentContainerStyle={styles.scrollContainer}
               showsVerticalScrollIndicator={false}
            >
               {userRequests && Object.values(userRequests).map((req, index) => (
                  req?.status === 'pending' ? (
                     <RequestCard
                        key={index}
                        Icon={iconSelector[req?.requestDetail]}
                        title={req?.requestDetail}
                        problemDescription={req?.problemDescription}
                        status={req?.status}
                        onPress={() => {
                           setModalVisibility(true)
                           setModalRequest(req)
                        }}
                     />
                  ) : null
               ))}
            </ScrollView>
            <RequestViewModal
               modalVisible={modalVisibility}
               setModalVisible={setModalVisibility}
               requestData={modalRequest}

            />
         </>
      )
   );

};
