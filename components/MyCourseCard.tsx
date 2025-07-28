import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Category } from "./CategoryList";
import ProgressBar from "./CustomProgressbar";
import { ThemedText } from "./ThemedText";

interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  pdf_url: string;
  order: string; // Or number, if always numeric
  status: boolean;
  content_type: string; // Assuming these are the possible values
  is_completed: boolean;
}

// Define the structure for a Section
interface Section {
  id: number;
  title: string;
  description: string;
  order: string; // Or number, if always numeric
  status: string; // e.g., "published", "draft"
  lessons: Lesson[];
}

// Define the structure for EnrollmentStatus
interface EnrollmentStatus {
  status: string; // e.g., "enrolled", "completed"
  completed_at: string | null; // Assuming it could be a date string or null
  progress: string; // e.g., "0.00%"
}

// Define the structure for a Course
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string; // Or number, if always numeric
  discount_price: string | null; // Or number, if always numeric, and could be null
  rating: string; // Or number
  is_enrolled: boolean;
  enrollments: number;
  reviews_count: number;
  level: string; // e.g., "intermediate"
  duration: string; // e.g., "16 weeks"
  status: string; // e.g., "published"
  slug: string;
  lessons_count: number;
  progress: string; // e.g., "0%"
  enrollment_status: EnrollmentStatus;
  category: Category;
  sections: Section[];
}

// If you have an array of courses, you can define it as:
export interface CoursesData {
  courses: Course[];
}
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
  item: Course;
  certificates?: string;
  onPress?: () => void;
  onBookmarkPress?: () => void;
  isCompleted?: boolean;
  isProgress?: boolean;
  isCompletedAction?: () => void;
  totalLessons: number;
  completedLessons: number;
}> = ({
  item,
  onPress,
  onBookmarkPress,
  isCompleted,
  isCompletedAction,
  isProgress,
  totalLessons,
  completedLessons,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // const [save, setSave] = useState(Boolean);

  // const handlePress = () => {
  //   // console.log("item pressed", item);
  //   setSave(!save);
  //   onBookmarkPress;
  // };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <ThemedText style={[styles.category, { color: colors.icon }]}>
          {item.category.name}/{item.lessons_count} lessons
        </ThemedText>
        <View style={styles.row}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <ThemedText style={styles.rating}>
            {item.rating} ratings | {item.duration}
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

        {isProgress && <ProgressBar completed={completedLessons} total={totalLessons} />}
      </View>
      {/* <TouchableOpacity onPress={handlePress}>
        <Ionicons
          name={save ? "heart" : "heart-outline"}
          size={20}
          color={colors.danger}
        />
      </TouchableOpacity> */}
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
    marginHorizontal: 12,
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
