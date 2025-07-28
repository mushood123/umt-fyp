import { increment } from '@react-native-firebase/database';
import { database } from '../../firebase/database';

export const getStatusColor = status => {
   if (!status) return '#9E9E9E'; // Default gray

   switch (status.toLowerCase()) {
      case 'pending':
         return '#FFC107'; // Amber
      case 'approved':
         return '#4CAF50'; // Green
      case 'rejected':
         return '#F44336'; // Red
      case 'in progress':
         return '#2196F3'; // Blue
      default:
         return '#9E9E9E'; // Grey
   }
};

export const updateRequestStatus = async (requestId, status, details = {}) => {
   try {
      const updates = {
         [`request/${requestId}/status`]: status,
         [`request/${requestId}/statusDetails`]: {
            ...details,
            updatedAt: new Date().toISOString(),
         },
      };
      await database().ref().update(updates);
      return true;
   } catch (error) {
      console.error('Error updating request status:', error);
      return false;
   }
};
export const cancelRequestByTechnician = async (requestId, userId, details = {}) => {
   try {
      const updates = {
         [`request/${requestId}/status`]: 'cancelled',
         [`payments/${userId}/total`]: increment(1),
         [`payments/${userId}/remaining`]: increment(1),
         [`request/${requestId}/statusDetails`]: {
            ...details,
            updatedAt: new Date().toISOString(),
         },
      };
      await database().ref().update(updates);
      return true;
   } catch (error) {
      console.error('Error updating request status:', error);
      return false;
   }
};
export const addUserFeedback = async (requestId, userId, feedbackText) => {
   try {
      const updates = {
         [`request/${requestId}/feedback`]: {
            from: userId,
            feedback: feedbackText,
            updatedAt: new Date().toISOString(),
         },
      };
      await database().ref().update(updates);
      return true;
   } catch (error) {
      console.error('Error updating request status:', error);
      return false;
   }
};
export const acceptRequest = async (requestId, techInfo = {}) => {
   try {
      const updates = {
         [`request/${requestId}/status`]: 'assigned',
         [`request/${requestId}/technicianDetails`]: {
            ...techInfo,
         },
         [`request/${requestId}/updatedAt`]: new Date().toISOString(),
      };
      await database().ref().update(updates);
      return true;
   } catch (error) {
      console.error('Error updating request status:', error);
      return false;
   }
};
