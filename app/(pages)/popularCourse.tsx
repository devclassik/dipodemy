import { Category } from "@/components/CategoryList";
import PopularCourseScreen from "@/components/PopularCourseScreen";
import { router, Stack } from "expo-router";
import React from "react";

const PopularCourse = () => {
  const categories: Category[] = [
    { id: "7", name: "All" },
    { id: "1", name: "Design" },
    { id: "2", name: "Development" },
    { id: "3", name: "Business" },
    { id: "4", name: "Music" },
    { id: "5", name: "IT & Software" },
    { id: "6", name: "Health & Fitness" },
  ];

  const popularCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: 4.8,
      reviews: 1892,
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: 4.9,
      reviews: 2101,
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: 4.8,
      reviews: 1812,
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: 4.8,
      reviews: 1654,
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Popular Course", headerShown: true }} />
      <PopularCourseScreen
        sections={categories}
        courses={popularCourses}
        onCardPress={(data) =>
          router.navigate({
            pathname: "/(pages)/courseDetails",
            params: { data: JSON.stringify(data) },
          })
        }
      />
    </>
  );
};

export default PopularCourse;

