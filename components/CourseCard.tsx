import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./ThemedView";

interface CourseCardProps {
  image: any;
  category: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  category,
  title,
  price,
  rating,
  reviews,
}) => {
  const handlePress = () => {
    router.navigate({
      pathname: "/courseDetails",
      params: {
        data: JSON.stringify({
          image,
          category,
          title,
          price,
          rating,
          reviews,
        }),
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView style={styles.card}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.details}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.rating}>
              ⭐ {rating} ({reviews})
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
    fontSize: 14,
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
