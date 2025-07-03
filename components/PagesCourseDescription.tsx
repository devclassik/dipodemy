import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons"; // Example for icons
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
import LessonSections from "./LessonSections";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";

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
  curriculum?: curriculum[];
  review?: Review[];
  courseId?: number;
  onEnroll?: () => void;
}
export interface curriculum {
  section: string;
  duration: string;
  lessons: {
    title: string;
    duration: string;
  }[];
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
  onPress = () => {},
  curriculum = [],
  review = [],
  courseId = 0,
  onEnroll,
}) => {
  const [activeTab, setActiveTab] = React.useState<"about" | "curriculum">(
    "about"
  );
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  console.log("category:", category);

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.categoryText}>{category}</ThemedText>
          <View style={styles.ratingAndButton}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <ThemedText style={styles.ratingText}>{rating}</ThemedText>
            {isPaid && (
              <TouchableOpacity style={styles.playButton} onPress={onPress}>
                <Ionicons name="play" size={24} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ThemedText style={styles.titleText}>{description}</ThemedText>

        <View style={styles.detailsContainer}>
          <View style={styles.leftDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="videocam-outline" size={16} color="gray" />
              <ThemedText style={styles.detailText}>{classes} Class</ThemedText>
            </View>
            <ThemedText style={{ color: "#000" }}>|</ThemedText>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="gray" />
              <ThemedText style={styles.detailText}>{hours}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.priceText}>₦{price}</ThemedText>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "about" && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab("about");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "about" && styles.activeTabButton,
              ]}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "curriculum" && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab("curriculum");
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "curriculum" && styles.activeTabButton,
              ]}
            >
              Curriculum
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "about" ? (
          <About description={title} />
        ) : (
          <LessonSections curriculum={curriculum} onPress={() => onPress} />
        )}
      </View>

      {activeTab === "about" && (
        <CourseInfoScreen
          onSeeAll={() =>
            router.navigate({
              pathname: "/(pages)/reviews",
              params: { data: courseId.toString() },
            })
          }
          topic={category}
          review={review}
        />
      )}

      <RoundedActionButton
        text={`Enroll Course   ₦${price}`}
        icon={
          <Ionicons name="arrow-forward" size={24} color={colors.themeGreen} />
        }
        bgColor={colors.green}
        onPress={onEnroll ?? (() => {})}
        style={{
          marginVertical: 20,
          width: 250,
          alignSelf: "center",
          alignItems: "center",
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    color: "#FF6B00",
    fontWeight: "bold",
  },
  ratingAndButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#FAC025",
    marginRight: 10,
  },
  playButton: {
    backgroundColor: "#40E96A",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  titleText: {
    color: "#202244",
    fontWeight: "bold",
    marginBottom: 10,
    // fontSize: 15
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  detailText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
  },
  priceText: {
    fontWeight: "bold",
    color: "#167F71",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#E8F1FF",
    borderRadius: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  tabText: {
    fontWeight: "600",
  },
  activeTabButton: {
    backgroundColor: "#FAC025",
  },

  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default PagesCourseDescription;
