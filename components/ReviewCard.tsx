import { Colors } from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ReviewProps {
  reviews: ReviewCardProps[];
}
export interface ReviewCardProps {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  likes: number;
  time: string;
}

const ReviewCard: React.FC<ReviewProps> = ({ reviews }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [selectedFilter, setSelectedFilter] = useState("Excellent");

  const filters = ["Excellent", "Good", "Average", "Below"];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <ThemedView
        style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 10 }}
      >
        <ThemedView style={{ flexDirection: "row" }}>
          <Ionicons name="star" size={20} color={colors.warning} />
          <Ionicons name="star" size={20} color={colors.warning} />
          <Ionicons name="star-half" size={20} color={colors.warning} />
        </ThemedView>
        <ThemedText>Based on {reviews.length} Reviews</ThemedText>
      </ThemedView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.tab,
              selectedFilter === filter && {
                backgroundColor: colors.activeToggle,
              },
            ]}
          >
            <ThemedText
              style={[
                { color: colors.textDim },
                selectedFilter === filter && { color: colors.text },
              ]}
            >
              {filter}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {reviews.map((item, index) => (
        <ThemedView
          key={index}
          style={[
            styles.reviewCard,
            {
              borderBottomColor: colors.success,
              borderColor: colors.textMuted,
            },
          ]}
        >
          <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
          <ThemedView style={styles.reviewContent}>
            <ThemedView style={styles.reviewHeader}>
              <ThemedText style={styles.reviewName}>{item.name}</ThemedText>
              <ThemedView style={styles.ratingBox}>
                <Ionicons name="star" size={12} color={colors.warning} />
                <ThemedText
                  style={[styles.ratingText, { color: colors.success }]}
                >
                  {item.rating}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.reviewComment}>
              {item.comment}
            </ThemedText>
            <ThemedView style={styles.reviewFooter}>
              <ThemedView style={styles.reviewLikes}>
                <FontAwesome name="heart" size={14} color={colors.danger} />
                <ThemedText style={styles.reviewMetaText}>
                  {item.likes}
                </ThemedText>
              </ThemedView>
              <ThemedText
                style={[
                  styles.reviewMetaText,
                  { color: colors.primaryDark },
                ]}
              >
                {item.time}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    marginBottom: 8,
  },
  reviewCard: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
    elevation: 5,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewName: {
    fontWeight: "600",
    fontSize: 14,
  },
  ratingBox: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    flexDirection: "row",
    backgroundColor: "#E6F8E9",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
  },
  reviewComment: {
    fontSize: 13,
    marginBottom: 6,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewMetaText: {
    fontSize: 12,
    paddingLeft: 8
  },
  filterScroll: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: "auto"
  },
  tab: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    elevation: 1,
  },
});

export default ReviewCard;
