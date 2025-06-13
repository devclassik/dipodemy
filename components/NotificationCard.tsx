import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Notification {
  image?: any;
  title: string;
  subtitle: string;
  date: Date;
  isRead?: boolean;
}

interface NotificationCardProps {
  notifications: Notification[];
}

const getDateLabel = (date: Date): string => {
  const now = new Date();
  const inputDate = new Date(date);
  const isToday = now.toDateString() === inputDate.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === inputDate.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return inputDate.toLocaleDateString("en-GB"); // e.g., 22/06/2025
};

// Group notifications by label
const groupByDate = (notifications: Notification[]) => {
  const groups: { [key: string]: Notification[] } = {};
  notifications.forEach((item) => {
    const label = getDateLabel(new Date(item.date));
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });

  // Return ordered groups (Today, Yesterday, others sorted by date descending)
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return sortedKeys.map((key) => ({ dateLabel: key, data: groups[key] }));
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notifications,
}) => {
  const [expandedItems, setExpandedItems] = useState<boolean[]>(
    new Array(notifications.length).fill(false)
  );

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const toggleExpanded = (globalIndex: number) => {
    const newExpanded = [...expandedItems];
    newExpanded[globalIndex] = !newExpanded[globalIndex];
    setExpandedItems(newExpanded);
  };

  const markAsRead = (index: number) => {
    console.log(`Marked notification ${index} as read`);
    // Update database if needed
  };

  const maxWords = 2;
  const getTrimmedText = (text: string) => {
    const words = text.split(" ");
    return words.length <= maxWords
      ? text
      : words.slice(0, maxWords).join(" ") + "...";
  };

  const groupedData = groupByDate(notifications);

  let globalIndex = 0; // to track expanded index across groups

  return (
    <ScrollView>
      <ThemedView>
        {groupedData.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.section}>
            <ThemedText style={styles.sectionHeader}>
              {group.dateLabel}
            </ThemedText>
            {group.data.map((item, localIndex) => {
              const currentIndex = globalIndex++;
              return (
                <TouchableOpacity
                  key={currentIndex}
                  onPress={() => markAsRead(currentIndex)}
                >
                  <View style={[styles.card, item.isRead && styles.readCard]}>
                    <Image
                      source={
                        item.image || require("@/assets/images/credit-card.png")
                      }
                      style={styles.image}
                    />
                    <View style={styles.categoryWrapper}>
                      <ThemedText style={styles.CategoryTitle}>
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.subTitle}>
                        {expandedItems[currentIndex]
                          ? item.subtitle
                          : getTrimmedText(item.subtitle)}
                      </ThemedText>
                      {item.subtitle.split(" ").length > maxWords && (
                        <TouchableOpacity
                          onPress={() => toggleExpanded(currentIndex)}
                        >
                          <Text style={[styles.readMoreText, { color: colors.success }]}>
                            {expandedItems[currentIndex]
                              ? "Read Less"
                              : "Read More"}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 8,
  },
  card: {
    flexDirection: "row",
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: "#E8F1FF",
    borderColor: "#B4BDC433",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    elevation: 5,
  },
  readCard: {
    opacity: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
    alignSelf: "center",
    resizeMode: "contain",
  },
  categoryWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  CategoryTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#202244",
  },
  subTitle: {
    marginTop: 4,
    fontWeight: "500",
    color: "#545454",
  },
  readMoreText: {
    marginTop: 4,
    fontWeight: "500",
  },
});

export default NotificationCard;
