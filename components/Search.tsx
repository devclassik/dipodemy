import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { TabOptionsScreen } from "./OngoingCourseScreen";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface SearchProps {
  selectedTab?: TabOptionsScreen["options"];
  onTabChange?: (tab: TabOptionsScreen["options"]) => void;
  showFilter?: boolean;
  firstWord?: TabOptionsScreen["options"];
  secondWord?: TabOptionsScreen["options"];
  style?: ViewStyle;
  showSearch?: boolean;
  searchWord?: string;
  onSearchChange?: (query: string) => void;
  onSearchPress?: () => void;
  searchFound?: number;
}

const Search: React.FC<SearchProps> = ({
  selectedTab,
  onTabChange,
  showFilter = true,
  onSearchPress,
  firstWord = "Courses",
  secondWord = "Mentors",
  style = { paddingTop: 40 },
  showSearch = false,
  searchWord,
  onSearchChange,
  searchFound,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={16}
          color="#999"
          style={{ marginRight: 8 }}
        />
        <TextInput
          value={searchWord}
          onChangeText={(text) => onSearchChange?.(text)}
          onSubmitEditing={() => onSearchPress?.()}
          returnKeyType="search"
          placeholder="Graphic Design ..."
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => onSearchPress?.()}>
          <MaterialIcons
            name="tune"
            size={20}
            color={colors.white}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      {showFilter && (
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              selectedTab === firstWord && styles.activeToggle,
            ]}
            onPress={() => onTabChange && onTabChange?.(firstWord)}
          >
            <Text
              style={[
                styles.toggleText,
                selectedTab === firstWord && styles.activeText,
              ]}
            >
              {firstWord}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              selectedTab === secondWord && styles.activeToggle,
            ]}
            onPress={() => onTabChange && onTabChange?.(secondWord)}
          >
            <Text
              style={[
                styles.toggleText,
                selectedTab === secondWord && styles.activeText,
              ]}
            >
              {secondWord}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showSearch && (
        <View style={styles.resultRow}>
          <ThemedText>
            Result for{" "}
            <ThemedText
              style={{ color: "#40E96A", fontWeight: "600" }}
            >{`"${searchWord}"`}</ThemedText>
          </ThemedText>
          <ThemedText style={{ color: "#40E96A", fontWeight: "600" }}>
            {searchFound} FOUND
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#cbcbcb",
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
    marginHorizontal: 10,
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
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Search;
