import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"Courses" | "Mentors">(
    "Courses"
  );

  const handleToggleTab = (tab: "Courses" | "Mentors") => {
    setSelectedTab(tab);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={16}
          color="#999"
          style={{ marginRight: 8 }}
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Graphic Design"
          style={{ flex: 1 }}
        />
        <TouchableOpacity>
          <MaterialIcons
            name="tune"
            size={20}
            color="#fff"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            selectedTab === "Courses" && styles.activeToggle,
          ]}
          onPress={() => handleToggleTab("Courses")}
        >
          <Text
            style={[
              styles.toggleText,
              selectedTab === "Courses" && styles.activeText,
            ]}
          >
            Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            selectedTab === "Mentors" && styles.activeToggle,
          ]}
          onPress={() => handleToggleTab("Mentors")}
        >
          <Text
            style={[
              styles.toggleText,
              selectedTab === "Mentors" && styles.activeText,
            ]}
          >
            Mentors
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Result Text */}
      <View style={styles.resultRow}>
        <ThemedText>
          Result for{" "}
          <Text
            style={{ color: "#40E96A", fontWeight: "600" }}
          >{`"${searchQuery}"`}</Text>
        </ThemedText>
        <Text style={{ color: "#40E96A", fontWeight: "600" }}>2480 FOUNDS</Text>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    elevation: 2,
    marginTop: 40,
  },
  filterIcon: {
    backgroundColor: "#FF6B00",
    padding: 6,
    borderRadius: 12,
  },
  toggleRow: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
    marginHorizontal: 10
  },
  activeToggle: {
    backgroundColor: "#1A9E4F",
  },
  toggleText: {
    color: "#333",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginHorizontal: 10
  },
});

export default Search;
