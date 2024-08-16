import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { saveAuthData } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { useSavePushTokenMutation } from '@/services/userService';
import { isEqual } from '@/utils';
import { loadState } from '@/utils/storageUtils';
import { usePushNotifications } from '@/utils/usePushNotifications';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';

// Ensure correct import

SplashScreen.preventAutoHideAsync();

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Splash screen should handle this
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationThemeProvider value={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </NavigationThemeProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const { expoPushToken } = usePushNotifications();
  const [savePushToken] = useSavePushTokenMutation();

  const retrieveLogin = async () => {
    const authData = await loadState('auth');
    if (authData) {
      dispatch(saveAuthData(authData));
    }
  };

  useEffect(() => {
    retrieveLogin();
  }, []);

  const savePushTokenHandler = async () => {
    try {
      const authData = await loadState('auth');
      if (authData?.user?.pushToken === expoPushToken) return;
      const response = await savePushToken({ pushToken: expoPushToken }).unwrap();
      if (isEqual(response.data?.status, 'success')) {
        authData.user.pushToken = expoPushToken;
        dispatch(saveAuthData(authData));
      }
    } catch (error) {
      console.error('Error saving push token:', error);
    }
  };

  useEffect(() => {
    if (expoPushToken) {
      savePushTokenHandler();
    }
  }, [expoPushToken]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)/doctor" options={{ headerShown: false }} />
    </Stack>
  );
}
