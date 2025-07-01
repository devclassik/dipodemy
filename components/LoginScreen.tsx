import { authService } from "@/api/services/auth.service";
import { Colors } from "@/constants/Colors";
import { isValidEmail } from "@/utills/validator";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const isLoginButtonDisabled = !isValidEmail(email);

  useEffect(() => {
    (async () => {
      const tokCred = await AsyncStorage.getItem("auth_token");
      if (tokCred) {
        router.replace("/(tabs)");
        return;
      }

      const credsJson = await AsyncStorage.getItem("user_creds");
      if (credsJson) {
        const creds = JSON.parse(credsJson);
        setEmail(creds.email);
        setPassword(creds.password);
        setRememberMe(true);
      }
    })();
  }, []);

  const onLoginPress = async () => {
    if (!isValidEmail(email)) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Invalid Email address",
        textBody: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "🎉",
        textBody: res.message,
      });

      await AsyncStorage.setItem("auth_token", res.data.token);
      if (rememberMe) {
        await AsyncStorage.setItem(
          "user_creds",
          JSON.stringify({ email, password })
        );
      } else {
        await AsyncStorage.removeItem("user_creds");
      }
      router.replace("/(tabs)");
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
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Dipodemy</Text>

      <ThemedText style={styles.loginLabel}>Login!</ThemedText>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
          value
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#444"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor="#444"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible((visible) => !visible)}
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
          onPress={() => setRememberMe((remember) => !remember)}
        >
          <MaterialCommunityIcons
            name={
              rememberMe
                ? "checkbox-marked-circle"
                : "checkbox-blank-circle-outline"
            }
            size={20}
            color={colors.themeGreen}
          />
          <ThemedText style={styles.rememberText}>
            {" "}
            Remember Password
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.navigate("/(auth)/forgetPassword")}
        >
          <ThemedText style={styles.forgotText}>Forget password</ThemedText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          width: "10%",
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 50,
        }}
      >
        <RoundedActionButton
          text={isLoading ? "Logging in..." : "Sign In"}
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
          bgColor={colors.themeGreen}
          onPress={onLoginPress}
          disabled={isLoginButtonDisabled}
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
        <ThemedText
          style={styles.signUp}
          onPress={() => router.navigate("/register")}
        >
          SIGN UP
        </ThemedText>
      </ThemedText>
    </ThemedView>
  );
};

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
    marginBottom: 8,
    marginTop: "40%",
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
    marginTop: 60,
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

export default LoginScreen;
