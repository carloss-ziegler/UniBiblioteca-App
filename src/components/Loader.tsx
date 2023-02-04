import { View, Animated } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/Auth/auth";
import { AnimatedValue } from "react-navigation";

const Loader = () => {
  const navigation = useNavigation();
  const { darkMode } = React.useContext(AuthContext);

  const animations = {
    one: new Animated.Value(0),
    two: new Animated.Value(0),
    three: new Animated.Value(0),
  };

  function onAnimate(animation: AnimatedValue, nextAnimation: any) {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(nextAnimation, 200);
  }

  function onStartAnimate() {
    function onThreeAnimation() {
      onAnimate(animations.three, onStartAnimate);
    }

    function onTwoAnimation() {
      onAnimate(animations.two, onThreeAnimation);
    }

    onAnimate(animations.one, onTwoAnimation);
  }

  React.useEffect(() => {
    onStartAnimate();
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkMode ? "#010101" : "#f2f1f6",
      }}
      className="flex-1 justify-center flex-row items-center space-x-2"
    >
      <Animated.View
        style={{ transform: [{ translateY: animations.one }] }}
        className="w-2 h-2 rounded-full bg-red-500"
      />
      <Animated.View
        style={{ transform: [{ translateY: animations.two }] }}
        className="w-2 h-2 rounded-full bg-blue-500"
      />
      <Animated.View
        style={{ transform: [{ translateY: animations.three }] }}
        className="w-2 h-2 rounded-full bg-green-500"
      />
    </View>
  );
};

export default Loader;
