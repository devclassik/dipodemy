import { learnService } from "@/api/services/learn.service";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingIndicator from "./LoadingIndicator";
import PagesCourseDescription from "./PagesCourseDescription";
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";


export interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  pdf_url: string;
  order: string;
  status: boolean;
  content_type: string;
}

export interface Section {
  id: number;
  title: string;
  description: string;
  order: string;
  status: string;
  lessons: Lesson[];
}
const InstructionSection = () => {
  const { data } = useLocalSearchParams();
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [curriculum, setCurriculum] = useState<Section[]>([]);

  const courseId = useCallback(() => {
    try {
      return data ? JSON.parse(data as string) : null;
    } catch {
      return data;
    }
  }, [data]);

  const fetchCourses = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await learnService.courseDetailScreen(courseId());
      setCourseDetail(res?.data.course || null);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed to fetch courses",
        textBody: (error as any)?.message ?? "Failed to fetch courses, please try again later.",
      });
      console.error("Fetch failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [courseId]);

  const onCurriculumPress = async () => {
    setIsLoading(true);
    try {
      const res = await learnService.curriculumScreen(courseId());
      setCurriculum(res.data.sections);
    } catch (error) {
      console.error("Oops Error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Login Failed",
        textBody: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    onCurriculumPress();
  }, [fetchCourses]);

  const enrollCourse = async () => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "🫥",
      textBody: "Please wait, enrolling in the course...",
    });

    try {
      const res = await learnService.enrollCourse(courseId());
      if (res?.success) {
        // const authorizationUrl = await paystackService.initiatePayment({
        //   amount: res.data.paymentDetails.amount,
        //   email: res.data.paymentDetails.email,
        //   metadata: {
        //     reference: res.data.paymentDetails.reference,
        //     currency: res.data.paymentDetails.currency,
        //     courseId: courseId(),
        //   },
        // });

        router.navigate({
          pathname: "/webView",
          params: {
            url: res.data.payment_data.authorization_url,
          },
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.error || "You are already enrolled in this course",
      });
      console.error("Enrollment Error:", error);
    }
  };

  if (!courseDetail) {
    return <LoadingIndicator onReload={fetchCourses} />;
  }

  return (
    <ScrollView
      style={{ flex: 1,}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchCourses} />
      }
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={{
              uri: courseDetail.image || require("@/assets/images/aiBg.png"),
            }}
            style={styles.avatar}
          />
        }
      >
        <ThemedView style={styles.carOverlay}>
          <PagesCourseDescription
            category={courseDetail?.category?.name || "Dipodemy"}
            title={courseDetail?.description}
            rating={courseDetail?.rating}
            classes={courseDetail?.lessons_count}
            hours={courseDetail?.duration}
            price={courseDetail?.price}
            description={courseDetail?.title}
            curriculum={curriculum}
            review={courseDetail?.reviews}
            courseId={courseDetail?.id}
            onEnroll={enrollCourse}
            onPress={enrollCourse}
          />
        </ThemedView>
      </ParallaxScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: 300,
  },
  carOverlay: {
    marginTop: -20,
  },
});

export default InstructionSection;
