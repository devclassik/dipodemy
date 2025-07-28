import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedView } from "./ThemedView";

interface FooterActionProps {
  avatar?: any;
  text?: string;
  onCertPress?: () => void;
  onButtonPress: () => void;
  isFresh?: boolean;
}

const FooterAction: React.FC<FooterActionProps> = ({
  avatar,
  text = "Start Course Again",
  onCertPress,
  onButtonPress,
  isFresh,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={[styles.card, {backgroundColor: colors.white}]} onPress={onCertPress}>
        <Image
          source={avatar || require("@/assets/images/certi.png")}
          style={[styles.avatar, isFresh ? { tintColor: colors.textMuted } : {}]}
        />
      </TouchableOpacity>
      <RoundedActionButton
        icon={<Ionicons name="arrow-forward" size={24} color={colors.green} />}
        onPress={onButtonPress}
        text={text}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#f0f0f0",
    height: 50,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    // alignItems: "center",
    // height: 50,
    // minWidth: 150,
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // padding: 50

    // tintColor: "#666",

    resizeMode: "contain",
  },
});

export default FooterAction;
