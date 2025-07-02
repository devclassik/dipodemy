import InstructionSection from "@/components/InstructionSection";
import { Stack } from "expo-router";
import React from "react";

const CourseDetails = () => {

  
  return (
    <>
      <Stack.Screen options={{ title: "Course Details", headerShown: true }} />
      <InstructionSection  />
    </>
  );
};

export default CourseDetails;
