// @ts-nocheck
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { WORDS } from '../../constants';

export const Button = ({
   title = WORDS.BUTTON,
   onPress = () => { },
   buttonStyle,
   textStyle,
   disable = false
}) => (
   <TouchableOpacity
      disabled={disable}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
   >
      <Text
         style={[styles.text, textStyle]}
      >
         {title}
      </Text>
   </TouchableOpacity>
);
