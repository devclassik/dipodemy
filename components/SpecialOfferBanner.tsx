import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const mockOffers = [
  {
    discountText: "25% OFF*",
    validity: "Today's Special",
    offerDetails:
      "Get a Discount for Every Course\nOrder only Valid for Today.!",
  },
  {
    discountText: "15% OFF*",
    validity: "Weekend Deal",
    offerDetails: "Special discount on all courses\nOnly this weekend!",
  },
  {
    discountText: "30% OFF*",
    validity: "Flash Sale",
    offerDetails: "Limited time offer for new users\nHurry up!",
  },
];

const SpecialOfferBanner: React.FC = () => (
  <View style={styles.bannerWrapper}>
    <Swiper
      autoplay
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      paginationStyle={styles.pagination}
      loop
    >
      {mockOffers.map((offer, idx) => (
        <ImageBackground
          key={idx}
          source={require("@/assets/images/special-offer-bg.png")}
          style={styles.banner}
          imageStyle={styles.imageBg}
        >
          <View style={styles.row}>
            <MaterialCommunityIcons name="tag-outline" size={28} color="#222" style={{paddingLeft: 20}} />
            <View>
              <Text style={styles.discount}>{offer.discountText}</Text>
              <Text style={styles.validity}>{offer.validity}</Text>
            </View>
          </View>
          <Text style={styles.details}>{offer.offerDetails}</Text>
        </ImageBackground>
      ))}
    </Swiper>
  </View>
);

const styles = StyleSheet.create({
  bannerWrapper: {
    height: 200,
    marginHorizontal: 16,
    marginTop: -40,
    zIndex: 10,
  },
  banner: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  imageBg: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  discount: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 20,
  },
  validity: {
    color: "#222",
    fontSize: 24,
    fontWeight: "bold",
    opacity: 0.9,
  },
  details: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 30
  },
  dot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#40E96A",
    width: 16,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  pagination: {
    bottom: 10,
  },
});

export default SpecialOfferBanner;
