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
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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
  const [isModalVisible, setModalVisible] = useState(false);


  const isLoginButtonDisabled = !isValidEmail(email);

  const toggleModal = () => setModalVisible(!isModalVisible);


  const onRegisterPress = async () => {
    if (!isValidEmail(email)) {

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Invalid Email address",
        textBody: "Please enter a valid email address.",
      });
      return;
    }
    if (password !== repeatPassword || password.length <= 7) {
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
    } catch (error: any) {
      console.error("Login Error:", error);
      console.error("oop:", error.response.data);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops!",
        textBody: error?.response?.data?.errors?.email || error?.response?.data?.errors?.phone,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
            {password.length < 8 && (
              <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
                Passwords must be at least 8 characters.
              </ThemedText>
            )}
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
                onPress={() => setPasswordVisible(!!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            {repeatPassword.length > 0 && repeatPassword !== password && (
              <ThemedText style={{ color: "red", fontSize: 10, marginTop: -10 }}>
                Passwords must match and be at least 8 characters.
              </ThemedText>
            )}

            <View style={styles.rememberRow}>
              <TouchableOpacity
                style={styles.rememberCheck}
                onPress={toggleModal}
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
                <ThemedText style={styles.rememberText}>Agree to Terms & Condition</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
              <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                  <ScrollView>
                    <ThemedText style={[styles.modalTitle, {color: colors.textDim}]}>
                      Terms and Conditions
                    </ThemedText>
                    <ThemedText style={styles.modalContent}>
                      Here are your terms and conditions... (long text here)
                    </ThemedText>
                  </ScrollView>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.acceptBtn, {backgroundColor: colors.themeGreen}]}
                      onPress={() => {
                        setRememberMe(true);
                        toggleModal();
                      }}
                    >
                      <ThemedText style={[{color: colors.white}]}>Accept</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.rejectBtn, {backgroundColor: colors.danger}]}
                      onPress={() => {
                        setRememberMe(false);
                        toggleModal();
                      }}
                    >
                      <ThemedText style={[{color: colors.white}]}>Decline</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>


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
                disabled={isLoginButtonDisabled || !rememberMe}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    maxHeight: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalContent: { fontSize: 14, color: "#555" },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 5, marginTop: 15 },
  acceptBtn: {padding: 10, borderRadius: 8 },
  rejectBtn: {padding: 10, borderRadius: 8 },
});
