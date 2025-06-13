import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface MentorCardListProps {
  name: string;
  specialty: string;
  avatar: any;
  onPress?: () => void;
}

const MentorCardList: React.FC<MentorCardListProps> = ({
  name,
  specialty,
  avatar,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={[styles.card, {borderBottomColor: colors.success}]}>
        <Image source={avatar} style={styles.avatar} />
        <View>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <ThemedText style={styles.specialty}>{specialty}</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
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
