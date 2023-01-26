import { View, Text } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import AuthContext from "../../contexts/Auth/auth";

const Splash = ({ navigation }) => {
  const { signed } = useContext(AuthContext);
  const animation = useRef(null);

  useEffect(() => {
    animation?.current?.play();

    setTimeout(() => {
      navigation.reset({
        routes: [{ name: signed ? "Home" : "Onboarding" }],
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
