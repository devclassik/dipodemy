import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Category } from "./CategoryList";
import LearnCard from "./LearnCard";
import { LearnCardProps } from "./LearnCardList";
import LoadingIndicator from "./LoadingIndicator";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface PopularCourseScreenProps {
  sections: Category[];
  onSectionPress?: (item: Category) => void;
  courses: LearnCardProps[];
  onCardPress?: (item: LearnCardProps) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  handleRefresh?: () => void;
  fetchMoreCourse?: () => void;
}
const PopularCourseScreen: React.FC<PopularCourseScreenProps> = ({
  sections,
  onSectionPress,
  courses,
  onCardPress,
  isFetching = false,
  isLoading = false,
  handleRefresh,
  fetchMoreCourse,
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
                {item.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {isFetching || isLoading && (
        <ThemedView>
          <LoadingIndicator size="large" />
        </ThemedView>
      )}

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LearnCard
            item={item}
            onPress={() => onCardPress?.(item)}
            onBookmarkPress={() => { }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ThemedView style={styles.emptyView}>
            <ThemedText>No courses found</ThemedText>
          </ThemedView>
        }
        ListFooterComponent={
          isFetching ? (
            <ThemedView style={styles.footerLoader}>
              <LoadingIndicator size="small" />
            </ThemedView>
          ) : <ThemedView style={{ height: 60 }} /> 
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        onEndReached={fetchMoreCourse}
        onEndReachedThreshold={0.3}

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
  emptyView: {
    marginVertical: 40,
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: 16,
  },
});

export default PopularCourseScreen;
