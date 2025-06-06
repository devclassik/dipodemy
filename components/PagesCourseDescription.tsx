import { Ionicons } from "@expo/vector-icons"; // Example for icons
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoundedActionButton from "./RoundedActionButton";
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
interface curriculum {
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
        <View>
          <Text style={styles.descriptionText}>
            {expanded ? description : getTrimmedText()}
          </Text>
          {description.split(" ").length > maxWords && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.readMoreText}>
                {expanded ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
          <RoundedActionButton
            text={`Enroll Course    ₦${price}`}
            onPress={() => console.log(`enroll price:${price}`)}
            style={{ marginTop: 10 }}
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
          />
        </View>
      ) : (
        <View>
          {curriculum?.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionBlock}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText style={styles.sectionTitle}>
                  {section.section}
                </ThemedText>
                <ThemedText style={styles.priceText}>
                  {section.duration}
                </ThemedText>
              </View>
              {section.lessons.map((lesson, lessonIndex) => (
                <View key={lessonIndex} style={styles.lessonRow}>
                  <Text style={styles.lessonIndex}>{lessonIndex + 1}.</Text>
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </View>
                  <Ionicons name="play-outline" color="green" />
                </View>
              ))}
            </View>
          ))}
          <RoundedActionButton
            text={`Enroll Course     ₦${price}`}
            onPress={() => console.log(`enroll price:${price}`)}
            style={{ marginTop: 10 }}
            icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
          />
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "blue",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 45,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabButton: {
    backgroundColor: "yellow",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  readMoreText: {
    fontSize: 14,
    color: "blue", // Example color
    fontWeight: "bold",
  },

  sectionBlock: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#222",
  },

  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  lessonIndex: {
    width: 20,
    height: 20,
    fontWeight: "bold",
    color: "#555",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center", // works on Android
  },

  lessonTitle: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  lessonDuration: {
    marginLeft: 8,
    fontSize: 13,
    color: "gray",
  },
});

export default PagesCourseDescription;
