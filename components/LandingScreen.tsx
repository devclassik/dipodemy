import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import * as Application from "expo-application";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const LandingScreen = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUrl, setUpdateUrl] = useState(
    "https://play.google.com/store/apps/details?id=com.yourapp"
  );

  console.log("App Version:", Application.nativeApplicationVersion);
  console.log("Build Version:", Application.nativeBuildVersion);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkAppVersion();
    }
  }, [isFocused]);

  const checkAppVersion = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${API_ENDPOINTS.VERSION.APP_VERSION}`
      );

      const data = response.data as {
        latestVersion: string;
        downloadUrl?: string;
        forceUpdate: boolean;
      };
      const latest = data.latestVersion;
      const current = Application.nativeApplicationVersion ?? "2.33.21";

      // Define isNewerVersion if not already defined
      const isNewerVersion = (latest: string, current: string) => {
        const latestParts = latest.split(".").map(Number);
        const currentParts = current.split(".").map(Number);

        for (let i = 0; i < latestParts.length; i++) {
          if (latestParts[i] > (currentParts[i] || 0)) return true;
          if (latestParts[i] < (currentParts[i] || 0)) return false;
        }
        return false;
      };

      if (isNewerVersion(latest, current)) {
        if (data?.downloadUrl) setUpdateUrl(data.downloadUrl);
        setShowUpdateModal(true);
      }
    } catch (error) {
      console.log("Version check failed:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.image}
        />
      </ThemedView>
      <ThemedView style={styles.inner}>
        <ThemedText style={styles.title}>Let’s you in</ThemedText>

        {/* <TouchableOpacity style={styles.socialButton}>
          <ThemedView style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.iconImage}
            />
          </ThemedView>
          <ThemedText style={styles.socialText}>
            Continue with Google
          </ThemedText>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.socialButton}>
          <ThemedView style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/fb.png")}
              style={styles.iconImage}
            />
          </ThemedView>
          <ThemedText style={styles.socialText}>
            Continue with Facebook
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.orText}>( Or )</ThemedText> */}

        <ThemedView
          style={{
            flex: 1,
            width: "90%",
            alignSelf: "center",
            alignItems: "center",
            marginVertical: 60,
          }}
        >
          <RoundedActionButton
            text="Sign In With your Account"
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
            onPress={() => router.navigate("/login")}
          />
        </ThemedView>

        <ThemedText style={styles.footerText}>
          Don’t have an account?{" "}
          <ThemedText
            style={styles.signupText}
            onPress={() => router.navigate("/register")}
          >
            SIGN UP
          </ThemedText>
        </ThemedText>
      </ThemedView>
      <Modal visible={showUpdateModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>Update Available</Text>
            <Text style={styles.message}>
              A new version of the app is available. Please update to continue.
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.dark.green }]}
              onPress={() => Linking.openURL(updateUrl)}
            >
              <Text style={styles.buttonText}>Download Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    lineHeight: 36,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 4,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  icon: {
    marginRight: 12,
  },
  socialText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  orText: {
    textAlign: "center",
    fontWeight: "400",
  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27d86c",
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#27d86c",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
    fontSize: 15,
  },
  footerText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    marginVertical: 30,
  },
  signupText: {
    color: "#f97316",
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  titleModal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    // borderRadius: "100%",
    marginHorizontal: 120,
    resizeMode: "contain",
  },
});
