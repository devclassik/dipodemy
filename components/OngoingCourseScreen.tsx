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
}
export interface TabOptionsScreen {
  options: "Completed" | "Ongoing" | "Courses" | "Mentors";
}
const OngoingCourseScreen: React.FC<OngoingCourseScreenProps> = ({
  courses = [],
  onCardPress,
  onTabChange,
  selectedTab,
  isCompleted,
  isCompletedActions,
  isProgress,
}) => {
  return (
    <ThemedView style={styles.container}>
      <Search
        selectedTab={selectedTab}
        onTabChange={onTabChange}
        firstWord="Completed"
        secondWord="Ongoing"
        style={{ marginTop: -40 }}
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
