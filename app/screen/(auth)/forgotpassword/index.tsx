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

  const handleSend = () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email");
      return;
    }

    Alert.alert("Success", "Password reset link sent to your email");
    console.log("Forgot password email:", email);
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
