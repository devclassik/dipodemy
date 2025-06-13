import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import CustomModal from "./CustomModal";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const KeyboardPinEntryScreen = () => {
  const [pin, setPin] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Focus the hidden TextInput when user taps the pin boxes
  const handlePress = () => {
    inputRef.current?.focus();
  };

  // Only allow numeric input and max length 4
  const handleChange = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
    }
  };

  // Action on pressing Continue
  const handleContinue = () => {
    console.log("PIN entered:", pin);
    // TODO: Add navigation or submit logic here
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Create New Pin</ThemedText>
      <ThemedText style={styles.subtitle}>
        Add a Pin Number to Make Your Account more Secure
      </ThemedText>

      {/* Pin boxes container */}
      <TouchableOpacity
        style={styles.pinRow}
        onPress={handlePress}
        activeOpacity={1}
      >
        {[0, 1, 2, 3].map((i) => (
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
          maxLength={4}
          style={styles.hiddenInput}
          // You can add autoFocus here if you want
          autoFocus={true}
        />
      </TouchableOpacity>

      {/* Show Continue button only when pin is 4 digits */}
      {pin.length === 4 && (
        <View>
          <RoundedActionButton
            disabled={pin.length < 4}
            text="Continue"
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
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
          caption="Here is your caption text!"
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
