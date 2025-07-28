import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DescriptionTruncate = ({ description }) => {
   const [expanded, setExpanded] = useState(false);

   // Get the first line or up to 100 characters as a preview
   const firstLine = description.split('\n')[0].slice(0, 100);

   const isTruncated = description.length > firstLine.length;

   return (
      <View>
         <Text>
            {expanded ? description : firstLine}
            {!expanded && isTruncated ? '...' : ''}
         </Text>
         {isTruncated && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
               <Text style={styles.showMore}>{expanded ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   showMore: {
      color: 'blue',
      marginTop: 4,
   },
});

export default DescriptionTruncate;
