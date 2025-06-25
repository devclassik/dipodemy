import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { homeService } from "@/api/services/home.service";
import CategoryList from "@/components/CategoryList";
import CourseSection from "@/components/CourseSection";
import Header from "@/components/Header";
import LoadingIndicator from "@/components/LoadingIndicator";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import { router } from "expo-router";

export default function HomeScreen() {
  const [userdata, setUserdata] = useState<any>(null);
  

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Log the actual server response on mount for debugging
    (async () => {
      const res = await homeService.homeScreen();
      console.log("Home Screen Data (awaited):", res);
      setUserdata(res);
    })();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Your reload logic here
      const res = await homeService.homeScreen();
      console.log("Home Screen Data (onRefresh):", res);
      setUserdata(res);
    } catch (error) {
      // Optionally log the error
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!userdata) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Header
          onSearchPress={() => router.navigate("/search")}
          onNotificationsPress={() => router.navigate("/notification")}
          userName={userdata?.data?.name}
        />
        <SpecialOfferBanner specialOffers={userdata?.data?.special_offers} />
      </View>
       <CategoryList
        categories={userdata?.data?.categories}
        onCategoryPress={(cat) => console.log(cat)}
        onSeeAllPress={() => router.navigate("/search")}
      />
      <CourseSection
        title="New Courses"
        courses={userdata?.data?.newest_courses}
        onSeeAllPress={() => router.navigate("/(pages)/popularCourse")}
      />
      <CourseSection
        title="Earn Your Degree"
        courses={userdata?.data?.popular_courses}
        onSeeAllPress={() => router.navigate("/(pages)/courseDetails")}
      />
     <CourseSection
        title="Most Popular Courses"
        courses={userdata?.data?.degree_courses}
        onSeeAllPress={() => router.navigate("/(pages)/popularCourse")}
      /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
