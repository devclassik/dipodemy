import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Slide = {
  img: ImageSourcePropType;
  title: string;
  description: string;
};

type OnboardingSliderProps = {
  slides: Slide[];
  onSkip: () => void;
  onDone: () => void;
};

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  onSkip,
  onDone,
}) => {
  const swiperRef = useRef<Swiper>(null);

  const handleNext = () => {
    swiperRef.current?.scrollBy(1); // move to next slide
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        showsButtons={false}
        paginationStyle={styles.pagination}
      >
        {slides.map((slide, idx) => (
          <ThemedView style={styles.slide} key={idx}>
            <TouchableOpacity style={styles.skip} onPress={onSkip}>
              <ThemedText style={styles.skipText} type="subtitle">Skip</ThemedText>
            </TouchableOpacity>
            <Image
              source={slide.img}
              style={styles.image}
              resizeMode="contain"
            />
            <ThemedText style={styles.title}>{slide.title}</ThemedText>
            <ThemedText style={styles.desc}>{slide.description}</ThemedText>
            {idx === slides.length - 1 ? (
              <ThemedView style={{ position: "absolute", bottom: 40, right: 20 }}>
                <RoundedActionButton
                  text="Get Started"
                  icon={
                    <Ionicons name="arrow-forward" size={24} color="#27d86c" />
                  }
                  bgColor="#27d86c"
                  onPress={onDone}
                />
              </ThemedView>
            ) : (
              <>
                <View style={styles.nextBtnPlaceholder} />
                <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
                  <Text style={styles.doneText}>→</Text>
                </TouchableOpacity>
              </>
            )}
          </ThemedView>
        ))}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  skip: { position: "absolute", top: 60, right: 20 },
  skipText: {
    color: "#888",
    fontWeight: "500",
  },
  image: { width: 120, height: 120, marginBottom: 30 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 30,
  },
  dot: {
    backgroundColor: "#d3d3d3",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#4ADE80",
    width: 20,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  doneBtn: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#4ADE80",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: { color: "#fff", fontSize: 28 },
  nextBtnPlaceholder: { height: 50 },
  pagination: {
    left: 40,
    bottom: 40,
    right: undefined,
  },
});

export default OnboardingSlider;
