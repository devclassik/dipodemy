// screens/PaystackWebView.tsx
import LoadingIndicator from "@/components/LoadingIndicator";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

export default function PaystackWebView() {
  const { url, reference, pageTitle } = useLocalSearchParams();
  const router = useRouter();

  const handleNavigationChange = (navState: any) => {
    if (navState.url.includes("verify")) {
      router.replace("/(tabs)/course");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof pageTitle === "string" ? pageTitle : "Paystack Payment",
          headerShown: true,
          headerBackTitle: "Back",

        }}
        
      />
      <ThemedView style={{ flex: 1 }}>
        <WebView
          source={{ uri: url as string }}
          onNavigationStateChange={handleNavigationChange}
          startInLoadingState
          renderLoading={() => <LoadingIndicator />}
        />
      </ThemedView>
    </>
  );
}
