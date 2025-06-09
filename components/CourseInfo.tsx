import {
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CourseInfoProps {
  instructor?: string;
  instructorAvatar?: any;
  topic?: string;
  toGain?: { icon: any; text: string }[];
  review?: {
    name: string;
    avatar: string;
    comment: string;
    rating: string;
    likes: string;
    time: string;
  }[];
  onSeeAll?: () => void;
}

const CourseInfoScreen: React.FC<CourseInfoProps> = ({
  instructorAvatar,
  instructor = "Robert Jr",
  topic = "Graphic Design",
  toGain = [
    { icon: "book-outline", text: "25 Lessons" },
    { icon: "laptop-outline", text: "Access Mobile, Desktop & TV" },
    { icon: "trending-up-outline", text: "Beginner Level" },
    { icon: "headset-outline", text: "Audio Book" },
    { icon: "infinite-outline", text: "Lifetime Access" },
    { icon: "create-outline", text: "Assignment" },
    { icon: "document-text-outline", text: "Certificate of Completion" },
  ],
  review = [
    {
      name: "Will",
      avatar: "https://i.pravatar.cc/50?img=1",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it.",
      rating: 4.2,
      likes: 578,
      time: "2 Weeks Ago",
    },
    {
      name: "Martha E. Thompson",
      avatar: "https://i.pravatar.cc/50?img=3",
      comment:
        "This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.",
      rating: 4.6,
      likes: 598,
      time: "3 Weeks Ago",
    },
  ],
  onSeeAll,
}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Instructor */}
      <Text style={styles.sectionTitle}>Instructor</Text>
      <View style={styles.instructorContainer}>
        <Image
          source={instructorAvatar || require("@/assets/images/avatar.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.instructorName}>{instructor}</Text>
          <Text style={styles.instructorRole}>{topic}</Text>
        </View>
      </View>

      {/* What You'll Get */}
      <Text style={styles.sectionTitle}>What You`ll Get</Text>
      <View style={styles.features}>
        {toGain.map((item, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name={item.icon} size={20} color="#333" />
            <Text style={styles.featureText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Reviews */}
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      {review.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
          <View style={styles.reviewContent}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingText}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <View style={styles.reviewFooter}>
              <View style={styles.reviewLikes}>
                <FontAwesome name="heart" size={14} color="red" />
                <Text style={styles.reviewMetaText}> {review.likes}</Text>
              </View>
              <Text style={styles.reviewMetaText}>{review.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  instructorName: {
    fontSize: 14,
    fontWeight: "600",
  },
  instructorRole: {
    color: "#FF6B00",
    fontSize: 12,
  },
  features: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  seeAll: {
    fontSize: 12,
    color: "#1A73E8",
    fontWeight: "500",
  },
  reviewCard: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
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
  },
  reviewName: {
    fontWeight: "600",
  },
  ratingBox: {
    backgroundColor: "#E6F8E9",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  ratingText: {
    color: "#23C865",
    fontSize: 12,
    fontWeight: "600",
  },
  reviewComment: {
    fontSize: 13,
    marginVertical: 4,
    color: "#444",
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
    color: "#888",
  },
});


export default CourseInfoScreen;