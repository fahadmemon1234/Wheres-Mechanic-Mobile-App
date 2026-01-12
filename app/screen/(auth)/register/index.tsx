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
  View,
} from "react-native";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPressed, setIsPressed] = useState(false);


  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;


    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");


    if (!name.trim()) {
      setNameError("Full Name is required.");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters.");
      isValid = false;
    }

    
    else if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    
    else if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        "Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char."
      );
      isValid = false;
    }

  
    else if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Registration successful! Data:", { name, email, password });
    } else {
      console.log("Validation failed. Cannot register.");
    }
  };

  const handleNavigateToLogin = () => {
    router.push("/screen/(auth)/login");
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
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={handleNavigateToLogin}>
              Sign In
            </Text>
          </Text>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.card}>
           
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setNameError("");
                }}
                style={[styles.input, nameError && styles.inputError]}
              />
              {nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
            </View>

            
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

           
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError("");
                }}
                style={[styles.input, confirmPasswordError && styles.inputError]}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={handleRegister}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[styles.button, isPressed && styles.buttonPressed]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed && styles.buttonTextPressed,
                ]}
              >
                Sign Up
              </Text>
            </Pressable>

            <Text style={styles.orText}>Or sign up using</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#db4a39" }]}
              >
                <FontAwesome name="google" size={20} color="white" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
              >
                <FontAwesome name="facebook-f" size={20} color="white" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 20,
  },
  link: {
    color: "#f0a500",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20, 
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
    position: "absolute",
    bottom: -18,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
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
});