import * as React from 'react';
import { Appbar } from 'react-native-paper';

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface CustomAppBarProps {
  props: NativeStackHeaderProps | BottomTabHeaderProps;
}

const CustomAppBar = ({ props }: CustomAppBarProps) => (
  <Appbar.Header
    style={{
      elevation: 4, // Adds shadow for Android
      shadowColor: '#000', // Shadow color for iOS
      shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
      shadowOpacity: 0.1, // Shadow opacity for iOS
      shadowRadius: 4, // Shadow radius for iOS
    }}
  >
    <Appbar.BackAction
      onPress={() => {
        props.navigation.goBack();
      }}
    />
    <Appbar.Content title={''} />
    <Appbar.Action icon="menu" onPress={() => {}} />
  </Appbar.Header>
);

export default CustomAppBar;
