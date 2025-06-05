import Search from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function SearchScreen() {
  const categories = [
    {
      id: 1,
      title: "3D Design ",
      image: require("@/assets/images/3d.png"),
    },
    {
      id: 2,
      title: "Graphics Design",
      image: require("@/assets/images/gr.png"),
    },
    {
      id: 3,
      title: "Web Development",
      image: require("@/assets/images/wb.png"),
    },
    {
      id: 4,
      title: "SEO & Marketing",
      image: require("@/assets/images/seo.png"),
    },
    {
      id: 5,
      title: "Finance & Accounting",
      image: require("@/assets/images/fin.png"),
    },
    {
      id: 6,
      title: "HR Management",
      image: require("@/assets/images/hr.png"),
    },
    {
      id: 7,
      title: "Personal Development",
      image: require("@/assets/images/per.png"),
    },
    {
      id: 8,
      title: "Office Productivity",
      image: require("@/assets/images/office.png"),
    },
    {
      id: 8,
      title: "Artificial Intelligence",
      image: require("@/assets/images/ai.png"),
    },
    {
      id: 8,
      title: "Health & Fitness",
      image: require("@/assets/images/hlth.png"),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Search showFilter={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => {
              console.log(`Selected category: ${category.title}`);
              router.navigate({
                pathname: "/learn",
                params: { category: category.title },
              });
            }}
          >
            <Image source={category.image} style={styles.avatar} />
            <ThemedText style={styles.categoryTitle}>
              {category.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
