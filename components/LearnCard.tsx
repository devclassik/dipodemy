// LearnCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LearnCardProps {
  id: string;
  category: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  image: any;
  onPress?: () => void;
}

const LearnCard: React.FC<{ item: LearnCardProps; onPress?: () => void }> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.rating}>
            {item.rating} · {item.reviews}
          </Text>
        </View>
      </View>
      <Ionicons name="bookmark-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  category: {
    color: "#FF8500",
    fontSize: 14,
    marginBottom: 2,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  price: {
    color: "#1A9E4F",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: "#555",
  },
});

export default LearnCard;
