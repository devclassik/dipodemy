import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const reviewData = [
  {
    id: "1",
    name: "Heather S. McMullen",
    review: "The Course is Very Good dolor sit amet, con sect tur adipiscing elit...",
    likes: 760,
    date: "2 Weeks Ago",
    rating: 4,
  },
  {
    id: "2",
    name: "Natasha B. Lambert",
    review: "The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus...",
    likes: 918,
    date: "2 Weeks Ago",
    rating: 4,
    highlighted: true,
  },
  {
    id: "3",
    name: "Marshall A. Lester",
    review: "The Course is Very Good dolor sit amet, con sect tur adipiscing elit...",
    likes: 914,
    date: "2 Weeks Ago",
    rating: 4,
  },
  {
    id: "4",
    name: "Frances D. Stanford",
    review: "The Course is Very Good dolor veterm, Vestri hac verecundius constatius...",
    likes: 967,
    date: "2 Weeks Ago",
    rating: 4,
  },
];

const filters = ["Excell", "Good", "Average", "Below"];

const CourseReviewScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("Excell");

  const renderReview = ({ item }: any) => (
    <View
      style={[
        styles.reviewCard,
        item.highlighted && { borderColor: "#007BFF", borderWidth: 1 },
      ]}
    >
      <View style={styles.userInfo}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.reviewText}>{item.review}</Text>
          <View style={styles.reviewMeta}>
            <View style={styles.likes}>
              <Ionicons name="heart-outline" size={16} color="#D11A2A" />
              <Text style={styles.likeText}>{item.likes}</Text>
            </View>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.headerTitle}>Reviews</Text>
      </View>

      {/* Review Summary */}
      <View style={styles.summary}>
        <Text style={styles.averageRating}>4.8</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={20} color="#FAC025" />
          ))}
        </View>
        <Text style={styles.reviewCount}>Based on 448 Reviews</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.tab,
              selectedFilter === filter && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedFilter === filter && styles.activeTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reviews List */}
      <FlatList
        data={reviewData}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Write a Review Button */}
      <Pressable style={styles.writeReview}>
        <Text style={styles.writeReviewText}>Write a Review</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </Pressable>
    </View>
  );
};

export default CourseReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  summary: {
    alignItems: "center",
    marginTop: 8,
  },
  averageRating: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  stars: {
    flexDirection: "row",
    marginVertical: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#888",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f3f3f3",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
  },
  tabText: {
    color: "#333",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  reviewText: {
    marginTop: 4,
    fontSize: 13,
    color: "#444",
  },
  reviewMeta: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginTop: 6,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likeText: {
    color: "#D11A2A",
    fontSize: 13,
  },
  dateText: {
    fontSize: 13,
    color: "#777",
  },
  ratingBadge: {
    backgroundColor: "#F0F8FF",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2C7BE5",
  },
  writeReview: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#00C851",
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  writeReviewText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
