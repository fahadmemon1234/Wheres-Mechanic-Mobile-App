import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
  TouchableOpacity,
  View,
} from "react-native";

export default function NewPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleReset = async () => {
  setError("");
  if (!password || !confirmPassword) {
    setError("Both fields are required");
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/auth/NewPass`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Password: password,
        ConfirmPassword: confirmPassword,
        Email: email, 
      }),
    });
    const data = await response.json();
    if (data.status === true) {
    Alert.alert("Success", data.message);
       router.push({
            pathname: "../(auth)/login",       
          });
    } else {
      setError(data.Message || "Failed to reset password");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
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
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password below
          </Text>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.card}>

            {/* Password */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  style={[styles.input, error && styles.inputError]}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError("");
                  }}
                  style={[styles.input, error && styles.inputError]}
                  secureTextEntry={!showConfirmPassword}
                />

                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <FontAwesome
                    name={showConfirmPassword ? "eye-slash" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            {/* Button */}
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleReset}
              style={[styles.button, isPressed && styles.buttonPressed]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed && styles.buttonTextPressed,
                ]}
              >
                Reset Password
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
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    paddingRight: 45, // 👁️ icon space
    fontSize: 16,
  },
  inputError: {
    borderColor: "#d90429",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
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
