import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CourseCard from "./CourseCard";
import SectionHeader from "./SectionHeader";
import { ThemedView } from "./ThemedView";

export interface CoursesProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  discount_price: null;
  rating: string;
  is_enrolled: boolean;
  enrollments: number;
  reviews_count: number;
  level: string;
  duration: string;
  status: string;
  slug: string;
  lessons_count: number;
}
export interface Course {
  id: string;
  image: any;
  category: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
}

interface CourseSectionProps {
  title: string;
  courses?: CoursesProps[];
  onSeeAllPress?: () => void;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  courses,
  onSeeAllPress,
}) => {
  return (
    <ThemedView style={styles.section}>
      <SectionHeader
        title={title}
        onSeeAll={() => onSeeAllPress && onSeeAllPress()}
      />
      <FlatList
        data={courses || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (item ? <CourseCard {...item} /> : null)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 14,
    color: "#34C759",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default CourseSection;
