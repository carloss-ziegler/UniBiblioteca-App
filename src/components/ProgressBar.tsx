import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  BounceIn,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  value: number;
  onMoveTop(): void;
}

const ProgressBar = ({ value, onMoveTop }: Props) => {
  const widthContainer = useSharedValue(176);
  const borderRadius = useSharedValue(8);

  const endReached = value >= 95;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthContainer.value,
      borderRadius: borderRadius.value,
    };
  });

  React.useEffect(() => {
    widthContainer.value = withSpring(endReached ? 48 : 176, {
      mass: 0.3,
    });
    borderRadius.value = endReached ? 9999 : 8;
  }, [value]);

  return (
    <Animated.View
      style={[animatedStyle]}
      className="h-10 bg-gray-500 absolute bottom-5 self-center opacity-60 justify-center flex-row items-center px-2"
    >
      {endReached ? (
        <AnimatedButton onPress={onMoveTop} entering={BounceIn}>
          <Feather name="arrow-up" size={24} color="#fff" />
        </AnimatedButton>
      ) : (
        <Animated.View
          entering={FadeIn}
          className="space-x-2"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text className="font-fontMedium text-gray-50">
            {value.toFixed(0)}%
          </Text>

          <View
            style={{
              flex: 1,
              height: 3,
              borderRadius: 3,
              backgroundColor: "#505059",
            }}
          >
            <View
              style={{
                height: 3,
                borderRadius: 3,
                backgroundColor: "#017BFF",
                width: `${value}%`,
              }}
            />
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default ProgressBar;
