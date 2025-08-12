import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { homeService } from "@/api/services/home.service";
import CategoryList from "@/components/CategoryList";
import CourseSection from "@/components/CourseSection";
import Header from "@/components/Header";
import LoadingIndicator from "@/components/LoadingIndicator";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import { router, } from "expo-router";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";


export default function HomeScreen() {
  const [userdata, setUserdata] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const res = await homeService.homeScreen();
        setUserdata(res);

      } catch (error: any) {
        console.log("Home screen error:", error);
      }

    })();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await homeService.homeScreen();
      setUserdata(res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: error as any,
      });
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!userdata) {
    return <LoadingIndicator onReload={onRefresh} />;
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
        onCategoryPress={(cat) =>
          router.navigate({
            pathname: "/search",
            params: {
              data: JSON.stringify(cat.name),
            },
          })
        }
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
        onSeeAllPress={() => router.navigate("/learn")}
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
