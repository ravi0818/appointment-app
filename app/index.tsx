import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { useAuth } from '@/redux/hooks/useAuth';

const index = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn) router.replace('/home');
  }, [isLoggedIn]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Welcome to Appointments</Text>
        <Text>Book your appointment in 2 minutes</Text>
        <Button onPress={() => router.replace('/home')}>Home</Button>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
