import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { curriculum } from "./PagesCourseDescription";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";

interface LessonSectionsProps {
  curriculum: curriculum[];
  price: string; // Optional price prop
  onPress: () => void; // Optional onPress function for the button
  buttonText?: string; // Optional custom button text
}
const LessonSections: React.FC<LessonSectionsProps> = ({
  curriculum,
  price,
  onPress,
  buttonText = "Enroll Course",
}) => {
  return (
    <View>
      {curriculum?.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.sectionBlock}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText style={styles.sectionTitle}>
              {section.section}
            </ThemedText>
            <ThemedText style={styles.priceText}>{section.duration}</ThemedText>
          </View>
          {section.lessons.map((lesson, lessonIndex) => (
            <View key={lessonIndex} style={styles.lessonRow}>
              <Text style={styles.lessonIndex}>{lessonIndex + 1}.</Text>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <Ionicons name="play-outline" color="green" />
            </View>
          ))}
        </View>
      ))}
      <RoundedActionButton
        text={`${buttonText}     ₦${price}`}
        onPress={onPress}
        style={{ marginVertical: 10 }}
        icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionBlock: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },

  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#167F71",
  },
  lessonIndex: {
    width: 15,
    height: 15,
    fontWeight: "bold",
    color: "#555",
    backgroundColor: "#E8F1FF",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center", // works on Android
  },

  lessonTitle: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  lessonDuration: {
    marginLeft: 8,
    color: "gray",
  },
});

export default LessonSections;
