import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

const handleLogin = async () => {
  setEmailError("");
  setPasswordError("");

  let isValid = true;

  if (!email.trim()) {
    setEmailError("Email is required.");
    isValid = false;
  } else if (!EMAIL_REGEX.test(email.trim())) {
    setEmailError("Please enter a valid email address.");
    isValid = false;
  }

  if (!password) {
    setPasswordError("Password is required.");
    isValid = false;
  } else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters.");
    isValid = false;
  }

  if (!isValid) return;
debugger;
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          rememberMe: rememberMe,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Login failed");
      return;
    }

    console.log("TOKEN:", result.token);

    router.push("/(drawer)/(tabs)/home");

  } catch (error) {
    console.error(error);
    alert("Server not reachable");
  }
};

  const handleGoogleLogin = () => console.log("Google login");
  const handleFacebookLogin = () => console.log("Facebook login");
  const handleNavigateToRegister = () => {
    router.push("/screen/(auth)/register");
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
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Don't have an account?{" "}
            <Text style={styles.link} onPress={handleNavigateToRegister}>
              Create One
            </Text>
          </Text>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.card}>
            {/* Email Input with Error */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
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

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                style={[styles.input, passwordError && styles.inputError]}
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
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            
            <View style={styles.rememberContainer}>
              <TouchableWithoutFeedback
                onPress={() => setRememberMe(!rememberMe)}
              >
                <FontAwesome
                  name={rememberMe ? "check-square-o" : "square-o"}
                  size={20}
                  color={rememberMe ? "#e2002b" : "gray"}
                />
              </TouchableWithoutFeedback>

              <Text style={styles.rememberText}>Keep me signed in</Text>
            </View>

            
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleLogin}
              style={[styles.button, isPressed && styles.buttonPressed]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed && styles.buttonTextPressed,
                ]}
              >
                Sign In
              </Text>
            </Pressable>

            
            <Text style={styles.orText}>Or sign in using</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#db4a39" }]}
                onPress={handleGoogleLogin}
              >
                <FontAwesome name="google" size={20} color="white" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
                onPress={handleFacebookLogin}
              >
                <FontAwesome name="facebook-f" size={20} color="white" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={() => router.push("/screen/(auth)/forgotpassword")}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
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
    position: "relative",
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
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
  link: {
    color: "#f0a500",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#d90429",
  },
  errorText: {
    color: "#d90429",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    marginBottom: -10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#e2002b",
    marginBottom: 20,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#f6d72d",
    borderWidth: 1,
    borderColor: "#f6d72d",
  },
  buttonTextPressed: {
    color: "#d90429",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
  },
  forgotText: {
    color: "#e2002b",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});