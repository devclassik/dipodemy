import { learnService } from "@/api/services/learn.service";
import LearnCardList from "@/components/LearnCardList";
import MentorCard from "@/components/MentorCard";
import { TabOptionsScreen } from "@/components/OngoingCourseScreen";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Learn() {
  const [selectedTab, setSelectedTab] =
    useState<TabOptionsScreen["options"]>("Courses");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data } = useLocalSearchParams();

  console.log(data);

  useEffect(() => {
    if (!data) {
      fetchCourses(1, "");
    } else {
      let value = "";
      try {
        const parsed = JSON.parse(data as string);
        value = typeof parsed === "string" ? parsed : String(parsed);
      } catch {
        value = String(data);
      }
      setSearchQuery(value);
      fetchCourses(1, value, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetchCourses = async (
    pageNum: number,
    search: string = "",
    replace: boolean = false
  ) => {
    setRefreshing(true);
    try {
      const res = await learnService.learnScreenPaginated({
        page: pageNum,
        limit: 10,
        search: search || undefined,
      });
      const newCourses = res?.data?.categories || [];
      setCourses((prev) => (replace ? newCourses : [...prev, ...newCourses]));
      setPage(pageNum);
      setHasMore(res?.data?.meta?.current_page < res?.data?.meta?.last_page);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: error as any,
      });
      console.error("Fetch failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchCourses(1, searchQuery, true);
  };

  const loadNextPage = () => {
    if (hasMore && !refreshing) {
      fetchCourses(page + 1, searchQuery);
    }
  };

  const mockCourses = [
    {
      id: "1",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "89/-",
      rating: 4.9,
      reviews: 7830,
      image: require("@/assets/images/c1.png"),
    },
    {
      id: "2",
      category: "Graphic Design",
      title: "Advance Diploma in Gra..",
      price: "800/-",
      rating: 4.1,
      reviews: 12680,
      image: require("@/assets/images/c2.png"),
    },
    {
      id: "3",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "799/-",
      rating: 4.0,
      reviews: 990,
      image: require("@/assets/images/c3.png"),
    },
    {
      id: "4",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "89/-",
      rating: 4.9,
      reviews: 7830,
      image: require("@/assets/images/c1.png"),
    },
    {
      id: "5",
      category: "Graphic Design",
      title: "Advance Diploma in Gra..",
      price: "800/-",
      rating: 4.1,
      reviews: 12680,
      image: require("@/assets/images/c2.png"),
    },
    {
      id: "6",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "799/-",
      rating: 4.0,
      reviews: 990,
      image: require("@/assets/images/c3.png"),
    },
    {
      id: "7",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "89/-",
      rating: 4.9,
      reviews: 7830,
      image: require("@/assets/images/c1.png"),
    },
    {
      id: "8",
      category: "Graphic Design",
      title: "Advance Diploma in Gra..",
      price: "800/-",
      rating: 4.1,
      reviews: 12680,
      image: require("@/assets/images/c2.png"),
    },
    {
      id: "9",
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      price: "799/-",
      rating: 4.0,
      reviews: 990,
      image: require("@/assets/images/c3.png"),
    },
  ];

  const mockMentors = [
    {
      id: "1",
      name: "Ramal",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    {
      id: "2",
      name: "Aman MK",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    {
      id: "3",
      name: "Manav M",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    {
      id: "4",
      name: "Ramal",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    {
      id: "5",
      name: "Aman MK",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    {
      id: "6",
      name: "Manav M",
      specialty: "3D Design",
      avatar: require("@/assets/images/avatar.png"),
    },
    // ... add more
  ];

  return (
    <ThemedView style={styles.container}>
      <Search selectedTab={selectedTab} onTabChange={setSelectedTab} />
      {selectedTab === "Courses" ? (
        <LearnCardList
          data={courses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/courseDetails",
              params: { data: JSON.stringify(data) },
            })
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadNextPage}
        />
      ) : (
        <MentorCard
          item={mockMentors}
          onPress={() =>
            router.navigate({
              pathname: "/(pages)/courseDetails",
              params: { data: JSON.stringify(mockMentors) },
            })
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
