import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

const AuthLayout = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    if (isLoggedIn) {
      setInitialRoute("(protected)/home");
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return (
    <Stack initialRouteName={initialRoute}>
      <Stack.Screen
        name="(auth)/login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen name="(protected)" />
    </Stack>
  );
};

export default AuthLayout;
