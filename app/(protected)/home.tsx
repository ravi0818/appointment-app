import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { useRouter } from 'expo-router';

import { logout } from '@/redux/slices/auth';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button title="Logout" onPress={() => dispatch(logout())} />
        <Button title="Go to Settings" onPress={() => router.push('/profile')} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
