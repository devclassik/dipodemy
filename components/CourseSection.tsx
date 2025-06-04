import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CourseCard from "./CourseCard";
import SectionHeader from "./SectionHeader";
import { ThemedView } from "./ThemedView";

interface Course {
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
  courses?: Course[];
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
        onSeeAll={() => console.log("See All Pressed")}
      />
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard {...item} />}
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
