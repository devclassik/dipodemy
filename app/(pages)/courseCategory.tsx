import { learnService } from "@/api/services/learn.service";
import { searchService } from "@/api/services/search.service";
import LearnCardList from "@/components/LearnCardList";
import LoadingIndicator from "@/components/LoadingIndicator";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function CourseCategory() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data } = useLocalSearchParams();

  useEffect(() => {
    let mounted = true;

    const loadInitial = async () => {
      let parsedData: any = null;
      if (data) {
        try {
          parsedData = JSON.parse(data as string);
          setSearchQuery(parsedData.categoryName ?? "");
          setCategoryId(parsedData.id ?? null);
        } catch (e) {
          console.error("Invalid param data", e);
        }
      }

      if (mounted && parsedData.id) {
        await fetchCoursesByCategory(parsedData.id, true);
      }
    };

    loadInitial();

    return () => {
      mounted = false;
    };
  }, []);

  const fetchCoursesByCategory = async (
    id: number,
    isRefresh: boolean = false
  ) => {
    try {
      if (isRefresh) {
        setLoading(true);
      }

      const res = await searchService.categoryScreenIdPaginated(id);
      const results = res.data?.courses.map((course: any) => ({
        ...course,
        category: res.data?.category,
      }));

      setCourses(results);
      setHasMore(false);
      setPage(1);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch courses",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    if (searchTriggered) {
      fetchCourses(1, searchQuery, true);
    } else if (categoryId) {
      fetchCoursesByCategory(categoryId, true);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    router.setParams({});
    setSearchTriggered(true);
    setLoading(true);

    try {
      const res = await learnService.learnScreenPaginated({
        page: 1,
        search: searchQuery,
      });
      console.log(res.data.courses);
      setCourses(res.data.courses);
    } finally {
      setLoading(false);
      setSearchTriggered(false);
    }
  };

  const loadNextPage = () => {
    if (searchTriggered && hasMore && !refreshing && !loadingMore) {
      fetchCourses(page + 1, searchQuery);
    }
  };

  const fetchCourses = async (
    pageToFetch: number,
    query: string = "",
    isRefresh: boolean = false
  ) => {
    try {
      if (!isRefresh && pageToFetch > 1) setLoadingMore(true);

      const res = await learnService.learnScreenPaginated({
        page: pageToFetch,
        search: query,
        limit: 10,
      });

      const results = res.data.courses;

      setCourses((prev) =>
        pageToFetch === 1 ? results : [...prev, ...results]
      );

      setHasMore(res.data.meta.current_page < res.data.meta.last_page);
      setPage(pageToFetch);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch courses",
      });
    } finally {
      if (!isRefresh && pageToFetch > 1) setLoadingMore(false);
      setRefreshing(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Course Category", headerBackTitle: "Back", headerShown: true }} />
      <ThemedView style={styles.container}>
        <Search
          showFilter={false}
          searchWord={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchPress={handleSearch}
        />
        {loading ? (
          <ThemedView style={{ paddingTop: 50, alignItems: "center" }}>
            <LoadingIndicator size="large" />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -80,
  },
});
