import { courseService } from "@/api/services/courses.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import OngoingCourseScreen, {
  TabOptionsScreen,
} from "@/components/OngoingCourseScreen";
import { ThemedView } from "@/components/ThemedView";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const OngoingCourse = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] =
    useState<TabOptionsScreen["options"]>("ongoing");
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadCourses(1, selectedTab, { initial: true });
  }, []);

  const loadCourses = async (
    pageNum: number,
    status: string = "",
    options: { refresh?: boolean; initial?: boolean } = {}
  ) => {
    const isRefresh = options.refresh;
    const isInitial = options.initial;
    setIsLoading(true);
    try {
      if (isInitial) setLoading(true);
      if (isRefresh) setRefreshing(true);
      if (!isInitial && !isRefresh) setLoadingMore(true);

      const res = await courseService.learnScreenPaginated({
        page: pageNum,
        status,
        limit: 10,
      });

      const newCourses = res.data.courses;
      const meta = res.data.meta;

      setCourses((prev) =>
        pageNum === 1 ? newCourses : [...prev, ...newCourses]
      );
      setHasMore(meta.current_page < meta.last_page);
      setPage(meta.current_page);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message ?? "Failed to load courses",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
      setIsLoading(false);
    }
  };

  const handleTabChange = async (newTab: TabOptionsScreen["options"]) => {
    setSelectedTab(newTab);
    await loadCourses(1, newTab, { initial: true });
  };

  const handleRefresh = () => {
    loadCourses(1, selectedTab, { refresh: true });
  };

  const handleLoadMore = () => {
    if (hasMore && !loading && !refreshing) {
      loadCourses(page + 1, status);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const result = await courseService.learnScreenPaginated({
        page: 1,
        search: searchQuery,
      });
      setCourses(result.data.courses);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Ongoing/Completed Course", headerShown: true }}
      />
      {loading ? (
        <ThemedView style={{ paddingTop: 50, alignItems: "center" }}>
          <LoadingIndicator size="large" onReload={handleRefresh} />
        </ThemedView>
      ) : (
        <OngoingCourseScreen
          courses={courses}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          isCompleted={selectedTab === "completed"}
          isCompletedActions={
            () => router.navigate("/(pages)/certificate")
            //             router.navigate({
            //   pathname: "/(pages)/myCourse",
            //   params: { data: JSON.stringify(data) },
            // })
          }
          isProgress={selectedTab === "ongoing"}
          setSearchQuery={(query) => setSearchQuery(query)}
          handleSearch={handleSearch}
          refreshing={loading}
          onRefresh={handleRefresh}
          loadingMore={loadingMore}
          onLoadMore={handleLoadMore}
          onCardPress={(data) => 
            router.navigate({
              pathname: "/(pages)/courseContent",
              params: { data: JSON.stringify(data) },
            })
          }
        />
      )}
    </>
  );
};

export default OngoingCourse;
