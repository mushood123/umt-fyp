import { Text, View } from 'react-native';
import { styles } from './styles';
import { SvgAc, SvgDrainage, SvgElectrician, SvgPlumbering } from '../../../../assets';
import { RequestCard } from '../../../../components';
import { firebase as fDB } from '../../../../firebase';
import { database } from '../../../../firebase/database';

export const iconSelector = {
   'Heating and Cooling System': SvgAc,
   Drainage: SvgDrainage,
   Electrical: SvgElectrician,
   Plumbering: SvgPlumbering,
};

export const technicainType = {
   'Heating and Cooling System': 1,
   Drainage: 4,
   Electrical: 2,
   Plumbering: 3,
};

// Get current authenticated user
export const getCurrentUser = () => {
   return fDB.getCurrentFirebaseUser ? fDB.getCurrentFirebaseUser() : null;
};

export const renderRequests = (requestData, setModalVisibility, setModalRequest) => {
   const pendingRequests =
      requestData && Object.values(requestData).filter(req => req?.status === 'pending' || req?.status === 'assigned');

   if (!pendingRequests || pendingRequests.length === 0) {
      return (
         <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pending requests</Text>
         </View>
      );
   }

   return pendingRequests.map(req => (
      <RequestCard
         key={req?.timeStamp}
         Icon={iconSelector[req?.requestDetail]}
         title={req?.requestDetail}
         problemDescription={req?.problemDescription}
         status={req?.status}
         businessName={req?.businessName}
         contactNumber={req?.contactNumber}
         timeSlot={req?.timeSlot}
         date={req?.date}
         onPress={() => {
            setModalVisibility(true);
            setModalRequest(req);
         }}
      />
   ));
};

export const toggleActivityStatus = async () => {
   const user = getCurrentUser();
   if (!user || !user.uid) return false;

   try {
      const ref = database().ref(`users/${user.uid}/userData/status`);
      const snapshot = await ref.once('value');

      if (snapshot.exists()) {
         const currentStatus = snapshot.val();
         const newStatus = currentStatus === 'active' ? 'offline' : 'active';

         await ref.set(newStatus);
         console.log(`Status updated to: ${newStatus}`);
         return newStatus;
      } else {
         // If status is not set, default to 'active'
         await ref.set('active');
         console.log('Status initialized to: active');
         return 'active';
      }
   } catch (error) {
      console.log('Failed to toggle status:', error);
      return false;
   }
};
