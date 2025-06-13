import OngoingCourseScreen, {
  TabOptionsScreen,
} from "@/components/OngoingCourseScreen";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";

const OngoingCourse = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] =
    useState<TabOptionsScreen["options"]>("Completed");

  const mockPrograms = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      title: "Mobile UI Essentials",
      category: "Intermediate",
      lessons: 28,
      rating: 4.8,
      duration: "6h 30min",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      title: "UI Animation Basics",
      category: "Beginner",
      lessons: 24,
      rating: 4.9,
      duration: "3h 42min",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      title: "Web UI Best Practices",
      category: "Advanced",
      lessons: 46,
      rating: 4.8,
      duration: "8h 43min",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      title: "Prototype with Figma",
      category: "Intermediate",
      lessons: 39,
      rating: 4.8,
      duration: "2h 34min",
    },
    {
      id: "5",
      image: require("../../assets/images/c4.png"),
      title: "Prototype with Figma",
      category: "Intermediate",
      lessons: 39,
      rating: 4.8,
      duration: "2h 34min",
    },
    {
      id: "6",
      image: require("../../assets/images/c4.png"),
      title: "Prototype with Figma",
      category: "Intermediate",
      lessons: 39,
      rating: 4.8,
      duration: "2h 34min",
    },
  ];

  useEffect(() => {
    fetchData(selectedTab);
  }, []);

  const fetchData = async (tab: TabOptionsScreen["options"]) => {
    try {
      // Replace this mock logic with actual API calls in the future:
      // const data = tab === "Completed"
      //   ? await getCompletedCourses()
      //   : await getProgressCourses();
      const data = mockPrograms;
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTabChange = async (newTab: TabOptionsScreen["options"]) => {
    setSelectedTab(newTab);
    await fetchData(newTab);
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Ongoing/Completed Course", headerShown: true }}
      />
      <OngoingCourseScreen
        courses={programs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        isCompleted={selectedTab === "Completed"}
        isCompletedActions={
          () => router.navigate("/(pages)/certificate")
          //             router.navigate({
          //   pathname: "/(pages)/myCourse",
          //   params: { data: JSON.stringify(data) },
          // })
        }
        isProgress={selectedTab === "Ongoing"}
      />
    </>
  );
};

export default OngoingCourse;
