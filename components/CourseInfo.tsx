import { Colors } from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Review } from "./PagesCourseDescription";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface CourseInfoProps {
  instructor?: string;
  instructorAvatar?: any;
  topic?: string;
  toGain?: { icon: any; text: string }[];
  review?:Review[];
  onSeeAll?: () => void;
}

const CourseInfoScreen: React.FC<CourseInfoProps> = ({
  instructorAvatar,
  instructor = "ADC",
  topic = "Graphic Design",
  toGain = [
    { icon: "book-outline", text: "25 Lessons" },
    { icon: "laptop-outline", text: "Access on Mobile, Desktop & TV" },
    { icon: "trending-up-outline", text: "All Level" },
    { icon: "headset-outline", text: "Audio Book" },
    { icon: "infinite-outline", text: "Lifetime Access" },
    { icon: "create-outline", text: "Assignment" },
    { icon: "document-text-outline", text: "Certificate of Completion" },
  ],
  review,
  onSeeAll,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Instructor</ThemedText>
      <ThemedView style={styles.instructorContainer}>
        <Image
          source={instructorAvatar || require("@/assets/images/icon.png")}
          style={styles.avatar}
        />
        <ThemedView>
          <ThemedText style={styles.instructorName}>{instructor}</ThemedText>
          <ThemedText style={styles.instructorRole}>{topic}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.sectionTitle}>What You`ll Get</ThemedText>
      <ThemedView style={styles.features}>
        {toGain.map((item, index) => (
          <ThemedView key={index} style={styles.featureItem}>
            <Ionicons name={item.icon} size={20} color={colors.success} />
            <ThemedText style={styles.featureText}>{item.text}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.reviewsHeader}>
        <ThemedText style={styles.sectionTitle}>Reviews</ThemedText>
        <TouchableOpacity onPress={onSeeAll}>
          <ThemedText style={[styles.seeAll, { color: colors.success }]}>
            SEE ALL
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {review?.map((review, index) => (
        <ThemedView
          key={index}
          style={[styles.reviewCard, { borderBottomColor: colors.success }]}
        >
          <Image
            source={{ uri: review?.user?.image }}
            style={styles.reviewAvatar}
          />
          <ThemedView style={styles.reviewContent}>
            <ThemedView style={styles.reviewHeader}>
              <ThemedText style={styles.reviewName}>
                {review?.user?.name}
              </ThemedText>
              <ThemedView style={styles.ratingBox}>
                <Ionicons name="star" size={12} color={colors.warning} />
                <ThemedText style={styles.ratingText}>
                  {review.rating}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.reviewComment}>
              {review.comment}
            </ThemedText>
            <ThemedView style={styles.reviewFooter}>
              <ThemedView style={styles.reviewLikes}>
                <FontAwesome name="heart" size={14} color={colors.danger} />
                <ThemedText style={styles.reviewMetaText}>
                  {review.rating} Likes
                </ThemedText>
              </ThemedView>
              <ThemedText
                style={[styles.reviewMetaText, { color: colors.primaryDark }]}
              >
                 {review.time_ago}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
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
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  seeAll: {
    color: "#167F71",
    fontWeight: "500",
  },
  reviewCard: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
    borderBottomWidth: 1,
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
    flexDirection: "row",
  },
  ratingText: {
    color: "#23C865",
    fontSize: 12,
    fontWeight: "600",
  },
  reviewComment: {
    marginVertical: 4,
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
    fontSize: 14,
  },
});

export default CourseInfoScreen;
