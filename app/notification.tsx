import { profileService } from "@/api/services/profile.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import NotificationCard from "@/components/NotificationCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const loadNotifications = async () => {
    try {
      const res = await profileService.notificationScreen();

      setNotifications(res?.data?.notifications || []);
    } catch (error: any) {
      console.log("Notification screen error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Failed to load notifications",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  return (
    <>
      <Stack.Screen options={{
        title: "Notification", headerShown: true, headerBackTitle: "Back",
      }} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={
          notifications?.length === 0 && !loading
            ? styles.emptyWrapper
            : undefined
        }
      >
        {loading ? (
          <ThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LoadingIndicator
              size="large"
              color={colors.accent}
              onReload={onRefresh}
            />
          </ThemedView>
        ) : notifications?.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyTitle}>
              🎉 You're all caught up!
            </ThemedText>
            <ThemedText style={styles.emptyText}>
              No new notifications right now.
            </ThemedText>
          </ThemedView>
        ) : (
          <NotificationCard notifications={notifications} />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },
  emptyWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emptyTitle: {
    fontWeight: "600",
    color: "#333",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },
});
