import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider as ReduxProvider } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { store } from "@/redux/store";
import { loadState } from "@/utils/storageUtils";
import { loginSuccess } from "@/redux/slices/auth";
import {
  Provider as PaperProvider,
  MD3LightTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import AuthLayout from "./AuthLayout";
import { useColorScheme } from "react-native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider
        theme={
          useColorScheme() === "dark" ? CombinedDarkTheme : CombinedDefaultTheme
        }
      >
        <RootLayoutNav />
      </PaperProvider>
    </ReduxProvider>
  );
}

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  const retrieveLogin = async () => {
    const authData = await loadState("auth");
    if (authData) {
      dispatch(loginSuccess(authData));
    }
  };

  useEffect(() => {
    retrieveLogin();
  }, []);

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <AuthLayout />
    </NavigationThemeProvider>
  );
}
