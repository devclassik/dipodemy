import { setAuthenticating, setAuthToken } from "@/api/config";
import { authService } from "@/api/services/auth.service";
import { tokenService } from "@/api/services/token.service";
import { Colors } from "@/constants/Colors";
import { isValidEmail } from "@/utills/validator";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const isLoginButtonDisabled = !isValidEmail(email) || !password.trim() || isLoading;

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const creds = await tokenService.getUserCreds();
        if (creds) {
          setEmail(creds.email);
          setPassword(creds.password);
          setRememberMe(true);
        }
      } catch (error) {
      } finally {
        setIsCheckingAuth(false);
      }
    };

    loadStoredCredentials();
  }, []);

  const logout = async () => {
    try {
      await tokenService.clearAll();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Cleared",
        textBody: "Authentication data cleared successfully",
      });
    } catch (error) {
    }
  };

  const onLoginPress = async () => {
    if (!isValidEmail(email)) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Invalid Email address",
        textBody: "Please enter a valid email address.",
      });
      return;
    }

    if (!password.trim()) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Password Required",
        textBody: "Please enter your password.",
      });
      return;
    }

    setIsLoading(true);
    // Set authentication flag to prevent interceptor redirect
    setAuthenticating(true);
    try {
      await AsyncStorage.setItem(
        "user_creds",
        JSON.stringify({ email, password })
      );
      const res = await authService.login(email, password);
      // Handle the response data safely
      const responseData = res.data as any;

      if (responseData?.token) {
        // Use secure token service for better reliability
        const storageSuccess = await tokenService.setToken(responseData.token);

        if (!storageSuccess) {
          throw new Error("Token storage failed");
        }

        // Manually set token in axios headers for immediate use
        setAuthToken(responseData.token);

        // Verify token was stored correctly
        const storedToken = await tokenService.getToken();

        if (!storedToken) {
          throw new Error("Token verification failed");
        }

      } else {
        throw new Error("No authentication token received");
      }

      if (rememberMe) {
        await tokenService.setUserCreds(email, password);
      } else {
        await tokenService.removeUserCreds();
      }

      // Show success message
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "🎉",
        textBody: res.message || "Login successful!",
      });

      // Check if user is verified and navigate accordingly
      if (responseData?.user?.isEmailVerified !== false) {
        router.replace("/(tabs)");
      } else {
        router.navigate("/(auth)/pin");
      }
    } catch (error: any) {

      // Handle specific error types
      let errorMessage = "An error occurred during login.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Login Failed",
        textBody: errorMessage,
      });
    } finally {
      setIsLoading(false);
      // Reset authentication flag
      setAuthenticating(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.themeGreen} />
        <ThemedText style={{ marginTop: 16 }}>Checking authentication...</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
              autoCorrect={false}
              spellCheck={false}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                // Focus password input
              }}
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
              autoCorrect={false}
              spellCheck={false}
              returnKeyType="done"
              onSubmitEditing={onLoginPress}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible((visible) => !visible)}
              disabled={isLoading}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {password.length < 8 && (
            <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
              Passwords be at least 8 characters.
            </ThemedText>
          )}

          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.rememberCheck}
              onPress={() => setRememberMe((remember) => !remember)}
              disabled={isLoading}
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
              disabled={isLoading}
            >
              <ThemedText style={styles.forgotText}>
                Forget password
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
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

          <ThemedText style={styles.footerText}>
            Don't have an Account?{" "}
            <ThemedText
              style={styles.signUp}
              onPress={() => router.navigate("/register")}
            >
              SIGN UP
            </ThemedText>
          </ThemedText>

          {/* Debug buttons - remove these in production */}
          {/* <TouchableOpacity 
                style={styles.debugButton} 
                onPress={logout}
              >
                <ThemedText style={styles.debugText}>Clear Auth Data (Debug)</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.debugButton} 
                onPress={testToken}
              >
                <ThemedText style={styles.debugText}>Test Token Status (Debug)</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.debugButton} 
                onPress={checkStorageOnly}
              >
                <ThemedText style={styles.debugText}>Check Storage Only (Debug)</ThemedText>
              </TouchableOpacity> */}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: Platform.OS === "ios" ? "20%" : "40%",
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
    marginTop: Platform.OS === "ios" ? 30 : 60,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf8e9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  input: {
    flex: 1,
    height: 45,
    color: "#000",
    fontSize: 16,
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
    }),
  },
  inputIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    paddingHorizontal: 4,
    paddingVertical: 8,
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
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 50,
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
  debugButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  debugText: {
    color: "#666",
    fontSize: 12,
  },
});

export default LoginScreen;
