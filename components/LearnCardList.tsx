import React from "react";
import { FlatList, StyleSheet } from "react-native";
import LearnCard from "./LearnCard";

export interface LearnCardProps {
  id: string;
  category: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  image: any;
}

export interface LearnCardListProps {
  data: LearnCardProps[];
  onCardPress?: (item: LearnCardProps) => void;
}

const LearnCardList: React.FC<LearnCardListProps> = ({ data, onCardPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LearnCard item={item} onPress={() => onCardPress?.(item)} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});

export default LearnCardList;
