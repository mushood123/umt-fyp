import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const SvgPackage = ({ size = '50px', color = '#888' }) => (
   <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path d="M92 25v57L59 99 9 82l1-57 49 11z" fill="#222" stroke={color} />
      <Path d="M10 25L1 10l37-6 9 14 6-15 45 5-6 17-33 11z" fill={color} stroke="#222" strokeWidth={1} />
      <Path d="M10 25l37-7 45 7-33 11z" fill="#333" stroke="#222" strokeWidth={1} />
      <Path d="M59 38v59" fill="none" stroke="#444" strokeWidth={1.5} />
      <Path d="M1 41l9-16 49 11 33-11 7 17-33 13-7-19-8 20z" fill="#666" stroke="none" />
   </Svg>
);
