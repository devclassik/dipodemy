import { Colors } from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import About from "./About";
import CourseInfoScreen from "./CourseInfo";
import { Section } from "./InstructionSection";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export interface Review {
  id: number;
  user: {
    name: string;
    image: any;
  };
  rating: string;
  comment: string;
  created_at: string;
  time_ago: string;
}

interface CourseCardProps {
  category: string;
  title: string;
  rating: string;
  classes: string;
  hours: string;
  price: string;
  description: string;
  isPaid?: boolean;
  onPress?: () => void;
  curriculum?: Section[];
  review?: Review[];
  courseId?: number;
  onEnroll?: () => void;
}

const PagesCourseDescription: React.FC<CourseCardProps> = ({
  category,
  title,
  rating,
  classes,
  hours,
  price,
  description,
  isPaid = true,
  onPress,
  curriculum = [],
  review = [],
  courseId = 0,
  onEnroll,
}) => {
  const [activeTab, setActiveTab] = React.useState<"about" | "curriculum">("about");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <>
      <View style={styles.cardContainer}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.categoryText, { color: colors.primary }]}>
            {category}
          </ThemedText>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#F4B400" />
            <ThemedText style={styles.ratingText}>{rating}</ThemedText>
            {isPaid && (
              <TouchableOpacity style={styles.playButton} onPress={onPress}>
                <Ionicons name="play" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Title */}
        <ThemedText style={styles.titleText}>{title}</ThemedText>
        <ThemedText style={styles.descText}>{description}</ThemedText>

        {/* Course Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="videocam-outline" size={16} color={colors.green} />
            <ThemedText style={styles.detailText}>{classes} Classes</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={colors.green} />
            <ThemedText style={styles.detailText}>{hours}</ThemedText>
          </View>
          <ThemedText style={styles.priceText}>₦{price}</ThemedText>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["about", "Reviews"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab as "about" | "curriculum")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab === "about" ? "About" : "Reviews"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === "about" ? (
          <About description={title} />
        ) : (
          <About description={title} />
        )}
      </View>
      {/* Reviews + Button */}
      {activeTab === "about" && (
        <CourseInfoScreen
          onSeeAll={() =>
            router.navigate({
              pathname: "/(pages)/reviews",
              params: { data: courseId.toString() },
            })
          }
          topic={category}
        // review={review}
        />
      )}

      {activeTab !== "about" && (
        <>
          <ThemedView style={styles.reviewsHeader}>
            <ThemedText style={styles.sectionTitle}>Reviews</ThemedText>
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/(pages)/reviews",
                  params: { data: courseId.toString() },
                })
              }
            >
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
        </>
      )}






      <RoundedActionButton
        text={`Pay ₦${price}`}
        icon={<Ionicons name="arrow-forward" size={22} color={colors.themeGreen} />}
        bgColor={colors.green}
        onPress={onEnroll ?? (() => { })}
        style={styles.enrollButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 4,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: -20,
  },
  // ratingText: {
  //   fontSize: 13,
  //   fontWeight: "500",
  //   color: "#333",

  // },
  playButton: {
    backgroundColor: "#40E96A",
    borderRadius: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: -20,
    shadowColor: "#40E96A",
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  titleText: {
    color: "#202244",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 10,
  },
  descText: {
    color: "#555",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  },
  priceText: {
    fontWeight: "bold",
    color: "#167F71",
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F4F6FA",
    borderRadius: 12,
    padding: 4,
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabText: {
    fontWeight: "500",
    color: "#777",
    fontSize: 13,
  },
  activeTabButton: {
    backgroundColor: "#FAC025",
    shadowColor: "#FAC025",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  enrollButton: {
    marginVertical: 25,
    width: 260,
    alignSelf: "center",
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
  sectionTitle: {
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default PagesCourseDescription;
