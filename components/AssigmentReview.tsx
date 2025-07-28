import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface AssignmentReviewProps {
  courseId?: number | null;
}

const AssignmentReview: React.FC<AssignmentReviewProps> = ({ courseId }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  
  return (
    <ThemedView style={[styles.assCard, { borderColor: colors.border }]}>
      <TouchableOpacity
        onPress={() =>
          router.navigate({
            pathname: "/(pages)/assignment",
            params: { data: courseId },
          })
        }
      >
        <ThemedText style={[{ color: colors.green }]}>Assignment</ThemedText>
        <ThemedText>prepare a photoshop design and upload </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.navigate({
            pathname: "/(pages)/writeReview",
            params: { data: courseId },
          })
        }
      >
        <ThemedText style={[{ color: colors.green }]}>Review</ThemedText>
        <ThemedText>Write your reviews </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default AssignmentReview;

const styles = StyleSheet.create({
  assCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
