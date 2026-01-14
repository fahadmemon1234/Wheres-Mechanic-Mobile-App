import React, { useRef, useState } from "react";
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
    View,
} from "react-native";

const CODE_LENGTH = 6;

export default function VerifyCodeScreen() {
  const [code, setCode] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number): void => {
    const newCode = [...code];
    newCode[index] = text.replace(/[^0-9]/g, "");
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    const otp = code.join("");
    if (otp.length < CODE_LENGTH) {
      Alert.alert("Error", "Please enter the complete code");
      return;
    }
    Alert.alert("Success", "Code verified successfully");
    console.log("Entered OTP:", otp);
  };

  const handleKeyPress = (
  e: any,
  index: number
): void => {
  if (e.nativeEvent.key === "Backspace") {
    if (code[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Top Section */}
        <View style={styles.topHalf}>
           <Image
                      source={require("@/assets/logo/wMechanic2.png")}
                      style={styles.logo}
                    />
          <Text style={styles.title}>Verify</Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomHalf}>
          <View style={styles.card}>
            <Text style={styles.subtitle}>
              Your code was sent to you via email
            </Text>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                   ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {/* Verify Button */}
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleVerify}
              style={[styles.button, isPressed && styles.buttonPressed]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isPressed && styles.buttonTextPressed,
                ]}
              >
                Verify
              </Text>
            </Pressable>

            {/* Resend */}
            <Text style={styles.resendText}>
              Didn’t receive code?
              <Text style={styles.resendLink}> Request again</Text>
            </Text>
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
    alignItems: "center",
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
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#e2002b",
    padding: 15,
    borderRadius: 8,
    width: "100%",
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
  resendText: {
    marginTop: 15,
    fontSize: 13,
    color: "#666",
  },
  resendLink: {
    color: "#e2002b",
    fontWeight: "bold",
  },
});

