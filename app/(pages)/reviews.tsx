import { reviewService } from "@/api/services/review.servce";
import CustomModal from "@/components/CustomModal";
import LoadingIndicator from "@/components/LoadingIndicator";
import ReviewCard from "@/components/ReviewCard";
import { Colors } from "@/constants/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export interface Reviews {
  id: number;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  created_at: string;
  time_ago: string;
}

interface ReviewProps {
  canWrite?: boolean;
}

const Reviews: FC<ReviewProps> = ({ canWrite = false }) => {
  const { data } = useLocalSearchParams();
  const courseId = data ? JSON.parse(data as string) : null;
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!courseId) return;
    setRefreshing(true);
    try {
      const res = await reviewService.reviewScreen(courseId);
      setReviews(res?.data?.reviews ?? []);
      if (res?.data?.reviews?.length === 0) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch reviews",
      });
      console.error("Fetch error:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleModalClose = () => setShowModal(false);

  if (loading) {
    return <LoadingIndicator onReload={fetchReviews} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Reviews",
          headerShown: true,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchReviews} />
        }
      >
        {showModal ? (
          <CustomModal
            visible={showModal}
            onClose={handleModalClose}
            lottieSource={require("@/assets/lottie/alert.json")}
            imageSource={require("@/assets/images/noCourse.png")}
            caption="No Review Yet"
            loading={false}
            buttonText="ok"
            onButtonPress={() => {
              handleModalClose();
              router.back();
            }}
          />
        ) : (
          <ReviewCard reviews={reviews} />
        )}
      </ScrollView>
    </>
  );
};

export default Reviews;
