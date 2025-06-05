import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface MentorCardListProps {
  name: string;
  specialty: string;
  avatar: any;
}

const MentorCardList: React.FC<MentorCardListProps> = ({
  name,
  specialty,
  avatar,
}) => {
  return (
    <ThemedView style={styles.card}>
      <Image source={avatar} style={styles.avatar} />
      <View>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#1A9E4F",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  specialty: {
    color: "#FF8500",
    fontSize: 12,
  },
});

export default MentorCardList;
