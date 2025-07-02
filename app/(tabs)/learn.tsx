import { learnService } from "@/api/services/learn.service";
import LearnCardList from "@/components/LearnCardList";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Learn() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data } = useLocalSearchParams();

  console.log("na here", data);

  useEffect(() => {
    let value = "";
    if (data) {
      try {
        const parsed = JSON.parse(data as string);
        value = typeof parsed === "string" ? parsed : String(parsed);
      } catch {
        value = String(data);
      }
    }
    setSearchQuery(value);
    fetchCourses(1, value, true);
  }, [data]);

  const fetchCourses = async (
    pageNum: number,
    search: string = "",
    replace: boolean = false
  ) => {
    if (replace) setRefreshing(true);
    try {
      const res = await learnService.learnScreenPaginated({
        page: pageNum,
        limit: 10,
        search: search || undefined,
      });

      const newCourses = res?.data?.courses ?? [];
      const currentPage = res?.data?.meta?.current_page ?? pageNum;
      const lastPage = res?.data?.meta?.last_page ?? currentPage;

      setCourses((prev) => (replace ? newCourses : [...prev, ...newCourses]));
      setPage(pageNum);
      // setHasMore(res?.data?.meta?.current_page < res?.data?.meta?.last_page);
      setHasMore(currentPage < lastPage);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch courses",
      });
      console.error("Fetch failed:", error);
    } finally {
      if (replace) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchCourses(1, searchQuery, true);
  };

  const loadNextPage = () => {
    if (hasMore && !refreshing) {
      fetchCourses(page + 1, searchQuery);
    }
  };

  const handleSearchSubmit = () => {
    fetchCourses(1, searchQuery, true);
  };

  return (
    <ThemedView style={styles.container}>
      <Search
        showFilter={false}
        searchWord={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchPress={handleSearchSubmit}
      />
      <LearnCardList
        data={courses}
        onCardPress={(data) =>
          router.navigate({
            pathname: "/courseDetails",
            params: { data: data.id },
          })
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadNextPage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
