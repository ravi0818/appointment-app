import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeContainer from '@/containers/HomeContainer';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeContainer />
    </SafeAreaView>
  );
};

export default HomeScreen;
