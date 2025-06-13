import CustomModal from "@/components/CustomModal";
import MyCourseScreen from "@/components/MyCourseScreen";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, useColorScheme } from "react-native";


const BoughtCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const courses: any = useMemo(
    () => [
      {
        id: "1",
        image: require("../../assets/images/c1.png"),
        title: "Mobile UI Essentials",
        category: "Intermediate",
        lessons: 28,
        rating: 4.8,
        duration: "6h 30min",
      },
      {
        id: "2",
        image: require("../../assets/images/c2.png"),
        title: "UI Animation Basics",
        category: "Beginner",
        lessons: 24,
        rating: 4.9,
        duration: "3h 42min",
      },
      {
        id: "3",
        image: require("../../assets/images/c3.png"),
        title: "Web UI Best Practices",
        category: "Advanced",
        lessons: 46,
        rating: 4.8,
        duration: "8h 43min",
      },
      {
        id: "4",
        image: require("../../assets/images/c4.png"),
        title: "Prototype with Figma",
        category: "Intermediate",
        lessons: 39,
        rating: 4.8,
        duration: "2h 34min",
      },
    ],
    []
  );

  useFocusEffect(
    useCallback(() => {
      if (courses.length === 0) {
        setShowModal(true);
      }
      return () => {
        setShowModal(false);
      };
    }, [courses])
  );

  const handleModalClose = () => setShowModal(false);
  const handleFilterPress = () => {
    router.navigate("/(pages)/ongoingCourse");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Courses",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleFilterPress}
              style={{ marginRight: 16 }}
            >
              <MaterialIcons name="tune" size={24} color={colors.accent} />
            </TouchableOpacity>
          ),
        }}
      />

      {courses.length !== 0 ? (
        <MyCourseScreen
          courses={courses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/(pages)/courseContent",
              params: { data: JSON.stringify(data) },
            })
          }
          isCompleted={false}
        />
      ) : (
        <CustomModal
          visible={showModal}
          onClose={handleModalClose}
          lottieSource={require("@/assets/lottie/alert.json")}
          imageSource={require("@/assets/images/noCourse.png")}
          caption="No Course Enrolled!"
          loading={false}
          buttonText="Enroll Course"
          onButtonPress={() => {
            handleModalClose();
            router.replace("/(tabs)/learn");
          }}
        />
      )}
    </>
  );
};

export default BoughtCourse;
