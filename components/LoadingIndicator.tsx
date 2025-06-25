import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = "large", color }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Loading...</ThemedText>
      <ActivityIndicator size={size} color={color || colors.border} />
    </View>
  );
};

export default LoadingIndicator; 