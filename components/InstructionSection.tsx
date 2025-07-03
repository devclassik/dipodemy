import { learnService } from "@/api/services/learn.service";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingIndicator from "./LoadingIndicator";
// import PagesCourseDescription from "./PagesCourseDescription";
import PagesCourseDescription from "./PagesCourseDescription";
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedView } from "./ThemedView";

const InstructionSection = () => {
  const { data } = useLocalSearchParams();
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const courseId = useCallback(() => {
    try {
      return data ? JSON.parse(data as string) : null;
    } catch {
      return data;
    }
  }, [data]);

  console.log("Course passed from url:", data);

  const fetchCourses = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await learnService.courseDetailScreen(courseId());
      console.log("Fetched data:", res.data);

      setCourseDetail(res?.data.course || null);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: (error as any)?.message ?? "Failed to fetch courses",
      });
      console.error("Fetch failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const enrollCourse = async () => {
    Toast.show({
      type: ALERT_TYPE.INFO,
      title: "info",
      textBody: "Please wait, enrolling in the course...",
    });
    console.log("Enrolling in course with ID:", courseId());
    
    try {
      const res = await learnService.enrollCourse(courseId());
      console.log("Enrollment Response:", res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: (error as any)?.message || "Failed to enroll in the course",
      });
      console.error("Enrollment Error:", error);
    }
  };

  if (!courseDetail) {
    return <LoadingIndicator onReload={fetchCourses} />;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
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
            category={courseDetail?.category?.name}
            title={courseDetail?.description}
            rating={courseDetail?.rating}
            classes={courseDetail?.lessons_count}
            hours={courseDetail?.duration}
            price={courseDetail?.price}
            description={courseDetail?.title}
            // curriculum={curriculum}
            review={courseDetail?.reviews}
            courseId={courseDetail?.id}
            onEnroll={enrollCourse}
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
