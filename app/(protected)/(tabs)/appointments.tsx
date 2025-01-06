import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppointmentsContainer from '@/containers/AppointmentsContainer';

const AppointmentScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppointmentsContainer />
    </SafeAreaView>
  );
};

export default AppointmentScreen;
