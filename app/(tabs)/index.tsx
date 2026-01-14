import React, { useState } from "react";
import VerifyCodeScreen from "../screen/(auth)/verifycode";
import SplashScreen from "../screen/splashscreen";

export default function HomeScreen() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  return isSplashDone ? (
    <VerifyCodeScreen />
  ) : (
    <SplashScreen onSplashDone={() => setIsSplashDone(true)} />
  );
}
