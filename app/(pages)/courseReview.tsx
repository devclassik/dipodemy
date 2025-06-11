import CourseReviewScreen from "@/components/CourseReviewScreen";
import { Stack, useLocalSearchParams, } from "expo-router";
import React from "react";

const CourseReview = () => {
  const { data } = useLocalSearchParams();

 const course = data ? JSON.parse(data as string) : null; 
 
 console.log("Course Details:", course);
 
  return (
    <>
      <Stack.Screen options={{ title: "Course Review", headerShown: true }} />
      <CourseReviewScreen />
    </>
  );
};

export default CourseReview;
