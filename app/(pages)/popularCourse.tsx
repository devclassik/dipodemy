import { Category } from "@/components/CategoryList";
import PopularCourseScreen from "@/components/PopularCourseScreen";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const PopularCourse = () => {
  const categories: Category[] = [
    { id: "1", label: "Design" },
    { id: "2", label: "Development" },
    { id: "3", label: "Business" },
    { id: "4", label: "Music" },
    { id: "5", label: "IT & Software" },
    { id: "6", label: "Health & Fitness" },
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
      <PopularCourseScreen sections={categories} courses={popularCourses} />
    </>
  );
};

export default PopularCourse;

const styles = StyleSheet.create({});
