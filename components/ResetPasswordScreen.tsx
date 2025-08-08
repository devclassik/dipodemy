import { authService } from "@/api/services/auth.service";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
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

interface ResetPasswordProps {
  isReset?: boolean;
}

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({
  isReset = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleResetPassword = async () => {
    if (!password || !password_confirmation) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Password Mis match",
        textBody: "Please check your password fields.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await authService.resetPassword(
        password,
        password_confirmation,
        current_password
      );
      if (res.success) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Password Reset Successful",
          textBody: "Your password has been reset successfully.",
        });

        if (isReset) {
          setCurrent_password("");
          setPassword("");
          setPassword_confirmation("");
          router.navigate("/(tabs)/profile");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.message || "Failed to reset password.",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error as any,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Dipodemy</Text>

      <ThemedText style={styles.loginLabel}>
        {isReset ? "Change Password" : "Reset Password"}!
      </ThemedText>

      {isReset && (
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Old Password"
            secureTextEntry={!passwordVisible}
            style={styles.input}
            placeholderTextColor="#444"
            autoCapitalize="none"
            value={current_password}
            onChangeText={setCurrent_password}
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

      )}
      {current_password.length < 8 && (
        <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
          Current passwords should be at least 8 characters.
        </ThemedText>
      )}

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
      {password.length < 8 && (
        <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
          New passwords must be at least 8 characters.
        </ThemedText>
      )}

      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Re-enter Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor="#444"
          autoCapitalize="none"
          value={password_confirmation}
          onChangeText={setPassword_confirmation}
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
      {password_confirmation.length > 0 && password_confirmation !== password && (
        <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
          Passwords must match and be at least 8 characters.
        </ThemedText>
      )}

      <RoundedActionButton
        text={isLoading ? "Please wait..." : "Continue"}
        icon={
          isLoading ? (
            <ActivityIndicator size="small" color={colors.themeGreen} />
          ) : (
            <Ionicons name="arrow-forward" size={24} color={colors.themeGreen} />
          )
        }
        bgColor={colors.themeGreen}
        onPress={handleResetPassword}
        style={{
          flex: 1,
          marginVertical: 40,
          alignItems: "center",
          alignSelf: "center",
          width: "50%",
        }}
        disabled={isLoading || password !== password_confirmation || !password}
      />
    </View>
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

export default ResetPasswordScreen;
