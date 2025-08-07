import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface RoundedActionButtonProps {
  text?: string;
  icon: React.ReactNode;
  bgColor?: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  disabledStyle?: ViewStyle;
}

const RoundedActionButton: React.FC<RoundedActionButtonProps> = ({
  text,
  icon,
  bgColor = "#27d86c",
  onPress,
  style,
  disabled,
  disabledStyle = { opacity: 0.5 },
}) => {
  if (!text) {
    // Icon-only button
    return (
      <TouchableOpacity
        style={[styles.iconOnlyButton, { backgroundColor: bgColor }, style, disabled ? disabledStyle : {}]}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        {icon}
      </TouchableOpacity>
    );
  }
  // Text + icon button
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style, disabled ? disabledStyle : {}]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedText style={styles.text}>{text}</ThemedText>
      <ThemedView style={styles.iconContainer}>{icon}</ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 2,
    height: 50,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  iconOnlyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
});

export default RoundedActionButton;
