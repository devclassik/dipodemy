import { courseService } from "@/api/services/courses.service";
import CustomModal from "@/components/CustomModal";
import LoadingIndicator from "@/components/LoadingIndicator";
import MyCourseScreen from "@/components/MyCourseScreen";
import { Colors } from "@/constants/Colors";
import { categoryReducer, initialState } from "@/reducers/searchReducer";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import React, { useCallback, useReducer, useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const BoughtCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchData = async () => {
    try {
      if (state.page === 1) dispatch({ type: "FETCH_START" });
      else setIsFetchingMore(true);

      const res = await courseService.learnScreenPaginated({
        search: "",
        page: state.page,
        limit: 10,
      });

      console.log("Fetched data:", res.data);

      const newItems = res.data.courses;

      if (newItems.length === 0 && state.page === 1) {
        dispatch({ type: "FETCH_SUCCESS", payload: [], hasMore: false });
        setShowModal(true);
        return;
      }

      dispatch({
        type: "FETCH_SUCCESS",
        payload: newItems,
        hasMore: newItems.length >= 10,
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message ?? "Failed to load categories",
      });
      dispatch({ type: "FETCH_SUCCESS", payload: [], hasMore: false });
    } finally {
      setIsFetchingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [state.page])
  );

  const handleLoadMore = () => {
    if (!state.loading && !isFetchingMore && state.hasMore) {
      dispatch({ type: "NEXT_PAGE" });
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

      {state.loading && state.page === 1 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingIndicator
            size="large"
            color={colors.accent}
            onReload={fetchData}
          />
        </View>
      ) : state.data.length !== 0 ? (
        <MyCourseScreen
          courses={courses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/(pages)/courseContent",
              params: { data: JSON.stringify(data) },
            })
          }
          isCompleted={false}
          onEndReached={handleLoadMore}
          isFetchingMore={isFetchingMore}
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
