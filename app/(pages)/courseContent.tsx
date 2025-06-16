import AssignmentReview from "@/components/AssigmentReview";
import FooterAction from "@/components/FooterAction";
import LessonSections from "@/components/LessonSections";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React from "react";

const courseContent = () => {
  const curriculum = [
    {
      section: "Introduction",
      duration: "15 mins",
      lessons: [
        { title: "Welcome to the course", duration: "5 mins" },
        { title: "Course overview", duration: "10 mins" },
      ],
    },
    {
      section: "Getting Started with React Native",
      duration: "45 mins",
      lessons: [
        { title: "Setting up the environment", duration: "15 mins" },
        { title: "Exploring core components", duration: "20 mins" },
        { title: "Running your first app", duration: "10 mins" },
      ],
    },
    {
      section: "Navigation & Routing",
      duration: "30 mins",
      lessons: [
        { title: "Using React Navigation", duration: "15 mins" },
        { title: "Stack & Tab navigation", duration: "15 mins" },
      ],
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Course Content",
          headerShown: true,
        }}
      />
      <AssignmentReview />

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
        <LessonSections curriculum={curriculum} onPress={() => {}} />
      </ThemedView>
      <FooterAction text="Start Course Again" isFresh={true} />
    </>
  );
};

export default courseContent;
