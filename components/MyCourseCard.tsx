import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import ProgressBar from "./CustomProgressbar";
import { ThemedText } from "./ThemedText";

export interface MyCourseCardProps {
  id: string;
  image: any;
  title: string;
  category: string;
  lessons: number;
  rating: number;
  duration: string;
  section?: string;
  onPress?: () => void;
  onBookmarkPress?: () => void;
}

const MyCourseCard: React.FC<{
  item: MyCourseCardProps;
  certificates?: string;
  onPress?: () => void;
  onBookmarkPress?: () => void;
  isCompleted?: boolean;
  isProgress?: boolean;
  isCompletedAction?: () => void;
}> = ({
  item,
  onPress,
  onBookmarkPress,
  isCompleted,
  isCompletedAction,
  isProgress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [save, setSave] = useState(Boolean);

  const handlePress = () => {
    console.log("item pressed", item);
    setSave(!save);
    onBookmarkPress;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={[styles.category, { color: colors.icon }]}>
          {item.category}/{item.lessons} lessons
        </ThemedText>
        <View style={styles.row}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <ThemedText style={styles.rating}>
            {item.rating} {"  "} {item.duration}
          </ThemedText>
        </View>
        {isCompleted && (
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={isCompletedAction}
          >
            <ThemedText style={{ color: colors.activeToggle }}>
              VIEW CERTIFICATE
            </ThemedText>
          </TouchableOpacity>
        )}

        {isProgress && <ProgressBar completed={108} total={200} />}
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons
          name={save ? "heart" : "heart-outline"}
          size={20}
          color={colors.danger}
        />
      </TouchableOpacity>
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
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 2,
  },
  title: {
    fontWeight: "600",
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
    color: "#555",
  },
});

export default MyCourseCard;
