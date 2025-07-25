// screens/PaystackWebView.tsx
import LoadingIndicator from "@/components/LoadingIndicator";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

export default function PaystackWebView() {
  const { url, reference } = useLocalSearchParams();
  const router = useRouter();

  const handleNavigationChange = (navState: any) => {
    if (navState.url.includes("verify")) {
      //   router.replace("/payment-success"); // or goBack() or a toast
      router.replace("/(tabs)/course");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Paystack Payment",
          headerShown: true,
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
