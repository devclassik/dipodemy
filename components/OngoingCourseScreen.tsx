import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import MyCourseCard, { MyCourseCardProps } from "./MyCourseCard";
import Search from "./Search";
import { ThemedText } from "./ThemedText";
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
  refreshing?: boolean;
  onRefresh?: () => void;
  loadingMore?: boolean;
  onLoadMore?: () => void;
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
  refreshing = false,
  onRefresh = () => {},
  loadingMore = false,
  onLoadMore = () => {},
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
            // @ts-ignore
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => {}}
            isCompleted={isCompleted}
            isCompletedAction={isCompletedActions}
            isProgress={isProgress}
            // @ts-ignore
            totalLessons={item?.sections.length || 0}
            completedLessons={
              // @ts-ignore
              item?.sections.filter((section: any) =>
                // @ts-ignore
                section.lessons.some((lesson) => lesson.is_completed)
              ).length || 0
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <ThemedView style={{ padding: 20, alignItems: "center" }}>
            <ThemedText>No courses found.</ThemedText>
          </ThemedView>
        )}
        onEndReachedThreshold={0.5}
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
