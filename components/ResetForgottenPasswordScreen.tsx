import { authService } from "@/api/services/auth.service";
import { Colors } from "@/constants/Colors";
import { isValidEmail } from "@/utills/validator";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const ResetForgottenPasswordScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { data } = useLocalSearchParams();

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(data as string);
        setEmail(parsed?.email ?? "");
      } catch {
        setEmail(String(data));
      }
    }
  }, [data]);

  const onResetPress = async () => {
    if (!isValidEmail(email)) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Invalid Email",
        textBody: "Please enter a valid email address.",
      });
      return;
    }

    if (password.length < 6 || password !== repeatPassword) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Password Mismatch",
        textBody: "Passwords must match and be at least 6 characters long.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.resetForgotPassword({
        email,
        otp,
        password,
        password_confirmation: repeatPassword,
      });

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "🎉 Success",
        textBody: res.message,
      });

      router.replace("/(auth)/login");
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Reset Failed",
        textBody: "Please confirm your OTP and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disableButton =
    isLoading || !isValidEmail(email) || !otp || password !== repeatPassword;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <ThemedView style={styles.container}>
            <Image source={require("../assets/images/icon.png")} style={styles.logo} />
            <Text style={styles.title}>Dipodemy</Text>

            <ThemedText style={styles.loginLabel}>Reset password!</ThemedText>
            <ThemedText style={styles.subLabel}>Let's get you back in</ThemedText>

            <InputField
              icon="mail"
              placeholder="Email"
              value={email}
              editable={false}
            />
            <InputField
              icon="phone-portrait-outline"
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              editable={!isLoading}
            />
            <PasswordField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              visible={passwordVisible}
              toggleVisible={() => setPasswordVisible((v) => !v)}
              editable={!isLoading}
            />
            <PasswordField
              placeholder="Re-enter Password"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              visible={passwordVisible}
              toggleVisible={() => setPasswordVisible((v) => !v)}
              editable={!isLoading}
            />

            <View style={styles.buttonWrapper}>
              <RoundedActionButton
                text={isLoading ? "Please wait..." : "Reset password"}
                icon={
                  isLoading ? (
                    <ActivityIndicator size="small" color={colors.themeGreen} />
                  ) : (
                    <Ionicons name="arrow-forward" size={24} color={colors.themeGreen} />
                  )
                }
                onPress={onResetPress}
                disabled={disableButton}
              />
            </View>
          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ icon, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <Ionicons name={icon} size={20} color="#000" style={styles.inputIcon} />
    <TextInput style={styles.input} placeholderTextColor="#444" {...props} />
  </View>
);

const PasswordField = ({ visible, toggleVisible, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <Ionicons name="lock-closed" size={20} color="#000" style={styles.inputIcon} />
    <TextInput
      secureTextEntry={!visible}
      style={styles.input}
      placeholderTextColor="#444"
      autoCapitalize="none"
      {...props}
    />
    <TouchableOpacity style={styles.eyeIcon} onPress={toggleVisible}>
      <Ionicons name={visible ? "eye-off" : "eye"} size={20} color="#000" />
    </TouchableOpacity>
  </View>
);

export default ResetForgottenPasswordScreen;

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
  buttonWrapper: {
    flex: 1,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});
