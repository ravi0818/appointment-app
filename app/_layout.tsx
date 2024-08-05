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
import { loginSuccess } from '@/redux/slices/auth';
import { store } from '@/redux/store';
import { loadState } from '@/utils/storageUtils';
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

  const retrieveLogin = async () => {
    const authData = await loadState('auth');
    if (authData) {
      dispatch(loginSuccess(authData));
    }
  };

  useEffect(() => {
    retrieveLogin();
  }, []);

  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const router = useRouter();

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
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
}
