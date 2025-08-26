import React from "react";
import { FlatList, StyleSheet } from "react-native";
import DegreeCourseCard from "./DegreeCourseCard";
import SectionHeader from "./SectionHeader";
import { ThemedView } from "./ThemedView";

export interface DegreeCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string; 
  type: string;
  duration: string;
  rating: number;
  enrollments: number;
  reviews_count: number;
  slug: string;
  status: string;
}

interface DegreeSectionProps {
  title: string;
  courses?: DegreeCourse[];
  onSeeAllPress?: () => void;
}

const DegreeSection: React.FC<DegreeSectionProps> = ({
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
        renderItem={({ item }) => (item ? <DegreeCourseCard {...item} /> : null)}
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

export default DegreeSection;
