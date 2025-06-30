import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MentorCardList from "./MentorCardList";
import { ThemedView } from "./ThemedView";

interface MentorCardProps {
  item: {
    id: string;
    name: string;
    specialty: string;
    avatar: any;
  }[];
  onPress?: (mentor: any) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ item, onPress }) => {
  return (
    <ThemedView style={styles.card}>
      <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MentorCardList {...item} onPress={() => onPress?.(item)} />
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#1A9E4F",
    borderBottomWidth: 1,
  },
});

export default MentorCard;
