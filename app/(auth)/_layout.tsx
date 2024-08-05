import React from 'react';

import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login', headerShown: false, headerTitle: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
