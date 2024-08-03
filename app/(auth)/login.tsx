import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Headline, Snackbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/services/auth/authService";
import { loginSuccess } from "@/redux/slices/auth";
import { useAuth } from "@/redux/hooks/useAuth";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login] = useLoginMutation();
  const isLoggedIn = useAuth();

  // Local state for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) router.push("/home");
  }, [isLoggedIn]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      setShowError(true);
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(loginSuccess({ token: response.token, user: "Test" }));
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.header}>Login</Headline>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/register")}
        style={styles.link}
      >
        Go to Register
      </Button>

      {/* Snackbar for error messages */}
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        action={{
          label: "Dismiss",
          onPress: () => setShowError(false),
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  link: {
    marginTop: 8,
    alignSelf: "center",
  },
});

export default LoginScreen;
