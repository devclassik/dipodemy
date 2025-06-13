import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface ProgressBarProps {
  completed: number;
  total: number;
  height?: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  height = 8,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const percentage = (completed / total) * 100;

  const getColor = () => {
    if (completed < total / 4) return colors.danger;
    if (completed >= total / 2 && completed < total) return colors.warning; 
    if (completed === total) return colors.green; 
    return colors.danger; 
  };
  return (
    <View style={styles.container}>
      <View style={[styles.progressBarBackground, { height }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: getColor(),
              height,
            },
          ]}
        />
      </View>
      <ThemedText style={[styles.progressText, { color: colors.textDim }]}>
        {completed}/{total}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginRight: 10,
  },
  progressBarFill: {
    borderRadius: 4,
  },
  progressText: {
    fontWeight: "600",
    minWidth: 30,
  },
});

export default ProgressBar;
