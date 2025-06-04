import { ScrollView, StyleSheet, View } from "react-native";

import CategoryList, { Category } from "@/components/CategoryList";
import CourseSection from "@/components/CourseSection";
import Header from "@/components/Header";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";

export default function HomeScreen() {
  const newCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];
  const degreeCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];
  const popularCourses = [
    {
      id: "1",
      image: require("../../assets/images/c1.png"),
      category: "Website Development",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,892",
    },
    {
      id: "2",
      image: require("../../assets/images/c2.png"),
      category: "Graphics Design",
      title: "Professional Course",
      price: "98.00",
      rating: "4.9",
      reviews: "2,101",
    },
    {
      id: "3",
      image: require("../../assets/images/c3.png"),
      category: "IT Support Specialist",
      title: "Professional Certificate",
      price: "120.00",
      rating: "4.8",
      reviews: "1,812",
    },
    {
      id: "4",
      image: require("../../assets/images/c4.png"),
      category: "Marketing",
      title: "Professional Course",
      price: "96.00",
      rating: "4.8",
      reviews: "1,654",
    },
  ];

  const categories: Category[] = [
    { id: "1", label: "Design" },
    { id: "2", label: "Development" },
    { id: "3", label: "Business" },
    { id: "4", label: "Music" },
    { id: "5", label: "IT & Software" },
    { id: "6", label: "Health & Fitness" },
    // ...add more as needed
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Header />
        <SpecialOfferBanner />
      </View>
      <CategoryList
        categories={categories}
        onCategoryPress={(cat) => console.log(cat)}
        onSeeAllPress={() => console.log("See All Categories Pressed")}
      />
      <CourseSection
        title="New Courses"
        courses={newCourses}
        onSeeAllPress={() => console.log("See All Pressed")}
      />
      <CourseSection title="Earn Your Degree" courses={degreeCourses} />
      <CourseSection title="Most Popular Courses" courses={popularCourses} />
    </ScrollView>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
