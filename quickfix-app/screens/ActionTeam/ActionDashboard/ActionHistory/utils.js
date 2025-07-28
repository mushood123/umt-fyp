import { Text, View } from 'react-native';
import { styles } from './styles';
import { SvgAc, SvgDrainage, SvgElectrician, SvgPlumbering } from '../../../../assets';
import { RequestCard } from '../../../../components';

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

export const renderRequests = (requestData, setModalVisibility, setModalRequest) => {
   const pendingRequests =
      requestData && Object.values(requestData).filter(req => req?.status != 'assigned' && req?.status != 'pending');
   if (!pendingRequests || pendingRequests.length === 0) {
      return (
         <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Requests History</Text>
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
         onPress={() => {
            setModalVisibility(true);
            setModalRequest(req);
         }}
      />
   ));
};
