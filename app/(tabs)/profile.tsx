import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.profileImage}
        />
        <ThemedText type="title" style={styles.name}>
          John Chidi
        </ThemedText>
        <ThemedText style={styles.email}>
          hernandex.rediol@gmail.ac.in
        </ThemedText>
      </View>

      <View style={styles.menuList}>
        <MenuItem title="Payment Option" />
        <MenuItem title="Notifications" />
        <View style={styles.languageItem}>
          <ThemedText style={styles.menuItemText}>Language</ThemedText>
          <ThemedText style={styles.languageValue}>English (US)</ThemedText>
        </View>
        <MenuItem title="Terms & Conditions" />
        <MenuItem title="Logout" />
      </View>
    </ThemedView>
  );
}

function MenuItem({ title }: { title: string }) {
  return (
    <View style={styles.menuItem}>
      <ThemedText style={styles.menuItemText}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  menuList: {
    width: "100%",
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  languageItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItemText: {
    fontSize: 18,
  },
  languageValue: {
    fontSize: 16,
    color: "#666",
  },
});
