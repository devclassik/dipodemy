import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Category } from "./CategoryList";
import LearnCard from "./LearnCard";
import { LearnCardProps } from "./LearnCardList";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface PopularCourseScreenProps {
  sections: Category[];
  courses: LearnCardProps[];
  onCardPress?: (item: LearnCardProps) => void;
  onSectionPress?: (item: Category) => void;
}
const PopularCourseScreen: React.FC<PopularCourseScreenProps> = ({
  sections,
  courses,
  onCardPress,
  onSectionPress,
}) => {
  const [activeId, setActiveId] = useState("all");

  const handlePress = (item: Category) => {
    setActiveId(item.id);
    onSectionPress?.(item);
  };

  return (
    <ThemedView>
      <ThemedView style={styles.sectionList}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sections.map((item: Category) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, activeId === item.id && styles.activeChip]}
              onPress={() => handlePress(item)}
            >
              <ThemedText
                style={[
                  styles.chipText,
                  activeId === item.id && styles.activeChipText,
                ]}
              >
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LearnCard
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => {}}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 12,
  },
  sectionList: {
    gap: 4,
    padding: 8,
  },
  chip: {
    backgroundColor: "#E8F1FF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 4,
    elevation: 1,
  },
  activeChip: {
    backgroundColor: "#167F71",
  },
  chipText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 14,
  },
  activeChipText: {
    color: "#fff",
  },
});

export default PopularCourseScreen;
