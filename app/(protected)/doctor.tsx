import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DoctorContainer from '@/containers/DoctorContainer';

const DoctorScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DoctorContainer />
    </SafeAreaView>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({});
