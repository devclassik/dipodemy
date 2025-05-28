import { useRouter } from "expo-router";
import React from "react";
import OnboardingSlider from "../components/OnboardingSlider";

const slides = [
  {
    img: require("../assets/images/light.png"),
    title: "Online Learning",
    description:
      "We Provide Classes online (Livecast and Pre Recorded Lectures).",
  },
  {
    img: require("../assets/images/book.png"),
    title: "Learn from Anytime",
    description:
      "Smart learning for a smarter future—anytime, anywhere.",
  },
  {
    img: require("../assets/images/cert.png"),
    title: "Get Online Certificate",
    description:
      "Analyse your scores and Track your results",
  },
];

export default function Onboarding() {
  const router = useRouter();

  return (
    <OnboardingSlider
      slides={slides}
      onSkip={() => router.replace("/landing")}
      onDone={() => router.replace("/landing")}
    />
  );
}
