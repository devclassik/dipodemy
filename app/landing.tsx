import LandingScreen from "@/components/LandingScreen";
import { useRouter } from "expo-router";
import React from "react";

export default function Landing() {
  const router = useRouter();

  return <LandingScreen />;
}
