import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RoundedActionButton from "./RoundedActionButton";

export default function PinScreen() {
  const [pin, setPin] = useState<string[]>([]);

  const handleKeyPress = (value: string) => {
    if (pin.length < 4) {
      setPin([...pin, value]);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinDots = () => {
    return Array(4)
      .fill("")
      .map((_, i) => (
        <View key={i} style={styles.pinBox}>
          <Text style={styles.pinText}>
            {pin[i] ? (i === pin.length - 1 ? pin[i] : "•") : ""}
          </Text>
        </View>
      ));
  };

  const renderKeypad = () => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "<"];

    return (
      <View style={styles.keypad}>
        {keys.map((key, index) => (
          <TouchableOpacity
            key={index}
            style={styles.key}
            onPress={() =>
              key === "<" ? handleBackspace() : handleKeyPress(key)
            }
          >
            {key === "<" ? (
              <Ionicons name="backspace-outline" size={24} color="#000" />
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Pin</Text>
      <Text style={styles.subtitle}>
        Add a Pin Number to Make Your Account more Secure
      </Text>

      <View style={styles.pinRow}>{renderPinDots()}</View>


      <RoundedActionButton
        text="Continue"
        disabled={pin.length !== 4}
        icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
        onPress={() => console.log("Sign In pressed", pin.join(""))}
        style={{marginBottom: 20}}
      />

      {renderKeypad()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
    alignItems: "center",
    paddingTop: 20,
  },
  back: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    color: "#555",
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 10,
  },
  pinBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  pinText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
    gap: 10,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    elevation: 1,
  },
  keyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
