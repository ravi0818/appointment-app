import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { useRouter } from 'expo-router';

import { logout } from '@/redux/slices/auth';
import { usePushNotifications } from '@/utils/usePushNotifications';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sendNotification } = usePushNotifications();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Home Screen</Text>

        <Button mode="contained" onPress={() => dispatch(logout())}>
          Logout
        </Button>
        <Button mode="contained" onPress={() => router.push('/profile')}>
          Go to Profile
        </Button>
        <Button mode="contained" onPress={sendNotification}>
          Send Notification
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
