import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Lesson, Section } from "./InstructionSection";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LessonSectionsProps {
  curriculum: Section[];
  onPress: (item: Lesson) => void;
}
const LessonSections: React.FC<LessonSectionsProps> = ({
  curriculum,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handlePdfPress = (url: string) => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "🥳 PDF Loading",
      textBody: "Please wait while we load the PDF.",
    });
    router.navigate({
      pathname: "/(pages)/webView",
      params: { url, pageTitle: "PDF Viewer" },
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
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
                section {sectionIndex + 1}
              </ThemedText>
              <ThemedText style={styles.priceText}>
                {section.lessons.length || "N/A"}{" "}
                {section.lessons.length > 1 ? "Lessons" : "Lesson"}
              </ThemedText>
            </View>
            {section.lessons.map((lesson, lessonIndex) => (
              <>
                <View key={lessonIndex} style={styles.lessonRow}>
                  <ThemedText style={styles.lessonIndex}>
                    {lessonIndex + 1}.
                  </ThemedText>
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <ThemedText style={styles.lessonTitle}>
                      {lesson.title}
                    </ThemedText>
                    <ThemedText style={styles.lessonDuration}>
                      {lesson.title || "N/A"}
                    </ThemedText>
                    {lesson.pdf_url && (
                      <Pressable onPress={() => handlePdfPress(lesson.pdf_url)}>
                        <ThemedText
                          style={[
                            styles.lessonDuration,
                            {
                              color: colors.themeGreen,
                              textDecorationLine: "underline",
                            },
                          ]}
                        >
                          Click to read pdf
                        </ThemedText>
                      </Pressable>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => onPress(lesson)}>
                    <Ionicons name="play-outline" color={colors.green} />
                  </TouchableOpacity>
                </View>
                <ThemedView style={styles.lessonSeparator} />
              </>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
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
    textAlignVertical: "center",
  },

  lessonTitle: {
    flex: 1,
    // fontSize: 14,
    color: "#333",
  },
  lessonDuration: {
    // fontSize: 12,
    marginLeft: 8,
    color: "gray",
  },
  lessonSeparator: {
    height: 1,
    backgroundColor: "green",
    marginTop: 10,
  },
});

export default LessonSections;
