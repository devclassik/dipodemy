import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MyCourseCard, { MyCourseCardProps } from "./MyCourseCard";
import { ThemedView } from "./ThemedView";

interface MyCourseScreenProps {
  courses: MyCourseCardProps[];
  onCardPress?: (item: MyCourseCardProps) => void;
  isCompleted?: boolean;
  isCompletedAction?: () => void;
}
const MyCourseScreen: React.FC<MyCourseScreenProps> = ({
  courses = [],
  onCardPress,
  isCompleted,
  isCompletedAction
}) => {
  
  return (
    <ThemedView>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MyCourseCard
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => {}}
            isCompleted={isCompleted}
            isCompletedAction={isCompletedAction}
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
});

export default MyCourseScreen;
