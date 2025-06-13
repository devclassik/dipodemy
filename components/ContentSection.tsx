import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";
import PagesContentDescription from "./PagesContentDescription";
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";

interface ContentSectionProps {
  imageSource?: any;
}
const ContentSection: React.FC<ContentSectionProps> = ({
  imageSource,
}) => {
  const { data } = useLocalSearchParams();

  const course = data ? JSON.parse(data as string) : null;

  const sampleCoursePayload = {
    category: "Graphic Design",
    title: "Design Principles: Organizing Data",
    rating: "4.2",
    classes: "21",
    hours: "42",
    price: "3,000",
    description:
      "Graphic Design now a popular profession graphic design by off your carrer about tantas regiones barbarorum pedibus obiit Graphic Design n a popular profession I Cur tantas regiones barbarorum pedibus obiit, maria transmi Et ne nimium beatus est; Addidisti ad extremum etiam",
  };

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={course?.image || require("@/assets/images/aiBg.png")}
          style={styles.avatar}
        />
      }
    >
      <ThemedView style={styles.carOverlay}>
        <PagesContentDescription
          category={course?.category || sampleCoursePayload.category}
          title={course?.title || sampleCoursePayload.title}
          rating={course?.rating || sampleCoursePayload.rating}
          classes={course?.classes || sampleCoursePayload.classes}
          hours={course?.hours || sampleCoursePayload.hours}
          price={course?.price || sampleCoursePayload.price}
          description={course?.description || sampleCoursePayload.description}
          curriculum={curriculum}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: 300,
  },
  carOverlay: {
    marginTop: -20,
  },
});

export default ContentSection;
