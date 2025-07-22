import { authService } from "@/api/services/auth.service";
import { Colors } from "@/constants/Colors";
import { isValidEmail } from "@/utills/validator";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const isLoginButtonDisabled = !isValidEmail(email);

  const onRegisterPress = async () => {
    if (!isValidEmail(email)) {

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Invalid Email address",
        textBody: "Please enter a valid email address.",
      });
      return;
    }
    if (password !== repeatPassword || password.length <=7) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Password",
        textBody: "Please same password for both field and min of 8 ",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userdata = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password: password,
        password_confirmation: repeatPassword
      }
      const res = await authService.register(userdata);      
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "🎉",
        textBody: res.message,
      });

      if (rememberMe) {
        await AsyncStorage.setItem(
          "user_creds",
          JSON.stringify({ email, password })
        );
      } else {
        await AsyncStorage.removeItem("user_creds");
      }
      router.replace("/pin");
    } catch (error) {
      console.error("Login Error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Login Failed",
        textBody: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }

  }

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
          value={firstName}
          onChangeText={setFirstName}
          editable={!isLoading}
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
          value={lastName}
          onChangeText={setLastName}
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail" size={20} color="#000" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#444"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
          editable={!isLoading}
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
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
          editable={!isLoading}
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
          value={password}
          autoCapitalize="none"
          onChangeText={setPassword}
          editable={!isLoading}
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
          value={repeatPassword}
          autoCapitalize="none"
          onChangeText={setRepeatPassword}
          editable={!isLoading}
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
          text={isLoading ? "Please wait..." : "Sign up"}
          icon={
            isLoading ? (
              <ActivityIndicator size="small" color={colors.themeGreen} />
            ) : (
              <Ionicons
                name="arrow-forward"
                size={24}
                color={colors.themeGreen}
              />
            )
        }
          onPress={onRegisterPress}
          disabled={isLoginButtonDisabled && rememberMe}
        />
      </View>

      {/* <Text style={styles.orText}>Or Continue With</Text> */}

      {/* <View style={styles.socialsRow}>
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
      </View> */}

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
    top: 20
  },
  signUp: {
    color: "#ff9900",
    fontWeight: "bold",
  },
});
