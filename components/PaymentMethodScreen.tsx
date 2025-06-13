import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface PaymentMethodsScreenProps {
  price: string;
  showCourse?: boolean;
  id: number;
  category: string;
  title: string;
  rating: number;
  reviews: number;
  image: any;
}
const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({
  price = "5,000",
  showCourse,
  id,
  category,
  title,
  rating,
  reviews,
  image,
}) => {
  const [selectedMethods, setSelectedMethods] = useState<any>([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const paymentMethods = [
    { id: "paypal", name: "Paypal" },
    { id: "google-pay", name: "Google Pay" },
    { id: "apple-pay", name: "Apple Pay" },
    { id: "bank-transfer", name: "Bank Transfer" },
  ];

  const toggleMethod = (methodId: any) => {
    if (selectedMethods.includes(methodId)) {
      setSelectedMethods(
        selectedMethods.filter((id: number) => id !== methodId)
      );
    } else {
      setSelectedMethods([...selectedMethods, methodId]);
    }
  };

  return (
    <ScrollView>
      {showCourse && (
        <ThemedView style={styles.card}>
          <Image source={image} style={styles.image} />
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.category}>{category}</ThemedText>
            <ThemedText style={styles.titleC}>{title}</ThemedText>
            <ThemedText style={styles.price}>{price}</ThemedText>
            <View style={styles.row}>
              <Ionicons name="star" size={14} color="#FFC107" />
              <ThemedText style={styles.rating}>
                {rating} · {reviews}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      )}
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>
          Select the Payment Methods you Want to Use
        </ThemedText>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodItem, { borderColor: colors.border }]}
            onPress={() => toggleMethod(method.id)}
          >
            <ThemedView style={styles.checkboxContainer}>
              {selectedMethods.includes(method.id) ? (
                <MaterialIcons
                  name="radio-button-on"
                  size={24}
                  color="#4CAF50"
                />
              ) : (
                <MaterialIcons
                  name="radio-button-off"
                  size={24}
                  color="#757575"
                />
              )}
            </ThemedView>
            <ThemedText style={styles.methodText}>{method.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
      <RoundedActionButton
        icon={<Ionicons name="add" size={24} color={colors.white} />}
        onPress={() => {}}
        style={{
          alignSelf: "flex-end",
          marginVertical: 10,
          marginRight: 20,
        }}
      />
      <RoundedActionButton
        text={`Enroll Course   ₦${price}`}
        icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
        onPress={() => {}}
        style={{
          width: "70%",
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 40,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 30,
    gap: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 15,
    paddingHorizontal: 15,
  },
  methodText: {
    fontSize: 16,
    color: "#333",
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
  titleC: {
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
    marginHorizontal: 20
  },
});

export default PaymentMethodsScreen;
