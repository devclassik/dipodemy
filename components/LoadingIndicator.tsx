import { TIMEOUT_MS } from "@/constants/api";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, View, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
  onReload?: () => void;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = "large", color, onReload }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!onReload) return;
    const timer = setTimeout(() => setTimedOut(true), TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [onReload]);

  if (timedOut && onReload) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Oops, network issue.</ThemedText>
        <Button title="Reload" onPress={onReload} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Loading...</ThemedText>
      <ActivityIndicator size={size} color={color || colors.border} />
    </View>
  );
};

export default LoadingIndicator; 