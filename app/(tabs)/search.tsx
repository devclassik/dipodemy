import { searchService } from "@/api/services/search.service";
import { Category } from "@/components/CategoryList";
import LoadingIndicator from "@/components/LoadingIndicator";
import Search from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function SearchScreen() {
  const { data } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

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
    fetchData(1, value, true);
  }, [data]);

  const fetchData = async (
    pageNum: number,
    search: string = "",
    replace: boolean = false
  ) => {
    if (replace) setRefreshing(true);
    try {
      const res = await searchService.categoryScreenPaginated({
        page: pageNum,
        limit: 10,
        search: search,
      });
            // @ts-ignore
      const newCategories = res?.data?.categories ?? [];
            // @ts-ignore
      const meta = res?.data?.meta;
      const currentPage = meta?.current_page ?? pageNum;
      const lastPage = meta?.last_page ?? currentPage;
      setCategories((prev) =>
        replace ? newCategories : [...prev, ...newCategories]
      );
      setPage(pageNum);
      setHasMore(currentPage < lastPage);
      setHasLoadedOnce(true);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message || "Failed to load categories",
      });
      setHasLoadedOnce(true);
    } finally {
      if (replace) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchData(1, searchQuery, true);
  };

  const loadNextPage = () => {
    if (hasMore && !refreshing) {
      fetchData(page + 1, searchQuery);
    }
  };

  const handleSearchSubmit = () => {
    fetchData(1, searchQuery, true);
  };

  if (!hasLoadedOnce && refreshing) {
    return <LoadingIndicator onReload={onRefresh} />;
  }

  return (
    <ThemedView style={styles.container}>
      <Search
        showFilter={false}
        showSearch={!!searchQuery}
        searchWord={searchQuery}
        searchFound={categories.length}
        onSearchChange={setSearchQuery}
        onSearchPress={handleSearchSubmit}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onMomentumScrollEnd={loadNextPage}
      >
        {categories.map((category: Category, index: number) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() =>
              router.navigate({
                pathname: "/(pages)/courseCategory",
                params: {
                  data: JSON.stringify({
                    categoryName: category.name,
                    id: category.id,
                  }),
                },
              })
            }
          >
            <Image source={{ uri: category.image }} style={styles.avatar} />
            <ThemedText style={styles.categoryTitle}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
        {categories.length === 0 && hasLoadedOnce && (
          <View style={{ width: "100%", alignItems: "center", marginTop: 32 }}>
            <ThemedText>No categories found.</ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});
