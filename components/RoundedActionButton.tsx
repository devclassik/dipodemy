import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface RoundedActionButtonProps {
  text?: string;
  icon: React.ReactNode;
  bgColor?: string;
  onPress: () => void;
  style?: ViewStyle;
}

const RoundedActionButton: React.FC<RoundedActionButtonProps> = ({
  text,
  icon,
  bgColor = "#27d86c",
  onPress,
  style,
}) => {
  if (!text) {
    // Icon-only button
    return (
      <TouchableOpacity
        style={[styles.iconOnlyButton, { backgroundColor: bgColor }, style]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
    );
  }
  // Text + icon button
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconContainer}>{icon}</View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default RoundedActionButton;
