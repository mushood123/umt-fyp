/* eslint-disable no-console */
// @ts-nocheck
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { firebaseDB } from '../constants/Constants';

const SuperUserID = 'bx7Bbw8OS4QXLp3p5yMDMDBC4Pl1';

export const database = () => firebase.app().database(firebaseDB);

export const userRef = id => {
   const reference = database().ref(`users/${id}`);
   return reference;
};

export const setUser = (id, data, { successCB }) => {
   const date = new Date();
   auth().currentUser?.updateProfile({ displayName: data.businessName });
   // Query 1
   userRef(id)
      .child('userData')
      .set({ ...data, role: 2 })
      .then(() => successCB());

   // Query 2
   database()
      .ref(`payments/${id}`)
      .child(`${date.getMonth()}_${date.getFullYear()}`)
      .set({ payment: {}, total: 3, remaining: 3 });

   // Query 3
   database()
      .ref(`messages/${id}`)
      .child(`${SuperUserID}_Quick-Fix`)
      .push({ message: 'Welcome To the app', id: SuperUserID });
};

export const getUserDataById = (userID, { successCB }) => {
   try {
      userRef(userID)
         .child('userData')
         .once('value', snapshot => successCB(snapshot.val()));
   } catch (error) {
      successCB(null);
   }
};

export const sendMessage = (senderId, receiverId, senderName, payload = { message: '', id: '' }) => {
   // Query 1
   database().ref(`messages/${senderId}`).child(receiverId).push(payload);

   // Query 2
   database()
      .ref(`messages/${receiverId.split('_')[0]}`)
      .child(`${senderId}_${senderName}`)
      .push(payload);
};

export const setTechnicianDetails = (requestId, technicianName, technicianID) => {
   const updates = {
      [`${requestId}/status`]: 'completed',
      [`${requestId}/technicianDetails/technicianID`]: technicianID,
      [`${requestId}/technicianDetails/technicianName`]: technicianName,
   };

   database().ref('request').update(updates);
};

export const getRequest = (userId, requestType, { successCB, errorCB }) => {
   const requestRef = database()
      .ref('request')
      .orderByChild('requestType')
      .equalTo(requestType ?? 'Electrician');
   const successCallback = snapshot => {
      if (snapshot.exists()) {
         // Filter requests that are assigned to this technician
         const requests = Object.entries(snapshot.val()).reduce((acc, [key, request]) => {
            console.log(request.technicianDetails?.technicianId);
            if (request.status === 'pending') {
               acc[key] = { ...request, requestId: key };
            } else if (request.technicianDetails?.technicianId === userId) {
               acc[key] = { ...request, requestId: key };
            }
            return acc;
         }, {});

         successCB(Object.keys(requests).length > 0 ? requests : {});
      } else {
         successCB(null);
      }
   };

   requestRef.on('value', successCallback, error => errorCB(error));
   return () => requestRef.off('value', successCallback);
};

export const setRequest = async (userID, payload = {}) => {
   try {
      if (!payload.requestType || !payload.timeSlot) {
         throw new Error('Invalid request data: requestType and timeSlot are required');
      }

      const date = new Date();
      const paymentRef = database().ref(`payments/${userID}`);
      const userRequestsRef = database().ref(`users/${userID}/requestsCreated`);

      // Fetch payment and user requests data
      const paymentSnapshot = await paymentRef.once('value');
      const userRequestsSnapshot = await userRequestsRef.once('value');

      // Check if a request with the same requestType and timeSlot already exists
      let requestAlreadyExists = false;
      if (userRequestsSnapshot.exists()) {
         userRequestsSnapshot.forEach(childSnapshot => {
            const existingRequest = childSnapshot.val();
            if (
               existingRequest?.requestType === payload?.requestType &&
               existingRequest?.timeSlot === payload?.timeSlot
            ) {
               requestAlreadyExists = true;
            }
         });
      }

      // if (requestAlreadyExists) {
      //    throw new Error('A request with the same service and time slot already exists');
      // }

      if (!paymentSnapshot.exists() || paymentSnapshot.val().remaining <= 0) {
         throw new Error('No remaining service requests available in your package');
      }

      // Update payment using a transaction to decrement remaining count atomically
      const paymentUpdateRef = database().ref(`payments/${userID}/remaining`);
      const transactionResult = await paymentUpdateRef.transaction(currentRemaining => {
         if (currentRemaining > 0) {
            return currentRemaining - 1;
         }
         // Abort if no remaining payments
      });

      // If transaction failed (e.g., remaining was 0), do not create the request
      // if (!transactionResult.committed) {
      //    console.log('Payment update failed: no remaining payments.');
      //    return;
      // }

      // Create the request in both global request and user's requestsCreated paths atomically
      const requestRef = database().ref('request');
      const newKey = requestRef.push().key;
      const updates = {
         [`request/${newKey}`]: payload,
         [`users/${userID}/requestsCreated/${newKey}`]: payload,
      };
      await database().ref().update(updates);

      console.log('✅ Request set successfully.');
      return true;
   } catch (error) {
      throw error; // Propagate error to be handled by UI
   }
};

export const getUserRequests = (userId, { successCB, errorCB }) => {
   const requestRef = database().ref('request');
   requestRef
      .orderByChild('createdBy')
      .equalTo(userId)
      .on('value', snapshot => {
         if (snapshot.exists()) {
            const requests = Object.entries(snapshot.val()).reduce((acc, [key, request]) => {
               acc[key] = { ...request, requestId: key };
               return acc;
            }, {});
            successCB(requests);
         } else {
            errorCB('error fetching user requests');
         }
      });
};

export const getMessagesList = (id, { successCB }) => {
   database()
      .ref(`messages/${id}`)
      .on('value', snapshot => successCB(snapshot.val()));
};

export const getMessagesListCloseConnection = (id, CB) => {
   database().ref(`messages/${id}`).off('value', CB);
};

export const getChatMessages = (id, senderKey, { successCB }) => {
   database()
      .ref(`messages/${id}/${senderKey}`)
      .on('value', snapshot => successCB(snapshot.val()));
};

export const getChatMessagesCloseConnection = (id, senderKey, CB) => {
   database().ref(`messages/${id}/${senderKey}`).off('value', CB);
};

export const getPaymentData = (id, { successCB, errorCB }) => {
   const date = new Date();
   const path = `payments/${id}`;
   const ref = database().ref(path);

   // Set up the real-time listener
   ref.on(
      'value',
      snapshot => {
         const data = snapshot.val();
         successCB(data); // Call the success callback with the updated data
      },
      error => {
         console.error('Error listening to data:', error);
         errorCB(error); // Call the error callback if something goes wrong
      }
   );
};

export const offUserRequests = () => {
   const requestRef = database().ref('request');
   requestRef.off();
};
