import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { sentences } from './termAndConditions';
import { loader } from '../../../assets';
import { Subscription } from '../../../components';
import { CLAUSES, WORDS } from '../../../constants';
import { firebase } from '../../../firebase';

export const Package = () => {
   const [user, setUser] = useState(null);
   const [payment, setPayment] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const u = firebase.getCurrentFirebaseUser();
      setUser(u);
   }, []);

   useEffect(() => {
      if (user) {
         setLoading(true);
         firebase.getPaymentData(user.uid, {
            successCB: s => {
               setPayment(s);
               setLoading(false);
            },
            errorCB: e => {
               console.log('Package Error', e);
               setLoading(false);
            },
         });
      }
   }, [user]);

   const usedRequests = payment ? payment.total - payment.remaining : 0;
   const percentage = payment ? (usedRequests / payment.total) * 100 : 0;
   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.subscriptionWrapper}>
            <Subscription title={payment?.name} />
         </View>

         {loading ? (
            <View style={styles.loadingContainer}>
               <LottieView source={loader} autoPlay loop style={styles.lottie} />
               <Text style={styles.loadingText}>{CLAUSES.LOADING_SUBSCRIPTION_DETAILS}...</Text>
            </View>
         ) : (
            <>
               <View style={styles.statusCard}>
                  <Text style={styles.statusLabel}>{WORDS.STATUS}</Text>
                  <Text
                     style={[styles.statusValue, payment?.remaining > 0 ? styles.statusActive : styles.statusExpired]}
                  >
                     {payment?.remaining > 0 ? 'Active' : 'Expired'}
                  </Text>
               </View>

               <View style={styles.cardContainer}>
                  <View style={styles.usageContainer}>
                     <Text style={styles.usageTitle}>{CLAUSES.REQUEST_USAGE}</Text>
                     <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                     </View>
                     <View style={styles.usageDetails}>
                        <Text style={styles.usageText}>
                           {WORDS.USED}: {usedRequests}
                        </Text>
                        <Text style={styles.usageText}>
                           {WORDS.REMAINING}: {payment?.remaining}
                        </Text>
                     </View>
                  </View>

                  <DataTable style={styles.dataContainer}>
                     <DataTable.Row style={styles.row}>
                        <DataTable.Cell>
                           <Text style={styles.cellLabel}>{CLAUSES.TOTAL_REQUESTS}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           <Text style={styles.cellValue}>{payment?.total}</Text>
                        </DataTable.Cell>
                     </DataTable.Row>
                     <DataTable.Row style={styles.row}>
                        <DataTable.Cell>
                           <Text style={styles.cellLabel}>{CLAUSES.USED_REQUESTS}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           <Text style={styles.cellValue}>{usedRequests}</Text>
                        </DataTable.Cell>
                     </DataTable.Row>
                     <DataTable.Row style={styles.row}>
                        <DataTable.Cell>
                           <Text style={styles.cellLabel}>{CLAUSES.REMAINING_REQUESTS}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           <Text style={styles.cellValue}>{payment?.remaining}</Text>
                        </DataTable.Cell>
                     </DataTable.Row>
                     <DataTable.Row style={[styles.row, styles.lastRow]}>
                        <DataTable.Cell>
                           <Text style={styles.cellLabel}>{CLAUSES.REQUEST_COST}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                           <Text style={styles.cellValue}>50 PKR</Text>
                        </DataTable.Cell>
                     </DataTable.Row>
                  </DataTable>
               </View>

               <View style={styles.termsContainer}>
                  <Text style={styles.termsTitle}>{CLAUSES.TERMS_AND_CONDITIONS}</Text>
                  {sentences.map((sentence, index) => (
                     <Text key={index} style={styles.conditions}>
                        • {sentence}
                     </Text>
                  ))}
               </View>
            </>
         )}
      </ScrollView>
   );
};
