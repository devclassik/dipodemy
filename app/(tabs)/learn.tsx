import { learnService } from "@/api/services/learn.service";
import LearnCardList from "@/components/LearnCardList";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Learn() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data } = useLocalSearchParams();

  useEffect(() => {
    let mounted = true;

    const loadInitial = async () => {
      let value = "";
      if (data) {
        try {
          const parsed = JSON.parse(data as string);
          value = typeof parsed === "string" ? parsed : String(parsed);
        } catch {
          value = String(data);
        }
      }

      if (mounted) {
        setSearchQuery(value);
        await fetchCourses(1, value, true);
      }
    };

    loadInitial();

    return () => {
      mounted = false;
    };
  }, []);

  const fetchCourses = async (
    pageToFetch: number,
    query: string = "",
    isRefresh: boolean = false
  ) => {
    try {
      if (!isRefresh && pageToFetch > 1) {
        setLoadingMore(true); // start loadingMore
      }

      const res = await learnService.learnScreenPaginated({
        page: pageToFetch,
        search: query,
        limit: 10,
      });
      // @ts-ignore
      const results = res.data.courses;

      setCourses((prev) =>
        pageToFetch === 1 ? results : [...prev, ...results]
      );
      // @ts-ignore
      setHasMore(res.data.meta.current_page < res.data.meta.last_page);
      setPage(pageToFetch);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch courses",
      });
      console.error("Fetch failed:", error);
    } finally {
      if (!isRefresh && pageToFetch > 1) setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchCourses(1, searchQuery, true);
  };

  const loadNextPage = () => {
    if (hasMore && !refreshing && !loadingMore) {
      fetchCourses(page + 1, searchQuery);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchTriggered(true);
    setLoading(true);
    try {
      const result = await learnService.learnScreenPaginated({
        page: 1,
        search: searchQuery,
      });
      // @ts-ignore
      setCourses(result.data.courses);
    } finally {
      setLoading(false);
      setSearchTriggered(false);
    }
    fetchCourses(1, searchQuery);
  };

  return (
    <ThemedView style={styles.container}>
      <Search
        showFilter={false}
        searchWord={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchPress={handleSearch}
      />
      {loading && data?.length === 0 ? (
        <ThemedView style={{ paddingTop: 50, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </ThemedView>
      ) : (
        <LearnCardList
          data={courses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/courseDetails",
              params: { data: data.id },
            })
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={loadNextPage}
          loadingMore={loadingMore}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
