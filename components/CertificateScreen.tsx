import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    useColorScheme,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import RoundedActionButton from "./RoundedActionButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const CertificateScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleLinkToPDF = () => {
    WebBrowser.openBrowserAsync(
      "https://www.adcparty.com/"
       //   "https://yourdomain.com/certificates/chidi-john.pdf"
    );
  };
  return (
    <ThemedView>
      <ImageBackground
        source={require("@/assets/images/certificate.png")}
        style={styles.container}
        imageStyle={styles.bgImage}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.icon}
        />

        <ThemedText style={[styles.title, { color: colors.textDim }]}>
          Certificate of Completions
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textDim }]}>
          This Certifies that
        </ThemedText>

        <ThemedText style={styles.name}>
          <ThemedText style={[styles.name, { color: colors.green }]}>
            Chidi{" "}
          </ThemedText>
          <ThemedText style={[styles.name, { color: colors.green }]}>
            John
          </ThemedText>
        </ThemedText>

        <ThemedText style={[styles.text, { color: colors.textDim }]}>
          Has Successfully Completed the Wallace Training Program, Entitled.
        </ThemedText>

        <ThemedText style={[styles.course, { color: colors.textDim }]}>
          3D Design Illustration Course
        </ThemedText>

        <ThemedText style={[styles.issue, { color: colors.textDim }]}>
          Issued on November 24, 2022
        </ThemedText>
        <ThemedText style={[styles.id, { color: colors.textDim }]}>
          ID: SK24568086
        </ThemedText>

        <View style={styles.signatureBlock}>
          <ThemedText style={[styles.signature, { color: colors.textDim }]}>
            Calvin E. McGinnis
          </ThemedText>
          <ThemedText
            style={[styles.signatureTitle, { color: colors.textDim }]}
          >
            Virginia M. Patterson
          </ThemedText>
        </View>

        <ThemedText style={[styles.issuer, { color: colors.textDim }]}>
          Virginia M. Patterson
        </ThemedText>
        <ThemedText style={[styles.issuedDate, { color: colors.textDim }]}>
          Issued on November 24, 2022
        </ThemedText>

        <QRCode value="SK24568086" size={60} backgroundColor="transparent" />
      </ImageBackground>

      <RoundedActionButton
        text="Download Certificate"
        icon={<Ionicons name="arrow-forward" size={24} color="#27d86c" />}
        onPress={handleLinkToPDF}
        style={{
          width: "60%",
          alignSelf: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 687,
    alignItems: "center",
    paddingTop: 40,
    // paddingHorizontal: 20,
  },
  bgImage: {
    resizeMode: "cover",
    borderRadius: 16,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 12,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 10,
  },
  course: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 12,
  },
  issue: {
    fontSize: 15,
    marginBottom: 4,
  },
  id: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },
  signatureBlock: {
    alignItems: "center",
    marginBottom: 16,
  },
  signature: {
    fontFamily: "DancingScript-Bold",
    fontSize: 20,
    marginBottom: 2,
  },
  signatureTitle: {
    fontSize: 12,
    fontStyle: "italic",
  },
  issuer: {
    fontWeight: "700",
    fontSize: 14,
  },
  issuedDate: {
    fontSize: 12,
    marginBottom: 12,
  },
  barcode: {
    width: 60,
    height: 30,
    resizeMode: "contain",
  },
});

export default CertificateScreen;
