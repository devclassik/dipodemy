import { profileService } from "@/api/services/profile.service";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function NotificationScreen() {

  const [notifications, setNotifications] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await profileService.notificationScreen();
      setNotifications(res?.data || []);
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
      <Stack.Screen options={{ title: "Notification", headerShown: true }} />
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
          <ThemedText style={styles.loading}>Loading...</ThemedText>
        ) : notifications?.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyTitle}>🎉 You're all caught up!</ThemedText>
            <ThemedText style={styles.emptyText}>No new notifications right now.</ThemedText>
          </ThemedView>
        ) : (
          // <NotificationCard notifications={notifications} />
          null
        )}
      </ScrollView>
    </>

  )
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
  },
  emptyTitle: {
    fontWeight: "600",
    color: "#333",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  }
});
