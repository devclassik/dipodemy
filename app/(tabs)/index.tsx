import { ScrollView, StyleSheet, View } from "react-native";

import CategoryList, { Category } from "@/components/CategoryList";
import CourseSection from "@/components/CourseSection";
import Header from "@/components/Header";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import { router } from "expo-router";

export default function HomeScreen() {
  const newCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];
  const degreeCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];
  const popularCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];

  const categories: Category[] = [
    { id: "1", label: "Design" },
    { id: "2", label: "Development" },
    { id: "3", label: "Business" },
    { id: "4", label: "Music" },
    { id: "5", label: "IT & Software" },
    { id: "6", label: "Health & Fitness" },
    // ...add more as needed
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Header onSearchPress={()=>router.navigate("/search")}/>
        <SpecialOfferBanner />
      </View>
      <CategoryList
        categories={categories}
        onCategoryPress={(cat) => console.log(cat)}
        onSeeAllPress={() => router.navigate("/search")}
      />
      <CourseSection
        title="New Courses"
        courses={newCourses}
        onSeeAllPress={() => router.navigate("/learn")}
      />
      <CourseSection title="Earn Your Degree" courses={degreeCourses} 
      onSeeAllPress={()=> router.navigate("/learn")}/>
      <CourseSection title="Most Popular Courses" courses={popularCourses} 
      onSeeAllPress={()=> router.navigate("/learn")}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
