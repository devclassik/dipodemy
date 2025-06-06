import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

type HeaderAction = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: object;
};

type DynamicHeaderLayoutProps = {
  children: React.ReactNode;
  headerStyle?: object;
  showBackButton?: boolean;
  onBackClick?: () => void;
  statusBarColor?: string;
};

const DynamicHeaderLayout: React.FC<DynamicHeaderLayoutProps> = ({
  children,
  headerStyle,
  showBackButton,
  onBackClick,
  statusBarColor = "#ffffff",
}) => {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: statusBarColor }]}
    >
      <ThemedView style={[styles.header, headerStyle]}>
        <View style={styles.headerLeft}>
          {showBackButton && (
            <TouchableOpacity onPress={onBackClick} style={styles.backButton}>
              <ThemedText style={styles.backButtonText}>←</ThemedText>
            </TouchableOpacity>
          )}
        </View>

      </ThemedView>

      <ThemedView style={styles.content}>{children}</ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default DynamicHeaderLayout;
