import { profileService } from "@/api/services/profile.service";
import { tokenService } from "@/api/services/token.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ProfileScreen = () => {
  const [userdata, setUserdata] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [media, setMedia] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const logout = async () => {
    await AsyncStorage.clear();
    await tokenService.clearAll();
    router.replace("../splash");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await profileService.profileScreen();
      setUserdata(res);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Oops",
        textBody: error as any,
      });
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await profileService.profileScreen();
      setUserdata(res);
    })();
  }, []);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Permission Required",
        textBody: "Please allow access to your media library.",
      });
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setMedia(uri);

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const dataUri = `data:image/jpeg;base64,${base64}`;

        const data = {
          first_name: userdata?.data?.user?.first_name,
          last_name: userdata?.data?.user?.last_name,
          image: dataUri,
        }
        await profileService.updateProfileScreen(data)

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Image Selected",
          textBody: "updating your media.",
        });
      }
    } catch (error) {
      console.error("Error requesting media library permissions:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Unable to request media library permissions.",
      });
      return;
    }
  };

  const openEditProfileModal = () => {
    setFirstName(userdata?.data?.user?.first_name || "");
    setLastName(userdata?.data?.user?.last_name || "");
    setIsModalVisible(true);
  };


  if (!userdata) {
    return <LoadingIndicator onReload={onRefresh} />;
  }

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle} onPress={() => router.back()}>
          Profile
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.profileImageContainer}>
          {media ? (
            <Image source={{ uri: media }} style={styles.profileImage} />
          ) : (
            <Image
              source={{
                uri: userdata?.data?.user?.image_url,
              }}
              style={styles.profileImage}
            />
          )}
        </View>
        <TouchableOpacity onPress={pickMedia}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="#000"
            style={{ position: "absolute", top: -85, left: 25 }}
          />
        </TouchableOpacity>

        <Text style={styles.name}>
          {userdata?.data?.user?.first_name} {userdata?.data?.user?.last_name}
        </Text>
        <Text style={styles.email}>{userdata?.data?.user?.email}</Text>
        <View style={styles.optionList}>
          {/* <OptionItem
            icon="credit-card"
            text="Payment Option"
            onPress={() => router.navigate("/(pages)/paymentMethod")}
          /> */}
          <OptionItem
            icon="update-profile"
            text="Edit profile"
            onPress={openEditProfileModal}

          />
          <OptionItem
            icon="notifications"
            text="Notifications"
            onPress={() => router.navigate("/notification")}
          />
          <OptionItem
            icon="language"
            text="Language"
            rightText="English (US)"
            rightTextColor="#0066cc"
          />
          <OptionItem icon="description" text="Terms & Conditions" />
          <OptionItem
            icon="change-password"
            text="Change Password"
            onPress={() =>
              router.navigate("/(auth)/resetPassword?isReset=true")
            }
          />
          <OptionItem icon="logout" text="Logout" onPress={logout} />
        </View>
      </View>

      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ThemedView style={modalStyles.modalContainer}>
            <ThemedView style={modalStyles.modalContent}>
              <ThemedText style={modalStyles.modalTitle}>Edit Profile</ThemedText>

              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={modalStyles.input}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={modalStyles.input}
              />

              <ThemedView style={modalStyles.buttonRow}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <ThemedText style={modalStyles.cancelButton}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const data = {
                        first_name: firstName,
                        last_name: lastName,
                      };
                      await profileService.updateProfileScreen(data);
                      setIsModalVisible(false);
                      onRefresh(); // Refresh profile data
                      Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Updated",
                        textBody: "Profile updated successfully.",
                      });
                    } catch (error) {
                      Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Failed",
                        textBody: "Could not update profile.",
                      });
                    }
                  }}
                >
                  <ThemedText style={modalStyles.saveButton}>Save</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal>
      )}

    </ScrollView>
  );
};

const OptionItem = ({
  icon,
  text,
  rightText,
  rightTextColor = "#000",
  iconColor = "#333",
  onPress,
}: {
  icon: string;
  text: string;
  rightText?: string;
  rightTextColor?: string;
  iconColor?: string;
  onPress?: () => void;
}) => {
  const getIconComponent = () => {
    switch (icon) {
      case "update-profile":
        return <FontAwesome5 name="user" size={20} color={iconColor} />;
      case "credit-card":
        return <FontAwesome5 name="credit-card" size={20} color={iconColor} />;
      case "notifications":
        return (
          <Ionicons name="notifications-outline" size={20} color={iconColor} />
        );
      case "language":
        return <Ionicons name="language-outline" size={20} color={iconColor} />;
      case "description":
        return <MaterialIcons name="description" size={20} color={iconColor} />;
      case "change-password":
        return (
          <MaterialIcons name="lock-outline" size={20} color={iconColor} />
        );
      case "logout":
        return (
          <MaterialIcons name="settings-power" size={20} color={iconColor} />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.optionLeft}>
        {getIconComponent()}
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <View style={styles.optionRight}>
        {rightText && (
          <Text style={[styles.rightText, { color: rightTextColor }]}>
            {rightText}
          </Text>
        )}
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f8ff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 120,
    marginTop: 40,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  profileImageContainer: {
    backgroundColor: "#fcd401",
    padding: 4,
    borderRadius: 50,
    position: "relative",
    top: -70,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -20,
  },
  email: {
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
  optionList: {
    width: "100%",
    marginTop: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightText: {
    fontSize: 14,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginTop: 10,
  },
  cancelButton: {
    color: "#999",
    fontWeight: "bold",
  },
  saveButton: {
    color: "#0066cc",
    fontWeight: "bold",
  },
});


export default ProfileScreen;
