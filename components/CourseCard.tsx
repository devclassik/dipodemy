import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CoursesProps } from "./CourseSection";
import { ThemedView } from "./ThemedView";

interface CourseCardProps {
  image: any;
  category: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
}

const CourseCard: React.FC<CoursesProps> = ({
  // image,
  // category,
  // title,
  // price,
  // rating,
  // reviews,
  id,
  title,
  description,
  image,
  price,
  discount_price,
  rating,
  is_enrolled,
  enrollments,
  reviews_count,
  level,
  duration,
  status,
  slug,
  lessons_count,
}) => {
  const handlePress = () => {
    router.navigate({
      pathname: "/courseDetails",
      params: {
        data: JSON.stringify({
          image,
          // category,
          // title,
          // price,
          // rating,
          // reviews,
        }),
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.category}>{level}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.details}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.rating}>
              ⭐ {rating} ({reviews_count})
            </Text>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 12,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "contain"
  },
  info: {
    padding: 8,
  },
  category: {
    fontSize: 12,
    color: "#FF445D",
    marginBottom: 4,
    backgroundColor: "#FFF5F6",
    borderRadius: 10,
    padding: 4,
    width: "auto",
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "600",
    fontSize: 13,
    color: "#1a73e8",
  },
  rating: {
    fontSize: 12,
    color: "#888",
  },
});

export default CourseCard;
