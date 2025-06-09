import CustomModal from "@/components/CustomModal";
import React, { useState } from "react";
import { Button, View } from "react-native";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        lottieSource={require("../assets/lottie/alert.json")} // or undefined if not used
        imageSource={require("../assets/images/avatar.png")} // or undefined
        caption="Here is your caption text!"
        subText="Your Account is Ready to Use. You will be redirected to the Home Page in a Few Seconds."
        loading={false}
        buttonText="OK"
        onButtonPress={() => {
          alert("Button pressed!");
          setModalVisible(false);
        }}
      />
    </View>
  );
}
