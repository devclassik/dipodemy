import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CourseInfoScreen from "./CourseInfo";
import RoundedActionButton from "./RoundedActionButton";

interface AboutProps {
  description: string;
  price: string;
  onPress: () => void; // Optional onPress function for the button
  buttonText?: string; // Optional custom button text
  showCourseInfo?: boolean;
}
const About: React.FC<AboutProps> = ({
  description,
  price,
  onPress,
  buttonText = "Enroll Course",
  showCourseInfo = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const maxWords = 25;

  const getTrimmedText = () => {
    const words = description.split(" ");
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <View>
      <Text style={styles.descriptionText}>
        {expanded ? description : getTrimmedText()}
      </Text>
      {description.split(" ").length > maxWords && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMoreText}>
            {expanded ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      )}
      {showCourseInfo && <CourseInfoScreen />}
      <RoundedActionButton
        text={`${buttonText}    ₦${price}`}
        onPress={onPress}
        style={{ marginTop: 10 }}
        icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  readMoreText: {
    fontSize: 14,
    color: "blue", // Example color
    fontWeight: "bold",
  },
});

export default About;
