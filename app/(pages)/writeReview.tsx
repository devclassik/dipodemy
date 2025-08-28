import { learnService } from "@/api/services/learn.service";
import { reviewService } from "@/api/services/review.servce";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ThemedView } from "@/components/ThemedView";
import WriteReviewCard from "@/components/WriteReviewCard";
import { Colors } from "@/constants/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const WriteReviews = () => {
  const { data } = useLocalSearchParams();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await learnService.fetchCourseScreen(
          data as string | number
        );
        // @ts-ignore
        setCourse(res?.data?.course);
      } catch (error) {
        console.error("Failed to load course data:", error);
      } finally {
        setLoading(false); // ✅ done loading
      }
    };

    fetchCourse();
  }, [data]);

  const submitReview = async (
    id: number,
    imageUri: string | null,
    comment: string
  ) => {
    try {
      await reviewService.addReviewScreen(
        data as string | number,
        comment,
        imageUri
      );
      router.navigate("/(tabs)/course");
    } catch (error) {
      console.error("Error submitting review:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: "Review already submitted by you",
      });
    }
  };

  if (loading || !course) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <LoadingIndicator />
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Write Review",
          headerShown: true,
          headerBackTitle: "Back",
        }}
      />
      <WriteReviewCard
        id={course?.id}
        category={course?.category?.name}
        title={course?.title}
        price={course?.price}
        rating={course?.rating}
        reviews={course?.reviews.length || 0}
        image={course?.image}
        submitReview={submitReview}
      />
    </>
  );
};

export default WriteReviews;
