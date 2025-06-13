import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const AssignmentReview = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={[styles.assCard, { borderColor: colors.border }]}>
      <TouchableOpacity onPress={() => router.navigate("/(pages)/assignment")}>
        <ThemedText style={[{ color: colors.green }]}>Assignment</ThemedText>
        <ThemedText>prepare a photoshop design and upload </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/(pages)/writeReview")}>
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
