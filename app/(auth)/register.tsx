import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Headline,
  Snackbar,
  RadioButton,
  Card,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "@/services/auth/authService";

const RegisterScreen = () => {
  const router = useRouter();
  const [register] = useRegisterMutation(); // Replace with your actual register mutation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      setShowError(true);
      return;
    }

    try {
      // Call register mutation
      await register({ email, password, role }).unwrap();
      Alert.alert("Success", "Registration successful", [
        { text: "OK", onPress: () => router.push("/login") },
      ]);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.header}>Register</Headline>
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
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Role</Text>
          <View style={styles.radioGroup}>
            <View style={styles.radioContainer}>
              <RadioButton
                value="Patient"
                status={role === "Patient" ? "checked" : "unchecked"}
                onPress={() => setRole("Patient")}
              />
              <Text style={styles.radioText}>Patient</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton
                value="Clinic"
                status={role === "Clinic" ? "checked" : "unchecked"}
                onPress={() => setRole("Clinic")}
              />
              <Text style={styles.radioText}>Clinic</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/login")}
        style={styles.link}
      >
        Go to Login
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
  card: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 8,
  },
});

export default RegisterScreen;