import React, { useState, useEffect, useRef } from 'react';
import {
   Text,
   View,
   Platform,
   ActivityIndicator,
   TextInput,
   FlatList,
   TouchableOpacity,
   Alert,
   Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../../../components';

export const BusinessAddress = ({ navigation }) => {
   const [location, setLocation] = useState({ latitude: 31.451141, longitude: 74.2924791 });
   const [loading, setLoading] = useState(true);
   const [permissionDenied, setPermissionDenied] = useState(false);
   const [address, setAddress] = useState('');
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const searchTimeoutRef = useRef();
   const { width, height } = Dimensions.get('window');

   useEffect(() => {
      loadSavedLocation();
   }, []);

   const loadSavedLocation = async () => {
      try {
         const savedLocation = await AsyncStorage.getItem('businessLocation');
         if (savedLocation) {
            const locationData = JSON.parse(savedLocation);
            setLocation({
               latitude: locationData.coordinates.latitude,
               longitude: locationData.coordinates.longitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
            });
            setAddress(locationData.address);
            setLoading(false);
         } else {
            // If no saved location, proceed with getting current location
            requestLocationPermission();
         }
      } catch (error) {
         console.warn('Error loading saved location:', error);
         requestLocationPermission();
      }
   };

   const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         handlePermissionDenied();
         return;
      }

      let location = await Location.getCurrentPositionAsync({
         mayShowUserSettingsDialog: true,
         accuracy: 1,
      });
      setLocation(location.coords);
      setLoading(false);
      // setGeoAddress(await reverseGeocode(location.coords));
   };

   const handlePermissionDenied = () => {
      setPermissionDenied(true);
      setLoading(false);
      Alert.alert(
         'Location Access Required',
         'Please enable location access to use this feature. You can still search locations manually.',
         [{ text: 'OK', onPress: setDefaultLocation }]
      );
   };

   const setDefaultLocation = () => {
      const defaultLoc = {
         latitude: 31.451141,
         longitude: 74.2924791,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
      };
      updateLocation(defaultLoc);
      setLoading(false);
   };

   const updateLocation = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
      const loc = { latitude, longitude, latitudeDelta, longitudeDelta };
      setLocation(loc);
      fetchAddress(latitude, longitude);
   };

   const fetchAddress = async (lat, lng) => {
      try {
         const resp = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
         );
         const json = await resp.json();
         if (json.results.length) setAddress(json.results[0].formatted_address);
      } catch (e) {
         console.warn(e);
      }
   };

   const debounceSearch = text => {
      setSearchQuery(text);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (text.length < 3) {
         setSearchResults([]);
         return;
      }
      searchTimeoutRef.current = setTimeout(() => performSearch(text), 500);
   };

   const performSearch = async input => {
      try {
         const resp = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
               input
            )}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}&components=country:pk`
         );
         const json = await resp.json();
         setSearchResults(json.predictions || []);
      } catch (e) {
         console.warn(e);
      }
   };

   const selectPlace = async placeId => {
      try {
         const resp = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
         );
         const json = await resp.json();
         if (json.result) {
            const { lat, lng } = json.result.geometry.location;
            const loc = { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 };
            setSearchResults([]);
            setSearchQuery('');
            updateLocation(loc);
         }
      } catch (e) {
         console.warn(e);
      }
   };

   const confirmLocation = async () => {
      try {
         const locationData = {
            coordinates: {
               latitude: location.latitude,
               longitude: location.longitude,
            },
            address: address,
            timestamp: new Date().toISOString(),
         };

         await AsyncStorage.setItem('businessLocation', JSON.stringify(locationData));
         navigation.goBack();
      } catch (error) {
         Alert.alert('Error', 'Failed to save location data');
         console.warn('Error saving location:', error);
      }
   };

   return (
      <View style={styles.container}>
         {permissionDenied && (
            <View style={styles.permissionBanner}>
               <Text style={styles.permissionText}>Location access denied. Search manually.</Text>
            </View>
         )}

         <View style={styles.searchContainer}>
            <TextInput
               style={styles.searchInput}
               placeholder="Search location"
               value={searchQuery}
               onChangeText={debounceSearch}
            />
            {searchResults.length > 0 && (
               <FlatList
                  data={searchResults}
                  style={styles.searchResults}
                  keyExtractor={item => item.place_id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                     <TouchableOpacity style={styles.searchResultItem} onPress={() => selectPlace(item.place_id)}>
                        <Text style={styles.searchResultText}>{item.description}</Text>
                     </TouchableOpacity>
                  )}
               />
            )}
         </View>

         <View className="flex-1 relative h-[100%] w-full flex flex-col  justify-evenly px-2">
            {loading ? (
               <ActivityIndicator size="large" style={styles.loader} />
            ) : (
               <View style={{ flex: 1, backgroundColor: 'lightgrey', height: '100%', width: width }}>
                  <MapView
                     style={{ flex: 1 }}
                     provider={PROVIDER_GOOGLE}
                     region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                     }}
                     showsUserLocation
                     showsMyLocationButton
                  >
                     <Marker
                        coordinate={location}
                        draggable
                        pinColor="blue"
                        focusable
                        accessibilityLiveRegion="assertive"
                        accessibilityHint="Pakistan Location"
                     />
                  </MapView>
               </View>
            )}
         </View>

         <View style={styles.addressContainer}>
            <Text style={styles.addressText} numberOfLines={2}>
               {address || 'Select your business location'}
            </Text>
            <Button
               title="Confirm Location"
               onPress={confirmLocation}
               buttonStyle={styles.confirmButton}
               textStyle={styles.buttonText}
            />
         </View>
      </View>
   );
};
