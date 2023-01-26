// @ts-nocheck
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
import AuthContext from "../../contexts/Auth/auth";

const Search = ({ navigation }) => {
  const { darkMode } = React.useContext(AuthContext);
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
            <Text
              style={{
                color: darkMode ? "#f6f5f5" : "#222831",
              }}
              className="font-fontSemibold"
            >
              Pesquisar
            </Text>
          </>
        );
      },
      headerLeft:
        Platform.OS === "ios" &&
        function () {
          return (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-row items-center ml-2"
            >
              <Entypo
                name="chevron-thin-left"
                size={24}
                color={darkMode ? "#e5e5e5" : "#1687a7"}
              />
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#1687a7",
                }}
                className="font-fontMedium text-base"
              >
                Voltar
              </Text>
            </TouchableOpacity>
          );
        },
      headerStyle: {
        backgroundColor: darkMode ? "#000" : undefined,
      },
      headerShadowVisible: darkMode ? false : undefined,
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
        bounces={false}
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
        style={{
          backgroundColor: darkMode ? "#151515" : "#f6f5f5",
        }}
      >
        <Animated.View
          style={[searchBarAnimatedStyle]}
          className="flex-row shadow items-center justify-center mt-3 h-12"
        >
          <View
            style={{
              backgroundColor: darkMode ? "#252525" : "#fafafa",
            }}
            className="rounded-tl-3xl rounded-bl-3xl shadow-sm flex-row items-center px-2 flex-[0.85]"
          >
            <TextInput
              autoFocus
              autoCapitalize="none"
              // value={searchInput}
              // onChangeText={(text) => setSearchInput(text)}
              placeholder="Autores, títulos ou categorias"
              className="flex-1 placeholder:text-xs h-12 px-3"
              returnKeyType="done"
              placeholderTextColor={darkMode && "#7c7c7c"}
              contextMenuHidden
              style={{
                color: darkMode ? "#e5e5e5" : undefined,
              }}
              // onSubmitEditing={searchBook}
            />
          </View>

          <View
            style={{
              backgroundColor: darkMode ? "#666" : "#33333333",
            }}
            className="w-[0.5px] opacity-40"
          />

          <TouchableOpacity
            style={{
              backgroundColor: darkMode ? "#252525" : "#fafafa",
            }}
            className="items-center rounded-tr-3xl rounded-br-3xl flex-[0.15] shadow-sm justify-center h-12"
            //   onPress={searchBook}
          >
            <Feather
              name="search"
              size={20}
              color={darkMode ? "#f6f5f5" : "#1687A7"}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Search;
