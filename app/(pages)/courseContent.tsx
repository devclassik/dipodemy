import InstructionSection from "@/components/InstructionSection";
import { Stack, useLocalSearchParams, } from "expo-router";
import React from "react";

const CourseContent = () => {
  const { data } = useLocalSearchParams();

 const course = data ? JSON.parse(data as string) : null; 
 
 console.log("Course Details:", course);
 
  return (
    <>
      <Stack.Screen options={{ title: "Course Content", headerShown: true }} />
      <InstructionSection />
    </>
  );
};

export default CourseContent;
