// @ts-nocheck
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const Input = ({
   title,
   style,
   secureTextEntry,
   keyboardType = 'default',
   isValid = false,
   handleOnChangeText,
   value,
   disable,
   onPress
}) => {
   const [showPassword, setShowPassword] = useState(false);
   
   // Determine if this is a password field
   const isPasswordField = secureTextEntry;
   
   // Toggle password visibility
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };
   
   // Determine the actual secureTextEntry value
   const actualSecureTextEntry = isPasswordField ? !showPassword : secureTextEntry;

   return (
      <View
         style={{
            ...isValid ? styles.emptyContainer : styles.container,
            ...style,
         }}
      >
         <View style={styles.inputContainer}>
            <TextInput
               editable={!disable}
               value={value}
               placeholderTextColor="#294f8e90"
               style={styles.textInput}
               placeholder={title}
               secureTextEntry={actualSecureTextEntry}
               keyboardType={keyboardType}
               onChangeText={handleOnChangeText}
               onPress={onPress}
            />
            {isPasswordField && (
               <TouchableOpacity 
                  onPress={togglePasswordVisibility}
                  style={styles.passwordToggle}
               >
                  <Text style={styles.passwordToggleText}>
                     {showPassword ? 'Hide' : 'Show'}
                  </Text>
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};
