import { searchService } from "@/api/services/search.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import Search from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { categoryReducer, initialState } from "@/reducers/searchReducer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useReducer, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

interface Category {
  id: number;
  name: string;
  image: string;
  status: boolean;
}

export default function SearchScreen() {
  const { data } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!data) return;

    try {
      const parsed = JSON.parse(data as string);
      const value = typeof parsed === "string" ? parsed : String(parsed);
      setSearchQuery(value);
    } catch {
      const fallback = String(data);
      setSearchQuery(fallback);
    }
  }, [data]);

  const fetchData = async (searchText: string, page: number) => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await searchService.categoryScreenPaginated({
        search: searchText,
        page,
        limit: 10,
      });
       
      const newItems = res.data.categories;

      // Optional: prevent fetch if results are identical
      const existingIds = new Set(state.data.map((item) => item.id));
      const filtered = newItems.filter((item) => !existingIds.has(item.id));

      dispatch({
        type: "FETCH_SUCCESS",
        payload: filtered,
        hasMore: newItems.length >= 10,
      });
      setHasLoadedOnce(true);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any) || "Failed to load categories",
      });
      setHasLoadedOnce(true);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch({ type: "RESET" });
    await fetchData(searchQuery, 1);
    setRefreshing(false);
  };

  const loadNextPage = () => {
    if (!state.loading && state.hasMore) {
      dispatch({ type: "NEXT_PAGE" });
      fetchData(searchQuery, state.page + 1);
    }
  };

  const onSearchPress = () => {
    dispatch({ type: "RESET" });
    setHasLoadedOnce(false);
    fetchData(searchQuery, 1);
  };

  if (state.loading && !hasLoadedOnce) {
    return <LoadingIndicator onReload={onRefresh} />;
  }

  return (
    <ThemedView style={styles.container}>
      <Search
        showFilter={false}
        showSearch={!!searchQuery}
        searchWord={searchQuery}
        searchFound={state.data.length}
        onSearchChange={(text) => setSearchQuery(text)}
        onSearchPress={onSearchPress}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onMomentumScrollEnd={loadNextPage}
      >
        {state.data.map((category: Category, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() =>
              router.navigate({
                pathname: "/learn",
                params: { data: category.id },
              })
            }
          >
            <Image source={{ uri: category.image }} style={styles.avatar} />
            <ThemedText style={styles.categoryTitle}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
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
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
