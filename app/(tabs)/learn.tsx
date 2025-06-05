import LearnCardList from "@/components/LearnCardList";
import Search from "@/components/Search";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function Learn() {
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
  return (
    <ThemedView style={styles.container}>
      <Search />
      <LearnCardList
        data={mockCourses}
        onCardPress={(data) => console.log("card press", data)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
