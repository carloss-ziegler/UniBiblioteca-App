import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface HorizontalBookCardProps {
  item: Array<object>;
  index: number;
  width: number;
  height: number;
  darkMode: boolean;
  x: SharedValue<number>;
}

const HorizontalBookCard = ({
  index,
  item,
  width,
  height,
  darkMode,
  x,
}: HorizontalBookCardProps) => {
  if (item.length < 1) return null;

  const inputRange = [
    (index - 2) * (width * 0.55),
    (index - 1) * (width * 0.55),
    index * (width * 0.55),
  ];
  const itemStyles = useAnimatedStyle(() => {
    const translateY = interpolate(x.value, inputRange, [0, -40, 0]);

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={{
        marginTop: 32,
        width: width * 0.55,
      }}
    >
      <TouchableOpacity activeOpacity={0.6}>
        <Animated.View
          style={[
            itemStyles,
            {
              alignItems: "center",
              justifyContent: "center",
              marginTop: 32,
              paddingHorizontal: 12,
            },
          ]}
        >
          <Image
            source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
            resizeMode="cover"
            style={{ height: height * 0.3, width: width * 0.4 }}
            borderRadius={16}
          />

          <Text
            style={{
              textAlign: "center",
              color: darkMode ? "#e5e5e5" : "#222831",
              width: width * 0.5,
            }}
            className="font-fontSemibold text-base mt-2"
          >
            {item.volumeInfo.title}
          </Text>

          <Text
            style={{
              textAlign: "center",
              maxWidth: width / 1.5,
            }}
            className="font-fontSemibold text-dark-textGrayPrimary text-xs mt-2"
          >
            {item.volumeInfo.authors[0]}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalBookCard;
