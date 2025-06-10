import RoundedActionButton from "@/components/RoundedActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { default as React, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const ForgetPasswordScreen = () => {
  const [selectedOption, setSelectedOption] = useState<"email" | "sms" | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    console.log("Selected Option:", selectedOption);
    console.log("Entered Value:", inputValue);
    // proceed to next step
    router.replace("/(tabs)");
  };

  const renderInputField = () => {
    if (!selectedOption) return null;

    return (
      <TextInput
        style={styles.input}
        placeholder={
          selectedOption === "email"
            ? "Enter your email"
            : "Enter your phone number"
        }
        keyboardType={
          selectedOption === "email" ? "email-address" : "phone-pad"
        }
        value={inputValue}
        onChangeText={setInputValue}
      />
    );
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#F5F9FF" }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 25, marginLeft: 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Forgot Password</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>
            Select which contact details should we use to Reset Your Password
          </Text>
        </View>

        {/* Email Option */}
        <TouchableOpacity onPress={() => setSelectedOption("email")}>
          <View
            style={[
              styles.optionContainer,
              selectedOption === "email" && styles.optionSelected,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/images/circle.png")}
                style={styles.emailIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.emailTextWrapper}>
              <Text style={styles.viaEmail}>Via Email</Text>
              <Text style={styles.emailText}>example@email.com</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SMS Option */}
        <TouchableOpacity onPress={() => setSelectedOption("sms")}>
          <ThemedView
            style={[
              styles.optionContainer,
              selectedOption === "sms" && styles.optionSelected,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/images/circle.png")}
                style={styles.emailIcon}
              />
            </View>
            <View style={styles.emailTextWrapper}>
              <ThemedText style={styles.viaEmail}>Via SMS</ThemedText>
              <ThemedText style={styles.emailText}>+234 704xxxxxxx</ThemedText>
            </View>
          </ThemedView>
        </TouchableOpacity>

        {/* Conditional Input Field */}
        {renderInputField()}

        {/* Continue Button */}
        <View style={{ alignItems: "center" }}>
          <RoundedActionButton
            text="Continue"
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
            onPress={handleContinue}
            style={{ width: "50%" }}
          />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backArrow: {
    fontSize: 18,
    color: "#202244",
    marginRight: 10,
    marginTop: 29,
  },
  backText: {
    fontSize: 16,
    color: "#202244",
    fontWeight: "600",
    marginTop: 29,
  },
  contactDetails: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  contactText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    color: "#545454",
  },
  optionContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
  },
  optionSelected: {
    borderColor: "#27d86c",
    borderWidth: 2,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  emailIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  emailTextWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  viaEmail: {
    fontWeight: "700",
    fontSize: 12,
    color: "#202244",
    marginBottom: 5,
  },
  emailText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#202244",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ForgetPasswordScreen;
