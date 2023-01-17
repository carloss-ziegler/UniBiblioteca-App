import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

const Splash = ({ navigation }) => {
  const animation = useRef(null);

  useEffect(() => {
    animation?.current?.play();

    setTimeout(() => {
      navigation.reset({
        routes: [{ name: "Onboarding" }],
      });
    }, 3000);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <LottieView
        ref={animation}
        autoPlay
        loop
        source={require("../../../assets/splash/Splash2.json")}
        style={{ width: "100%", height: 350 }}
      />
    </View>
  );
};

export default Splash;
