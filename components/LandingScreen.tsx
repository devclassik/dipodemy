
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoundedActionButton from "./RoundedActionButton";

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Let’s you in</Text>

        <TouchableOpacity style={styles.socialButton}>
        <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.iconImage}
            />
          </View>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/fb.png")}
              style={styles.iconImage}
            />
          </View>
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>( Or )</Text>

        <View
          style={{
            flex: 1,
            width: "70%",
            alignSelf: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <RoundedActionButton
            text="Sign In With your Account"
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
            bgColor="#27d86c"
            onPress={() => router.push('/login')}
          />
        </View>

        <Text style={styles.footerText}>
          Don’t have an Account?{" "}
          <Text
            style={styles.signupText}
            onPress={() => console.log("pressed")}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 30,
    color: "#111",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff", // Optional background
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 4,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#444",
    fontWeight: "bold",
    paddingHorizontal: 20
  },
  orText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
    fontWeight: "400"
  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27d86c",
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 20,
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
    color: "#555",
    fontWeight:"bold",
    marginBottom: 20,
    marginTop: 10
  },
  signupText: {
    color: "#f97316",
    fontWeight: "bold",
  },
});
