import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Linking, Alert, TextInput } from 'react-native';
import { styles } from './styles';
import {
   acceptRequest,
   addUserFeedback,
   cancelRequestByTechnician,
   getStatusColor,
   updateRequestStatus,
} from './utils';
import useSocket from '../../lib/useSocket';
import { firebase } from '../../firebase';
import { database } from '../../firebase/database';

export const RequestViewModal = ({
   modalVisible,
   setModalVisible,
   isTechnician = false,
   currentTechnician,
   requestData = {},
}) => {
   const user = firebase.getCurrentFirebaseUser();
   const [showRemarksModal, setShowRemarksModal] = useState(false);
   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
   const [remarks, setRemarks] = useState('');
   const [feedback, setFeedback] = useState('');
   const [amount, setAmount] = useState('');
   const [modalType, setModalType] = useState('');
   const { socket } = useSocket(user?.uid || '');

   const {
      requestDetail,
      problemDescription,
      status,
      businessName,
      contactNumber,
      timeSlot,
      date,
      feedback: feedbackFromDB,
      businessCordinates,
      requestId,
      statusDetails,
      createdBy: userId,
   } = requestData || {};

   const openMap = () => {
      if (businessCordinates?.latitude && businessCordinates?.longitude) {
         const url = `https://www.google.com/maps/dir/?api=1&destination=${businessCordinates.latitude},${businessCordinates.longitude}`;
         Linking.openURL(url);
      }
   };

   const handleAcceptRequest = async () => {
      const userDoc = await database().ref(`users/${userId}/fcmToken`).once('value');
      const userDevicePushToken = userDoc.val();
      const techDetails = {
         technicianId: user?.uid,
         technicianName: currentTechnician.name,
         assignedAt: new Date().toISOString(),
      };

      socket?.emit('send_push_fcm', {
         token: userDevicePushToken,
         messageTitle: `✅ ${techDetails.technicianName} accepted your request!`,
         messageBody: `Request: ${requestDetail}\nScheduled for ${date} at ${timeSlot}.\nWe'll see you soon!`,
      });

      const success = await acceptRequest(requestId, techDetails);
      if (success) {
         setModalVisible(false);
      } else {
         Alert.alert('Error', 'Failed to accept request. Please try again.');
      }
   };

   const handleStatusUpdate = newStatus => {
      setModalType(newStatus);
      setShowRemarksModal(true);
   };

   const handleFeedback = () => {
      setShowFeedbackModal(true);
   };

   const handleSubmitRemarks = async () => {
      try {
         if (modalType === 'cancelled' && !remarks.trim()) {
            Alert.alert('Error', 'Please provide a reason for cancellation');
            return;
         }

         if (modalType === 'completed' && !amount.trim()) {
            Alert.alert('Error', 'Please enter the amount charged');
            return;
         }

         const success =
            modalType === 'cancelled'
               ? await cancelRequestByTechnician(requestId, userId, {
                    remarks: remarks.trim(),
                    cancelledBy: currentTechnician.id,
                 })
               : await updateRequestStatus(requestId, 'completed', {
                    remarks: remarks.trim(),
                    completedBy: currentTechnician.id,
                    amount: parseFloat(amount),
                    completedAt: new Date().toISOString(),
                 });

         if (success) {
            setShowRemarksModal(false);
            setModalVisible(false);
            setRemarks('');
            setAmount('');
         } else {
            Alert.alert('Error', `Failed to ${modalType} request. Please try again.`);
         }
      } catch (error) {
         Alert.alert('Error', 'An unexpected error occurred.');
         console.error(error);
      }
   };
   const handleSubmitFeedback = async () => {
      try {
         if (!feedback.trim()) {
            Alert.alert('Error', 'Please enter the feedback text');
            return;
         }
         const success = addUserFeedback(requestId, userId, feedback);

         if (success) {
            setShowFeedbackModal(false);
            setFeedback('');
            setModalVisible(false);
         } else {
            Alert.alert('Error', `Failed to ${modalType} request. Please try again.`);
         }
      } catch (error) {
         Alert.alert('Error', 'An unexpected error occurred.');
      }
   };

   return (
      <>
         <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
               <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                     <View style={styles.modalContainer}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                           <Text style={styles.modalTitle}>Request Details</Text>
                           <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                              <Text style={styles.closeButtonText}>✕</Text>
                           </TouchableOpacity>
                        </View>

                        {/* Request Content */}
                        <View style={styles.contentContainer}>
                           <View style={styles.headerRow}>
                              <Text style={styles.title} numberOfLines={2}>
                                 {requestDetail}
                              </Text>
                              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
                                 <Text style={styles.statusText}>{status || 'status'}</Text>
                              </View>
                           </View>

                           <View style={styles.detailSection}>
                              <Text style={styles.sectionTitle}>Business Details</Text>
                              <Text style={styles.detailText}>Name: {businessName}</Text>
                              <Text style={styles.detailText}>Contact: {contactNumber}</Text>
                              <TouchableOpacity onPress={openMap} style={styles.locationButton}>
                                 <Text style={styles.locationText}>View Location on Map</Text>
                              </TouchableOpacity>
                           </View>

                           <View style={styles.detailSection}>
                              <Text style={styles.sectionTitle}>Schedule</Text>
                              <Text style={styles.detailText}>Date: {date}</Text>
                              <Text style={styles.detailText}>Time: {timeSlot}</Text>
                           </View>

                           <View style={styles.detailSection}>
                              <Text style={styles.sectionTitle}>Problem Description</Text>
                              <Text style={styles.description}>{problemDescription || 'No description provided'}</Text>
                           </View>
                           {status === 'completed' && statusDetails?.amount && (
                              <View style={styles.detailSection}>
                                 <Text style={styles.sectionTitle}>Payment Details</Text>
                                 <Text style={styles.detailText}>Amount Charged: Rs. {statusDetails.amount}</Text>
                                 {statusDetails.remarks && (
                                    <Text style={styles.detailText}>Remarks: {statusDetails.remarks}</Text>
                                 )}
                              </View>
                           )}
                        </View>

                        {isTechnician && status === 'pending' && (
                           <View style={styles.modalFooter}>
                              <TouchableOpacity
                                 style={[styles.footerButton, styles.secondaryButton]}
                                 onPress={() => setModalVisible(false)}
                              >
                                 <Text style={styles.secondaryButtonText}>Cancel</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                 style={[styles.footerButton, styles.primaryButton]}
                                 onPress={handleAcceptRequest}
                              >
                                 <Text style={styles.primaryButtonText}>Accept Request</Text>
                              </TouchableOpacity>
                           </View>
                        )}

                        {isTechnician && status === 'assigned' && (
                           <View style={styles.modalFooter}>
                              <TouchableOpacity
                                 style={[styles.footerButton, styles.dangerButton]}
                                 onPress={() => handleStatusUpdate('cancelled')}
                              >
                                 <Text style={styles.dangerButtonText}>Decline</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                 style={[styles.footerButton, styles.primaryButton]}
                                 onPress={() => handleStatusUpdate('completed')}
                              >
                                 <Text style={styles.primaryButtonText}>Complete</Text>
                              </TouchableOpacity>
                           </View>
                        )}

                        {!isTechnician && status === 'completed' && !feedbackFromDB && (
                           <View style={styles.modalFooter}>
                              <TouchableOpacity
                                 style={[styles.footerButton, styles.primaryButton]}
                                 onPress={handleFeedback}
                              >
                                 <Text style={styles.primaryButtonText}>Give Feedback</Text>
                              </TouchableOpacity>
                           </View>
                        )}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            </TouchableWithoutFeedback>
         </Modal>

         {/* Remarks Input Modal */}
         <Modal
            animationType="fade"
            transparent
            visible={showRemarksModal}
            onRequestClose={() => setShowRemarksModal(false)}
         >
            <TouchableWithoutFeedback onPress={() => setShowRemarksModal(false)}>
               <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                     <View style={styles.remarksModalContainer}>
                        <Text style={styles.remarksTitle}>
                           {modalType === 'completed' ? 'Complete Request' : 'Provide Cancellation Reason'}
                        </Text>

                        {modalType === 'completed' && (
                           <TextInput
                              style={styles.remarksInput}
                              placeholder="Enter amount charged (Rs.)"
                              value={amount}
                              onChangeText={setAmount}
                              keyboardType="numeric"
                           />
                        )}

                        <TextInput
                           style={styles.remarksInput}
                           multiline
                           numberOfLines={4}
                           placeholder={
                              modalType === 'completed'
                                 ? 'Add any remarks (optional)'
                                 : 'Enter reason for cancellation *'
                           }
                           value={remarks}
                           onChangeText={setRemarks}
                        />
                        <View style={styles.remarksButtons}>
                           <TouchableOpacity
                              style={[styles.remarksButton, styles.secondaryButton]}
                              onPress={() => {
                                 setShowRemarksModal(false);
                                 setRemarks('');
                              }}
                           >
                              <Text style={styles.secondaryButtonText}>Cancel</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              style={[styles.remarksButton, styles.primaryButton]}
                              onPress={handleSubmitRemarks}
                           >
                              <Text style={styles.primaryButtonText}>Submit</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
         {/* Feedback from client side Modal */}
         <Modal
            animationType="fade"
            transparent
            visible={showFeedbackModal}
            onRequestClose={() => setShowFeedbackModal(false)}
         >
            <TouchableWithoutFeedback onPress={() => setShowFeedbackModal(false)}>
               <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                     <View style={styles.remarksModalContainer}>
                        <Text style={styles.remarksTitle}>Service Feedback</Text>

                        <TextInput
                           style={styles.remarksInput}
                           multiline
                           numberOfLines={4}
                           placeholder={'How was technician service?'}
                           value={feedback}
                           onChangeText={setFeedback}
                        />
                        <View style={styles.remarksButtons}>
                           <TouchableOpacity
                              style={[styles.remarksButton, styles.secondaryButton]}
                              onPress={() => {
                                 setShowFeedbackModal(false);
                                 setFeedback('');
                              }}
                           >
                              <Text style={styles.secondaryButtonText}>Cancel</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              style={[styles.remarksButton, styles.primaryButton]}
                              onPress={handleSubmitFeedback}
                           >
                              <Text style={styles.primaryButtonText}>Submit</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
      </>
   );
};
