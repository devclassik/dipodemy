import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const LandingScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inner}>
        <ThemedText style={styles.title}>
          Let’s you in
        </ThemedText>

        {/* <TouchableOpacity style={styles.socialButton}>
          <ThemedView style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.iconImage}
            />
          </ThemedView>
          <ThemedText style={styles.socialText}>
            Continue with Google
          </ThemedText>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.socialButton}>
          <ThemedView style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/fb.png")}
              style={styles.iconImage}
            />
          </ThemedView>
          <ThemedText style={styles.socialText}>
            Continue with Facebook
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.orText}>( Or )</ThemedText> */}

        <ThemedView
          style={{
            flex: 1,
            width: "70%",
            alignSelf: "center",
            alignItems: "center",
            marginVertical: 60,
          }}
        >
          <RoundedActionButton
            text="Sign In With your Account"
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
            onPress={() => router.navigate("/login")}
          />
        </ThemedView>

        <ThemedText style={styles.footerText}>
          Don’t have an Account?{" "}
          <ThemedText
            style={styles.signupText}
            onPress={() => router.navigate("/register")}
          >
            SIGN UP
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    lineHeight: 36,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 4,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  icon: {
    marginRight: 12,
  },
  socialText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  orText: {
    textAlign: "center",
    fontWeight: "400",
  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27d86c",
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#27d86c",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
    fontSize: 15,
  },
  footerText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    marginVertical: 30,
  },
  signupText: {
    color: "#f97316",
    fontWeight: "bold",
  },
});
