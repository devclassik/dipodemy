import CertificateScreen from "@/components/CertificateScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const Certificate = () => {
  const { data } = useLocalSearchParams();

  const course = data ? JSON.parse(data as string) : null;

  console.log("Course Details:", course);

  return (
    <>
      <Stack.Screen
        options={{ title: "Certificate Download", headerShown: true }}
      />
      <CertificateScreen />
    </>
  );
};

export default Certificate;
