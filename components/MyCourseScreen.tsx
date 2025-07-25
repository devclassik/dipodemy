import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import MyCourseCard, { Course } from "./MyCourseCard";
import { ThemedView } from "./ThemedView";

interface MyCourseScreenProps {
  courses: Course[];
  isCompleted?: boolean;
  onCardPress?: (item: Course) => void;
  isCompletedAction?: () => void;
  onEndReached?: () => void;
  isFetchingMore?: boolean;
  isLoading: boolean;
  handleRefresh?: () => void;
}
const MyCourseScreen: React.FC<MyCourseScreenProps> = ({
  courses = [],
  onCardPress,
  isCompleted = false,
  isCompletedAction,
  onEndReached,
  isFetchingMore,
  isLoading,
  handleRefresh,
}) => {
  return (
    <ThemedView>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MyCourseCard
            key={item.id}
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => {}}
            isCompleted={isCompleted}
            isCompletedAction={isCompletedAction}
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
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
});

export default MyCourseScreen;
