import { searchService } from "@/api/services/search.servie";
import LoadingIndicator from "@/components/LoadingIndicator";
import Search from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { categoryReducer, initialState } from "@/reducers/searchReducer";
import { debounce } from "@/utills/debouncer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useReducer, useRef, useState } from "react";
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
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Global debounced handler
  const debouncedSearchHandler = useRef(
    debounce((text: string) => {
      setDebouncedSearch(text);
      dispatch({ type: "RESET" });
    }, 500)
  );

  // Handle initial param value
  useEffect(() => {
    if (data === undefined) return;

    try {
      const parsed = JSON.parse(data as string);
      const value = typeof parsed === "string" ? parsed : String(parsed);
      setSearchQuery(value);
      debouncedSearchHandler.current(value);
    } catch {
      setSearchQuery(String(data));
      debouncedSearchHandler.current(String(data));
    }
  }, [data]);

  // Fetch paginated data on debounced search or page change
  useEffect(() => {
    if (!debouncedSearch) return;

    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const res = await searchService.categoryScreenPaginated({
          search: debouncedSearch,
          page: state.page,
          limit: 10,
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: res.data.categories,
          hasMore: res.data.categories.length >= 10,
        });
        setHasLoadedOnce(true); // ✅ Mark data as loaded after success
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Failed to load categories",
        });
        console.error("Fetch error:", error);
        setHasLoadedOnce(true); // Avoid infinite loading if it fails
      }
    };

    fetchData();
  }, [debouncedSearch, state.page]);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch({ type: "RESET" });

    try {
      const res = await searchService.categoryScreenPaginated({
        search: searchQuery,
        page: 1,
        limit: 10,
      });
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data.categories,
        hasMore: res.data.categories.length >= 10,
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: String(error),
      });
    } finally {
      setRefreshing(false);
    }
  };

  const loadNextPage = () => {
    if (!state.loading && state.hasMore) {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  // ✅ Show loading screen until first successful fetch
  if (!hasLoadedOnce) {
    return <LoadingIndicator onReload={onRefresh} />;
  }

  return (
    <ThemedView style={styles.container}>
      <Search
        showFilter={false}
        showSearch={!!searchQuery}
        searchWord={searchQuery}
        searchFound={state.data.length}
        onSearchChange={(text) => {
          setSearchQuery(text);
          debouncedSearchHandler.current(text);
        }}
        onFilterPress={() => {
          debouncedSearchHandler.current(searchQuery);
        }}
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
                params: { category: category.name },
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
