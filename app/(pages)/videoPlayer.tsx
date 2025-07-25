import LoadingIndicator from "@/components/LoadingIndicator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ResizeMode, Video } from "expo-av";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function VideoPlayerScreen() {
  const { url } = useLocalSearchParams();
  const video = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start 2-minute timeout
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 120000); // 2 minutes in milliseconds

    return () => {
      // Cleanup on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLoadSuccess = () => {
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLoadError = () => {
    setIsLoading(false);
    setHasError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Video player",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        {isLoading && <LoadingIndicator />}

        {hasError ? (
          <ThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ThemedText>
              Error loading video. Please try again later.
            </ThemedText>
          </ThemedView>
        ) : (
          <Video
            style={styles.video}
            source={{ uri: url as string }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            onLoadStart={() => setIsLoading(true)}
            onReadyForDisplay={handleLoadSuccess}
            onError={handleLoadError}
          />
        )}
        {/* <VideoView
          style={styles.video}
          source={{ uri: url as string }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onLoadStart={() => setIsLoading(true)}
          onReadyForDisplay={handleLoadSuccess}
          onError={handleLoadError}
        /> */}
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
