import { authService } from "@/api/services/auth.service";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import CustomModal from "./CustomModal";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const KeyboardPinEntryScreen = () => {
  const [pin, setPin] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const onConfirmOtp = async () => {
    setIsLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem("user_creds");
      if (jsonValue !== null) {
        const { email, password } = JSON.parse(jsonValue);
        const userdata = {
          email: email,
          otp: pin
        }
        const res = await authService.verifyOtp(userdata);
        if (res.data.status === 200) {
          setShowModal(true);
        }
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "🎉",
          textBody: res.message,
        });
      }

    } catch (error) {

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops!",
        textBody: error?.response?.data?.error,
      });

      if (error?.response?.data?.error === undefined || error?.response?.data?.error === "Your email is already verified") {
        router.replace("/(tabs)");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onResendOtp = async () => {
    setIsLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem("user_creds");
      if (jsonValue !== null) {
        const { email, password } = JSON.parse(jsonValue);
        const userdata = {
          email: email
        }
        const res = await authService.resendOtp(userdata);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "🎉",
          textBody: res.message,
        });
      }

    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Login Failed",
        textBody: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Focus the hidden TextInput when user taps the pin boxes
  const handlePress = () => {
    inputRef.current?.focus();
  };

  // Only allow numeric input and max length 4
  const handleChange = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
    }
  };

  // Action on pressing Continue
  const handleContinue = () => {
    // TODO: Add navigation or submit logic here
    onConfirmOtp();
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Verify Email</ThemedText>
      <ThemedText style={styles.subtitle}>
        Input the Pin sent to your email
      </ThemedText>

      {/* Pin boxes container */}
      <TouchableOpacity
        style={styles.pinRow}
        onPress={handlePress}
        activeOpacity={1}
      >
        {[0, 1, 2, 3, 4, 5,].map((i) => (
          <View key={i} style={styles.pinBox}>
            {/* Show dot if pin character exists */}
            <ThemedText style={styles.pinText}>{pin[i] ? "•" : ""}</ThemedText>
          </View>
        ))}

        {/* Hidden input for actual input */}
        <TextInput
          ref={inputRef}
          value={pin}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.hiddenInput}
          // You can add autoFocus here if you want
          autoFocus={true}
        />
      </TouchableOpacity>

      {pin.length <= 5 && (
        <RoundedActionButton
          text={isLoading ? "Please wait..." : "Resend OTP"}
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
          onPress={onResendOtp}
          style={{ backgroundColor: colors.warning }}
        />
      )}

      {/* Show Continue button only when pin is 4 digits */}
      {pin.length === 6 && (
        <View>
          <RoundedActionButton
            disabled={pin.length < 4}
            text={isLoading ? "Please wait..." : "Continue"}
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
            onPress={handleContinue}
          />
        </View>
      )}

      {showModal && (
        <CustomModal
          visible={showModal}
          onClose={handleModalClose}
          lottieSource={require("@/assets/lottie/alert.json")}
          imageSource={require("@/assets/images/avatar.png")}
          caption="Welcome to ADC campus!"
          subText="Your Account is Ready to Use. You will be redirected to the Home Page in a Few Seconds."
          loading={false}
          buttonText="OK"
          onButtonPress={() => {
            router.replace("/(tabs)");
            handleModalClose();
          }}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: "#000", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subtitle: {
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
    fontSize: 14,
  },
  pinRow: {
    flexDirection: "row",
    gap: 10, // gap is supported on newer React Native versions, if not supported use margin
    marginBottom: 30,
  },
  pinBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pinText: { fontSize: 24, color: "#000" },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default KeyboardPinEntryScreen;
