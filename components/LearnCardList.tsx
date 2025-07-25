import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Category } from "./CategoryList";
import LearnCard from "./LearnCard";
import LoadingIndicator from "./LoadingIndicator";
import { ThemedView } from "./ThemedView";

export interface LearnCardProps {
  id: number;
  title: string;
  description: string;
  image: any;
  price: string;
  discount_price: null | string;
  rating: string;
  is_enrolled: boolean;
  enrollments: number;
  reviews_count: number;
  level: string;
  duration: string;
  status: string;
  slug: string;
  lessons_count: number;
  category: Category
}

export interface LearnCardListProps {
  data: LearnCardProps[];
  onCardPress?: (item: LearnCardProps) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  loadingMore?: boolean;

}

const LearnCardList: React.FC<LearnCardListProps> = ({
  data,
  onCardPress,
  refreshing,
  onRefresh,
  onEndReached,
  loadingMore = false,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <LearnCard item={item} onPress={() => onCardPress?.(item)} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <ThemedView style={{ paddingVertical: 20 }}>
            <LoadingIndicator size="small" />
          </ThemedView>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});

export default LearnCardList;
