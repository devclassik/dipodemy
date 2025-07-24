import { ThemedView } from "@/components/ThemedView";
import { ResizeMode, Video } from "expo-av";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function VideoPlayerScreen() {
  const { url } = useLocalSearchParams();
  const video = useRef(null);
  const [status, setStatus] = useState<any>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Video player",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: url as string }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </ThemedView>
    </>
  );
}

const windowWidth = Dimensions.get("window").width;
const videoHeight = (windowWidth * 9) / 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: videoHeight,
  },
});
