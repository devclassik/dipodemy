import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface AboutProps {
  description: string;
}
const About: React.FC<AboutProps> = ({ description }) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

  const [expanded, setExpanded] = useState(false);
  const maxWords = 25;

  const getTrimmedText = () => {
    const words = description.split(" ");
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <View>
      <ThemedText style={styles.descriptionText}>
        {expanded ? description : getTrimmedText()}
      </ThemedText>
      {description.split(" ").length > maxWords && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <ThemedText style={[styles.readMoreText, {color: colors.primaryDark}]}>
            {expanded ? "Read Less" : "Read More ..."}
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: "#333",
    marginBottom: 5,
  },
  readMoreText: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default About;
