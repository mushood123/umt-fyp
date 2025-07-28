import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const SvgProfile = ({ size = '50px' }) => (
   <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Circle cx="50" cy="35" r="20" fill="#888" />
      <Path d="M50 60c-18 0-32 8-32 18v7h64v-7c0-10-14-18-32-18z" fill="#222" />
      <Circle cx="50" cy="35" r="16" fill="#fff" opacity={0.2} />
      <Path d="M50 48c-7 0-13-6-13-13s6-13 13-13 13 6 13 13-6 13-13 13z" fill="#fff" opacity={0.1} />
   </Svg>
);
