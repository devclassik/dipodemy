import SubmitAssignmentCard from "@/components/SubmitAssignmentCard";
import { Stack, useLocalSearchParams } from "expo-router";
import React from 'react';

const Assignment = () => {

  const { data } = useLocalSearchParams();
  const courseData = data ? JSON.parse(data as string) : null;

  const mockCourses = {
    id: 1,
    category: "Graphic Design",
    title: "Graphic Design Advanced",
    price: "89/-",
    rating: 4.9,
    reviews: 7830,
    image: require("@/assets/images/c1.png"),
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Upload Assignment",
          headerShown: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <SubmitAssignmentCard
        id={mockCourses.id}
        category={mockCourses.category}
        title={mockCourses.title}
        price={mockCourses.price}
        rating={mockCourses.rating}
        reviews={mockCourses.reviews}
        image={mockCourses.image}
      />
    </>
  );
};

export default Assignment;
