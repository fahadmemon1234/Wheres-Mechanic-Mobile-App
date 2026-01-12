import React, { useState } from "react";
import LoginScreen from "../screen/(auth)/login";
import SplashScreen from "../screen/splashscreen";

export default function HomeScreen() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  return isSplashDone ? (
    <LoginScreen />
  ) : (
    <SplashScreen onSplashDone={() => setIsSplashDone(true)} />
  );
}
