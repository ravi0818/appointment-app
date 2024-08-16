import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ClinicProfileContainer from '@/containers/ClinicProfileConatiner';
import PatientProfileContainer from '@/containers/PatientProfileContainer';
import { useAppSelector } from '@/redux/hooks';

const ProfileScreen = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {user?.role === 'Patient' ? <PatientProfileContainer /> : <ClinicProfileContainer />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
