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
  Dimensions,
  ScrollView,
  Image,
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
import axios from "axios";
import HorizontalBookCard from "../../components/HorizontalBookCard";

const { width, height } = Dimensions.get("screen");

const Search = ({ navigation }) => {
  const { darkMode } = React.useContext(AuthContext);
  const scrollViewRef = React.useRef();
  const [topBooks, setTopBooks] = React.useState([]);
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const scrollX = useSharedValue(0);
  const booksScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: darkMode ? "#e5e5e5" : "#222831",
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
        Platform.OS === "ios"
          ? function () {
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
            }
          : undefined,
      headerStyle: {
        backgroundColor: darkMode ? "#000" : undefined,
      },
      headerShadowVisible: darkMode ? false : undefined,
    });
  }, []);

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 80], [55, 0], Extrapolate.CLAMP),
      opacity: interpolate(scrollY.value, [0, 80], [1, 0], Extrapolate.CLAMP),
    };
  });

  React.useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=dart&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=10`
      );
      setTopBooks([
        { key: "left-spacer" },
        ...response.data.items,
        { key: "right-spacer" },
      ]);
    };
    fetchBooks();
  }, []);

  const ITEM_SIZE = width * 0.55;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        bounces={false}
        onScrollEndDrag={(event) => {
          if (
            event.nativeEvent.contentOffset.y > 7 &&
            event.nativeEvent.contentOffset.y < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 50,
              animated: true,
            });
          }
        }}
        onScroll={onScroll}
        className="flex-1 px-3"
        contentContainerStyle={{ paddingBottom: 24 }}
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
              autoCapitalize="none"
              // value={searchInput}
              // onChangeText={(text) => setSearchInput(text)}
              placeholder="Autores, títulos ou categorias"
              className="flex-1 placeholder:text-xs h-12 px-3"
              returnKeyType="done"
              placeholderTextColor={darkMode && "#7c7c7c"}
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

        <View className="flex-row items-center justify-between mt-7">
          <Text
            style={{
              color: darkMode ? "#e5e5e5" : "#222831",
            }}
            className="font-fontSemibold text-xl"
          >
            Recente
          </Text>

          <TouchableOpacity>
            <Text className="text-dark-textGrayPrimary font-fontMedium text-sm">
              Limpar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="min-h-[150px] bg-dark-textGrayPrimary rounded-xl"></View>

        <Text
          style={{
            color: darkMode ? "#e5e5e5" : "#222831",
          }}
          className="font-fontSemibold text-xl mt-5"
        >
          Livros em alta
        </Text>

        <Animated.FlatList
          data={topBooks}
          onScroll={booksScroll}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={width * 0.55}
          bounces={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            if (!item.volumeInfo) {
              return (
                <View
                  style={{
                    width: SPACER_ITEM_SIZE,
                  }}
                />
              );
            }

            return (
              <HorizontalBookCard
                x={scrollX}
                height={height}
                width={width}
                item={item}
                index={index}
                darkMode={darkMode}
              />
            );
          }}
        />

        <Text
          style={{
            color: darkMode ? "#e5e5e5" : "#222831",
          }}
          className="font-fontSemibold text-xl"
        >
          Autores em alta
        </Text>

        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 12 }}
          style={{
            marginTop: 16,
          }}
        >
          {topBooks?.map((book, index) => {
            if (!book.volumeInfo) {
              return null;
            }

            return (
              <View
                key={index}
                style={{
                  width: width * 0.3,
                  alignItems: "center",
                  marginHorizontal: 4,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: darkMode ? "#f6f5f5" : "#151515",
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: darkMode ? "#e5e5e5" : "#222831",
                    textAlign: "center",
                    marginTop: 4,
                  }}
                  className="font-fontMedium"
                >
                  {book.volumeInfo.authors[0]}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Search;
