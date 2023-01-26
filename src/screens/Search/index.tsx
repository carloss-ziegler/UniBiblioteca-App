import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Search = ({ navigation }) => {
  const scrollViewRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <>
            <Text className="text-textBlack font-fontSemibold">Pesquisar</Text>
          </>
        );
      },
      headerLeft:
        Platform.OS === "ios" &&
        function () {
          return (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-row items-center"
            >
              <Entypo name="chevron-left" size={32} color="#1687A7" />
              <Text className="text-[#1687A7] font-fontSemibold text-base">
                Voltar
              </Text>
            </TouchableOpacity>
          );
        },
    });
  }, []);

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 44], [48, 0], Extrapolate.CLAMP),
      opacity: interpolate(scrollY.value, [0, 44], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScrollEndDrag={(event) => {
          if (
            event.nativeEvent.contentOffset.y > 5 &&
            event.nativeEvent.contentOffset.y < 45
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
        }}
        onScroll={onScroll}
        className="flex-1 px-3"
      >
        <Animated.View
          style={[searchBarAnimatedStyle]}
          className="flex-row shadow items-center justify-center mt-3 h-12"
        >
          <View className="rounded-tl rounded-bl bg-light-bg shadow-sm flex-row items-center px-2 flex-[0.85]">
            <TextInput
              autoFocus
              autoCapitalize="none"
              // value={searchInput}
              // onChangeText={(text) => setSearchInput(text)}
              placeholder="Autores, títulos ou categorias"
              className="flex-1 placeholder:text-xs h-12"
              returnKeyType="done"
              // onSubmitEditing={searchBook}
            />
          </View>

          <View className="w-[0.5px] bg-textBlack opacity-40" />

          <TouchableOpacity
            className="items-center rounded-tr rounded-br flex-[0.15] bg-whiteSmoke shadow-sm justify-center h-12"
            //   onPress={searchBook}
          >
            <Feather name="search" size={20} color="#1687A7" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Search;
