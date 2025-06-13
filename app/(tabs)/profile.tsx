import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle} onPress={() => router.back()}>
          Profile
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>John Chidi</Text>
        <Text style={styles.email}>hernandex.redial@gmail.ac.in</Text>

        <View style={styles.optionList}>
          <OptionItem
            icon="credit-card"
            text="Payment Option"
            onPress={() => router.navigate("/(pages)/paymentMethod")}
          />
          <OptionItem icon="notifications" text="Notifications" />
          <OptionItem
            icon="language"
            text="Language"
            rightText="English (US)"
            rightTextColor="#0066cc"
          />
          <OptionItem icon="description" text="Terms & Conditions" />
          <OptionItem
            icon="change-password"
            text="Change Password"
            onPress={() =>
              router.navigate("/(auth)/resetPassword?isReset=true")
            }
          />
          <OptionItem
            icon="logout"
            text="Logout"
            onPress={() => router.replace("../splash")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const OptionItem = ({
  icon,
  text,
  rightText,
  rightTextColor = "#000",
  iconColor = "#333",
  onPress,
}: {
  icon: string;
  text: string;
  rightText?: string;
  rightTextColor?: string;
  iconColor?: string;
  onPress?: () => void;
}) => {
  const getIconComponent = () => {
    switch (icon) {
      case "credit-card":
        return <FontAwesome5 name="credit-card" size={20} color={iconColor} />;
      case "notifications":
        return (
          <Ionicons name="notifications-outline" size={20} color={iconColor} />
        );
      case "language":
        return <Ionicons name="language-outline" size={20} color={iconColor} />;
      case "description":
        return <MaterialIcons name="description" size={20} color={iconColor} />;
      case "change-password":
        return (
          <MaterialIcons name="lock-outline" size={20} color={iconColor} />
        );
      case "logout":
        return (
          <MaterialIcons name="settings-power" size={20} color={iconColor} />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.optionLeft}>
        {getIconComponent()}
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <View style={styles.optionRight}>
        {rightText && (
          <Text style={[styles.rightText, { color: rightTextColor }]}>
            {rightText}
          </Text>
        )}
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f8ff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 120,
    marginTop: 40,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  profileImageContainer: {
    backgroundColor: "#fcd401",
    padding: 4,
    borderRadius: 50,
    position: "relative",
    top: -70,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -20,
  },
  email: {
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
  optionList: {
    width: "100%",
    marginTop: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightText: {
    fontSize: 14,
  },
});

export default ProfileScreen;
