import { courseService } from "@/api/services/courses.service";
import CustomModal from "@/components/CustomModal";
import LoadingIndicator from "@/components/LoadingIndicator";
import MyCourseScreen from "@/components/MyCourseScreen";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";


const BoughtCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("all");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadCourses(1, status, { initial: true });
    }
  }, [isFocused, status]);

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
      // @ts-ignore
      const newCourses = res.data.courses;

      if (newCourses.length === 0) {
       return  setShowModal(true)
      }
      // @ts-ignore
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

  const handleRefresh = () => {
    loadCourses(1, status, { refresh: true });
  };

  const handleIsCompleted = (value: boolean) => {
    setStatus(value ? "completed" : "ongoing");
    loadCourses(1, status, { refresh: true });
  };

  const handleLoadMore = () => {
    if (hasMore && !loading && !refreshing) {
      loadCourses(page + 1, status);
    }
  };

  const handleModalClose = () => setShowModal(false);

  const handleFilterPress = () => {
    router.navigate("/(pages)/ongoingCourse");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Courses",
          headerShown: true,
          headerBackTitle: "Back",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleFilterPress}
              style={{ marginRight: 16 }}
            >
              <MaterialIcons name="tune" size={24} color={colors.accent} />
            </TouchableOpacity>
          ),
        }}
      />

      {loading && courses.length === 0 ? (
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingIndicator
            size="large"
            color={colors.accent}
            onReload={handleRefresh}
          />
        </ThemedView>
      ) : courses.length > 0 ? (
        <MyCourseScreen
          courses={courses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/(pages)/courseContent",
              params: { data: JSON.stringify(data) },
            })
          }
          isCompleted={status === "completed"}
          isCompletedAction={(event?: any) => handleIsCompleted(event)}
          onEndReached={handleLoadMore}
          isFetchingMore={loadingMore}
          isLoading={isLoading}
          handleRefresh={handleRefresh}
        />
      ) : (
        <CustomModal
          visible={showModal}
          onClose={handleModalClose}
          lottieSource={require("@/assets/lottie/alert.json")}
          imageSource={require("@/assets/images/noCourse.png")}
          caption="No Course Enrolled!"
          loading={false}
          buttonText="Enroll Course"
          onButtonPress={() => {
            handleModalClose();
            router.replace("/(tabs)/learn");
          }}
        />
      )}
    </>
  );
};

export default BoughtCourse;
