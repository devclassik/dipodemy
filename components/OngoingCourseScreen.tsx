import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MyCourseCard, { MyCourseCardProps } from "./MyCourseCard";
import Search from "./Search";
import { ThemedView } from "./ThemedView";

interface OngoingCourseScreenProps {
  courses?: MyCourseCardProps[];
  onCardPress?: (item: MyCourseCardProps) => void;
  onTabChange?: (tab: TabOptionsScreen["options"]) => void;
  selectedTab?: TabOptionsScreen["options"];
  isCompleted?: boolean;
  isCompletedActions?: () => void;
  isProgress?: boolean;
  setSearchQuery?: (query: string) => void;
  handleSearch?: () => void;
}
export interface TabOptionsScreen {
  options: "completed" | "ongoing" | "Courses" | "Mentors";
}
const OngoingCourseScreen: React.FC<OngoingCourseScreenProps> = ({
  courses = [],
  onCardPress,
  onTabChange,
  selectedTab,
  isCompleted,
  isCompletedActions,
  isProgress,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <ThemedView style={styles.container}>
      <Search
        selectedTab={selectedTab}
        onTabChange={onTabChange}
        firstWord="completed"
        secondWord="ongoing"
        style={{ marginTop: -40 }}
        onSearchChange={setSearchQuery}
        onSearchPress={handleSearch}
      />

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MyCourseCard
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => {}}
            isCompleted={isCompleted}
            isCompletedAction={isCompletedActions}
            isProgress={isProgress}
            totalLessons={item.sections.length || 0}
            completedLessons={item.sections.filter((section) =>
              section.lessons.some((lesson) => lesson.is_completed)
            ).length}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 12,
  },
});

export default OngoingCourseScreen;
