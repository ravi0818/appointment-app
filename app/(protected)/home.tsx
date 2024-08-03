import { logout } from "@/redux/slices/auth";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
      <Button title="Go to Settings" onPress={() => router.push("/settings")} />
    </View>
  );
};

export default HomeScreen;
