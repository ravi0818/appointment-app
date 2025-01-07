import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

import { Tabs } from 'expo-router';

import CustomAppBar from '@/components/shared/CustomAppBar';
import { useRole } from '@/redux/hooks/useRole';
import { isEqual } from '@/utils';

const ProtectedLayout = () => {
  const role = useRole();

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          // header: (props) => <CustomAppBar props={props} />,
          tabBarIcon: ({ focused, color, size }) => <Icon source="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => <Icon source="calendar" size={size} color={color} />,
          tabBarButton: isEqual(role, 'patient') ? undefined : () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => <Icon source="account" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
