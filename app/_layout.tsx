import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Mulish: require('../assets/fonts/Mulish-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName='splash'>
          <Stack.Screen name='splash' options={{ headerShown: false}} />
          <Stack.Screen name='mycourses' options={{ headerShown: false}} />
          <Stack.Screen name='forgotpassword' options={{ headerShown: false}} />
          <Stack.Screen name='landing' options={{ headerShown: false}} />
          <Stack.Screen name='(auth)' options={{ headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='notifications' options={{ headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}
