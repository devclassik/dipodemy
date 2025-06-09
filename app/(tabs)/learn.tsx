import LearnCardList from "@/components/LearnCardList";
import MentorCard from "@/components/MentorCard";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function Learn() {
  const [selectedTab, setSelectedTab] = useState<"Courses" | "Mentors">(
    "Courses"
  );

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
          data={mockCourses}
          onCardPress={(data) =>
            router.navigate({
              pathname: "/courseDetails",
              params: { data: JSON.stringify(data) },
            })
          }
        />
      ) : (
        <MentorCard item={mockMentors} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
