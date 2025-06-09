import { Ionicons } from "@expo/vector-icons"; // Example for icons
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import About from "./About";
import LessonSections from "./LessonSections";
import { ThemedText } from "./ThemedText";

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
  isPaid = false,
  onPress = () => {}, // Default no-op function
  curriculum = [], // Default to empty array if no curriculum provided
}) => {
  const [activeTab, setActiveTab] = React.useState<"about" | "curriculum">(
    "about"
  );

  const [expanded, setExpanded] = useState(false);
  const maxWords = 25;

  const getTrimmedText = () => {
    const words = description.split(" ");
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <ThemedText style={styles.categoryText}>{category}</ThemedText>
        <View style={styles.ratingAndButton}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <ThemedText style={styles.ratingText}>{rating}</ThemedText>
          {isPaid && (
            <TouchableOpacity style={styles.playButton} onPress={onPress}>
              <Ionicons name="play" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ThemedText style={styles.titleText}>{title}</ThemedText>

      <View style={styles.detailsContainer}>
        <View style={styles.leftDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="videocam-outline" size={16} color="gray" />
            <ThemedText style={styles.detailText}>{classes} Class </ThemedText>
          </View>
          <ThemedText style={{ color: "#000" }}>|</ThemedText>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="gray" />
            <Text style={styles.detailText}>{hours} Hours</Text>
          </View>
        </View>
        <Text style={styles.priceText}>₦{price}</Text>
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
        <About
          description={description}
          price={price}
          onPress={() => console.log(`enroll price:${price}`)}
        />
      ) : (
        <LessonSections
          curriculum={curriculum}
          onPress={() => onPress}
          price={price}
          buttonText="Enroll Course"
        />
      )}
    </View>
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
    fontSize: 14,
    color: "#FF6B00",
    fontWeight: "bold",
  },
  ratingAndButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
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
  },
  titleText: {
    fontSize: 20,
    color: "#202244",
    fontWeight: "bold",
    marginBottom: 10,
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
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  priceText: {
    fontSize: 18,
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
    fontSize: 16,
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
