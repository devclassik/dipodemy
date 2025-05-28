import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={styles.logo} />
      <Text style={styles.title}>Dipodemy</Text>

      <Text style={styles.loginLabel}>Login!</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#444" />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
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
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberRow}>
        <TouchableOpacity
          style={styles.rememberCheck}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <MaterialCommunityIcons
            name={rememberMe ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
            size={20}
            color="#27d86c"
          />
          <Text style={styles.rememberText}> Remember Password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forget password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.orText}>Or Continue With</Text>

      <View style={styles.socialsRow}>
        <TouchableOpacity style={styles.socialIcon}>
          <Image source={require("../assets/images/google.png")} style={styles.socialImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Image source={require("../assets/images/fb.png")} style={styles.socialImg} />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already have an Account? <Text style={styles.signUp}>SIGN UP</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: 60,
      backgroundColor: "#fff",
    },
    logo: {
      width: 80,
      height: 80,
      alignSelf: "center",
      marginBottom: 8,
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
    },
    loginLabel: {
      fontSize: 20,
      fontWeight: "bold",
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
    },
    forgotText: {
      color: "#888",
      fontSize: 13,
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
  