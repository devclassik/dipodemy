import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HelloWave } from "./HelloWave";
import { ThemedView } from "./ThemedView";

interface HeaderProps {
  userName?: string;
  title?: string;
  subtitle?: string;
  showWelcome?: boolean;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = "Jason",
  title,
  subtitle,
  showWelcome = true,
  onSearchPress,
  onNotificationsPress,
}) => (
  <ThemedView style={styles.container}>
    <View>
      {showWelcome ? (
        <>
          <Text style={styles.welcome}>Welcome, {userName}  <HelloWave /></Text>
          <Text style={styles.subtitle}>Upgrade your skill for better future!</Text>
        </>
      ) : (
        <>
          <Text style={styles.welcome}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </>
      )}
    </View>
    <View style={styles.icons}>
      <TouchableOpacity onPress={onSearchPress}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2ecc71",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height:200
  },
  welcome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

export default Header;
