import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />
      {/* <Text style={styles.text}>Dipodemy</Text> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40E96A",
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  text: { fontSize: 24, fontWeight: "bold" },
});
