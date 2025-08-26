import InstructionSection from "@/components/InstructionSection";
import { Stack } from "expo-router";
import React from "react";

const DegreeCourseDetails = () => {

  return (
    <>
      <Stack.Screen options={{ title: "Degree Course Details", headerBackTitle: "Back" ,headerShown: true }} />
      <InstructionSection  />
    </>
  );
};

export default DegreeCourseDetails;
