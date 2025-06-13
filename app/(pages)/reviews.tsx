import ReviewCard from "@/components/ReviewCard";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const Reviews = () => {
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

  const review = [
    {
      id: 1,
      name: "Will",
      avatar: "https://i.pravatar.cc/50?img=1",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it.",
      rating: 4.2,
      likes: 578,
      time: "2 Weeks Ago",
    },
    {
      id: 2,
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
    {
      id: 3,
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
    {
      id: 4,
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
    {
      id: 5,
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
    {
      id: 6,
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
  ];

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

  return (
    <>
      <Stack.Screen
        options={{
          title: "Reviews",
          headerShown: true,
        }}
      />
      <ReviewCard reviews={review} />
    </>
  );
};

export default Reviews;
