import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export interface Category {
  id: string;
  label: string;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  onSeeAllPress?: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress,
  onSeeAllPress,
}) => (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.header}>
      <ThemedText style={styles.title}>Categories</ThemedText>
      <ThemedText style={styles.seeAll} onPress={onSeeAllPress}>
        See All
      </ThemedText>
    </ThemedView>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.chip}
          onPress={() => onCategoryPress?.(category)}
        >
          <ThemedText style={styles.chipText}>{category.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
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
  chip: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 4,
    elevation: 1,
  },
  chipText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default CategoryList;
