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
          <View style={styles.slide} key={idx}>
            <TouchableOpacity style={styles.skip} onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Image
              source={slide.img}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.desc}>{slide.description}</Text>
            {idx === slides.length - 1 ? (
              // <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
              //   <Text style={styles.doneText}>→</Text>
              // </TouchableOpacity>
              <View style={{position: "absolute", bottom: 40, right: 20}}>
                <RoundedActionButton
                  text="Get Started"
                  icon={
                    <Ionicons name="arrow-forward" size={24} color="#27d86c" />
                  }
                  bgColor="#27d86c"
                  onPress={onDone}
                />
              </View>
            ) : (
              <>
                <View style={styles.nextBtnPlaceholder} />
                <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
                  <Text style={styles.doneText}>→</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
    backgroundColor: "#fff",
  },
  skip: { position: "absolute", top: 40, right: 20 },
  skipText: { color: "#888", fontWeight: "bold" },
  image: { width: 120, height: 120, marginBottom: 30 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: "#666",
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
