import { learnService } from "@/api/services/learn.service";
import { searchService } from "@/api/services/search.service";
import { Category } from "@/components/CategoryList";
import PopularCourseScreen from "@/components/PopularCourseScreen";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export interface CourseItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  discount_price: string | null;
  rating: string;
  is_enrolled: boolean;
  enrollments: number;
  reviews_count: number;
  level: string;
  duration: string;
  status: string;
  slug: string;
  lessons_count: number;
  category: Category;
}

const PopularCourse = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchCategory = async () => {
    try {
      const res = await searchService.categoryScreenPaginated({
        page: 1,
        limit: 20,
      });
      const newCategories = res?.data?.categories ?? [];
      setCategories(newCategories);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message || "Failed to load categories",
      });
    }
  };

  const fetchCourses = async (pageNum: number = 1, replace = false) => {
    if (replace) {
      setIsInitialLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    console.log('query', query);
    
    try {
      const res = await learnService.learnScreenPaginated({
        search: query,
        page: pageNum,
        limit: 20,
      });

      const newCourses = res?.data?.courses ?? [];
      const meta = res?.data?.meta;
      const currentPage = meta?.current_page ?? pageNum;
      const lastPage = meta?.last_page ?? currentPage;

      setCourses((prev) => (replace ? newCourses : [...prev, ...newCourses]));
      setHasMore(currentPage < lastPage);
      setPage(currentPage);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message ?? "Failed to load courses",
      });      
    } finally {
      setIsInitialLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchCourses(1, true);
  }, []);

  const handleLoadMore = () => {
    if (!isFetchingMore && hasMore) {
      fetchCourses(page + 1);
    }
  };

  const handleRefresh = async () => {
    setPage(1);
    fetchCourses(1, true);
  };

  const handleSearchSectionPress = (category: Category) => {
    if (category.name === query) return;
    setQuery(category.name);
    setPage(1);
    fetchCourses(1, true);

    console.log(category.name);
    
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Popular Course",
          headerBackTitle: "Back",
          headerShown: true,
        }}
      />
      <PopularCourseScreen
        sections={categories}
        onSectionPress={handleSearchSectionPress}
        courses={courses}
        onCardPress={(data) =>
          router.navigate({
            pathname: "/(pages)/courseDetails",
            params: { data: data.id },
          })
        }
        isLoading={isInitialLoading}
        isFetching={isFetchingMore}
        handleRefresh={handleRefresh}
        fetchMoreCourse={handleLoadMore}
      />
    </>
  );
};

export default PopularCourse;
