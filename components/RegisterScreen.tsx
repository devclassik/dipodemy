import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Dipodemy</Text>

      <ThemedText style={styles.loginLabel}>Getting Started!</ThemedText>
      <ThemedText style={styles.subLabel}>
        Create an Account to Continue your all Courses
      </ThemedText>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="person"
          size={20}
          color="#000"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="First Name"
          style={styles.input}
          placeholderTextColor="#444"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="person"
          size={20}
          color="#000"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          placeholderTextColor="#444"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail" size={20} color="#000" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#444"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="phone-portrait-outline"
          size={20}
          color="#000"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          placeholderTextColor="#444"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#000"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor="#444"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#000"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Re-enter Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor="#444"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberRow}>
        <TouchableOpacity
          style={styles.rememberCheck}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <MaterialCommunityIcons
            name={
              rememberMe
                ? "checkbox-marked-circle"
                : "checkbox-blank-circle-outline"
            }
            size={20}
            color="#27d86c"
          />
          <ThemedText style={styles.rememberText}>Agree to Terms & Condition</ThemedText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          width: "70%",
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <RoundedActionButton
          text="Sign Up"
          icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
          onPress={() => router.navigate("/pin")}
        />
      </View>

      <Text style={styles.orText}>Or Continue With</Text>

      <View style={styles.socialsRow}>
        <TouchableOpacity style={styles.socialIcon}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.socialImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Image
            source={require("../assets/images/fb.png")}
            style={styles.socialImg}
          />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.footerText}>
        Already have an Account?{" "}
        <ThemedText style={styles.signUp} onPress={() => router.navigate('/(auth)/login')}>
          SIGN IN
        </ThemedText>
      </ThemedText>
    </ThemedView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    minHeight: 400,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 2,
    marginTop: "10%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  loginLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a2a72",
    marginTop: 60,
  },
  subLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2a2a72",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf8e9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 45,
    color: "#000",
  },
  inputIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 6,
    color: "#333",
    fontWeight: "bold",
  },
  signInButton: {
    flexDirection: "row",
    backgroundColor: "#27d86c",
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  socialsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  socialImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  footerText: {
    textAlign: "center",
    color: "#444",
    fontSize: 13,
  },
  signUp: {
    color: "#ff9900",
    fontWeight: "bold",
  },
});
