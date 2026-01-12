import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        
       <Stack.Screen
          name="screen/splashscreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="screen/(auth)/register"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="screen/(auth)/login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="/"
          options={{ headerShown: false }}
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
