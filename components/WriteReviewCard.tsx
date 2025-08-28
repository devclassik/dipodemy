import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export interface WriteReviewCardProps {
  id?: number;
  category?: string;
  title?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  image?: any;
  submitReview?: (id: any, imageUri: string | null, comment: string) => void;
}

const MAX_CHARACTERS = 250;

const WriteReviewCard: React.FC<WriteReviewCardProps> = ({
  id,
  category,
  title,
  price,
  rating,
  reviews,
  image,
  submitReview,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };
  const handleSubmit = () => {
    if (reviewText.trim() === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please write a review before submitting.",
      });
      return;
    }
    submitReview?.(id, media, reviewText);
    setMedia(null);
    setReviewText("");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.category}>{category}</ThemedText>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.price}>{price}</ThemedText>
          <View style={styles.row}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <ThemedText style={styles.rating}>
              {rating} | {reviews} reviews
            </ThemedText>
          </View>
        </View>
      </ThemedView>
      {/* <ThemedText style={styles.label}>Add Photo (or) Video</ThemedText> */}
      {/* <TouchableOpacity
        style={[styles.uploadBox, { backgroundColor: colors.border }]}
        onPress={pickMedia}
      >
        {media ? (
          <Image source={{ uri: media }} style={styles.preview} />
        ) : (
          <Image
            source={require("@/assets/images/exportIcon.png")}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity> */}
      <ThemedText style={styles.label}>Write you Review</ThemedText>

      <ThemedView style={styles.textBoxContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="Would you like to write anything about this Product?"
          multiline
          maxLength={MAX_CHARACTERS}
          value={reviewText}
          onChangeText={setReviewText}
        />
        <ThemedText style={[styles.charCount, { color: colors.textMuted }]}>
          *{MAX_CHARACTERS - reviewText.length} Characters Remaining
        </ThemedText>
      </ThemedView>
      <RoundedActionButton
        text="Submit Review"
        icon={<Ionicons name="arrow-forward" size={24} color={colors.green} />}
        onPress={handleSubmit}
        style={{
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 40,
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "600",
    paddingVertical: 10,
  },
  uploadBox: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  preview: {
    width: "50%",
    height: "100%",
    borderRadius: 16,
    elevation: 1,
  },
  textBoxContainer: {
    borderRadius: 16,
    backgroundColor: "#f9faff",
    padding: 12,
  },
  textBox: {
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 14,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  category: {
    color: "#FF8500",
    fontSize: 14,
    marginBottom: 2,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  price: {
    color: "#1A9E4F",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    elevation: 2,
  },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    marginTop: 8,
  },
});

export default WriteReviewCard;
