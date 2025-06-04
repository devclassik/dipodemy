import LearnCardList from "@/components/LearnCardList";
import Search from "@/components/Search";
import { ScrollView, StyleSheet } from "react-native";

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Search />
      <LearnCardList
        data={mockCourses}
        onCardPress={(data) => console.log("card press", data)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  //   titleContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
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
  //     position: "absolute",
  //   },
  container: {
    flex: 1,
  },
});
