import AssignmentReview from "@/components/AssigmentReview";
import FooterAction from "@/components/FooterAction";
import LessonSections from "@/components/LessonSections";
import { ThemedView } from "@/components/ThemedView";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const courseContent = () => {
  const { data } = useLocalSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [courseId, setCourseId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(data as string);
        setCourses(parsed);
        setCourseId(parsed.category.id ?? null);
      } catch {
        console.log("Failed to parse course data");
      }
    }
  }, [data]);

  const handlePlayPress = (url: string) => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "🥳 Video Loading",
      textBody: "Please wait while we load the video.",
    });
    router.navigate({
      pathname: "/(pages)/videoPlayer",
      params: { url },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Course Content",
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <AssignmentReview courseId={courseId} />

        <ThemedView
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 16,
            marginVertical: 20,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <LessonSections
            curriculum={courses.sections}
            onPress={(item) => {
              console.log("Selected lesson:", item);
              handlePlayPress(item.video_url);
            }}
          />
        </ThemedView>
        <FooterAction
          text="Start Course Again here"
          isFresh={true}
          onButtonPress={() => {
            handlePlayPress(courses.sections[0].lessons[0].video_url);
          }}
        />
      </ScrollView>
    </>
  );
};

export default courseContent;
