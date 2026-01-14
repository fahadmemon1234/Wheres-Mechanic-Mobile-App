import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [emailError, setEmailError] = useState("");

const handleSend = async () => {
  setEmailError("");
  if (!email.trim()) {
    setEmailError("Email is required");
    return;
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    setEmailError("Enter a valid email");
    return;
  }
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/auth/forgetpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      Alert.alert("Error", result.message || "Something went wrong");
      return;
    }
    Alert.alert("Success", result.message);
    console.log("Encrypted Email:", result.data.email);
    router.push({
      pathname: "../(auth)/verifycode",       
      params: { email: result.data.email },
    });
  } catch (error) {
    console.error("Forget password error:", error);
    Alert.alert("Error", "Unable to connect to server");
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.topHalf}>
          <Image
            source={require("@/assets/logo/wMechanic2.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email to receive reset link
          </Text>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                style={[styles.input, emailError && styles.inputError]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleSend}
              style={[styles.button, isPressed && styles.buttonPressed]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed && styles.buttonTextPressed,
                ]}
              >
                Send Reset Link
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topHalf: {
    flex: 1,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 60,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginTop: -100,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: -50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 6,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#d90429",
  },
  errorText: {
    color: "#d90429",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#e2002b",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#f6d72d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextPressed: {
    color: "#d90429",
  },
});
