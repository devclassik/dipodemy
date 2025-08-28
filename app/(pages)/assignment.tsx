import { learnService } from "@/api/services/learn.service";
import { reviewService } from "@/api/services/review.servce";
import LoadingIndicator from "@/components/LoadingIndicator";
import SubmitAssignmentCard from "@/components/SubmitAssignmentCard";
import { ThemedView } from "@/components/ThemedView";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Assignment = () => {
  const { data } = useLocalSearchParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await learnService.fetchAssignmentScreen(
          data as string | number
        );
        // @ts-ignore
        setCourse(res.data.assignment);
      } catch (error) {
        console.error("Failed to load course data:", error);
      } finally {
        setLoading(false); // ✅ done loading
      }
    };

    fetchCourse();
  }, [data]);

  const submitAssignment = async (id: number, imageUri: string | null) => {
    try {
      await reviewService.addReviewScreen(
        data as string | number,
        imageUri as string
      );
      router.navigate("/(tabs)/course");
    } catch (error) {
      console.error("Error submitting review:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: "Assignment already submitted by you",
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
          title: "Upload Assignment",
          headerShown: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerBackTitle: "Back",
        }}
      />
      <SubmitAssignmentCard
        id={course.id}
        category={course.instructions}
        title={course.title}
        price={course.description}
        rating={course.points}
        // reviews={course.reviews.length || 0}
        // image={course.image}
        submitAssignment={submitAssignment}
      />
    </>
  );
};

export default Assignment;
