import ReviewCard from "@/components/ReviewCard";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from 'react';
import { useColorScheme } from "react-native";

const Reviews = () => {
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const review = useMemo(
    () => [
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
    ],
    []
  );

  useFocusEffect(
    useCallback(() => {
      if (review.length === 0) {
        setShowModal(true);
      }
      return () => {
        setShowModal(false);
      };
    }, [review])
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
