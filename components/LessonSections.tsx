import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { curriculum } from "./PagesCourseDescription";
import { ThemedText } from "./ThemedText";

interface LessonSectionsProps {
  curriculum: curriculum[];
  onPress: () => void; // Optional onPress function for the button
}
const LessonSections: React.FC<LessonSectionsProps> = ({
  curriculum,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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
              <ThemedText style={styles.lessonIndex}>
                {lessonIndex + 1}.
              </ThemedText>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <ThemedText style={styles.lessonTitle}>
                  {lesson.title}
                </ThemedText>
                <ThemedText style={styles.lessonDuration}>
                  {lesson.duration}
                </ThemedText>
              </View>
              <TouchableOpacity onPress={onPress}>
                <Ionicons
                  name={
                    lessonIndex > 1 ? "lock-closed-outline" : "play-outline"
                  }
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionBlock: {
    marginBottom: 20,
  },

  sectionTitle: {
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
    // fontSize: 14,
    color: "#333",
  },
  lessonDuration: {
    marginLeft: 8,
    color: "gray",
  },
});

export default LessonSections;
