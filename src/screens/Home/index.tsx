// @ts-nocheck
import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import BooksCarousel from "../../components/BooksCarousel";
import axios from "axios";
import Bg from "../../../assets/images/bg_3.png";
import Logo from "../../../assets/images/Logo2.png";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("screen");

const categories = ["Tecnologia", "Saúde", "Direito", "Economia"];

const Home = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [books2, setBooks2] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const scrollViewRef = React.useRef();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 28]);

    return {
      transform: [{ scale }],
      borderRadius,
      overflow: "hidden",
    };
  });

  const imageStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 250],
      [1, 0],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(scrollY.value, [0, 200], [1, 0]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  useEffect(() => {
    Promise.all([
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=react&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=40`
      ),
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=typescript&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=40`
      ),
    ])
      .then(([firstData, secondData]) => {
        setBooks(firstData.data.items);
        setBooks2(secondData.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DELAY = 300;
  const DURATION = 500;
  const fadeInBottom = {
    0: {
      opacity: 0,
      translateY: 200,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <Animated.View style={[viewStyles]} className="flex-1">
      <Animated.View
        style={{
          paddingTop: 24,
        }}
        className="h-20 border-b bg-light-bg border-light-borderGrey flex-row w-full items-center justify-between px-4"
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu-open" size={28} color="#1687A7" />
        </TouchableOpacity>

        <Image source={Logo} className="h-14 mx-auto" resizeMode="contain" />

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("Search");
          }}
        >
          <MaterialIcons
            name="search"
            size={28}
            color="#1687a7"
            style={{ justifyContent: "flex-end" }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        scrollEventThrottle={16}
        // onScrollEndDrag={(event) => {
        //   if (
        //     event.nativeEvent.contentOffset.y > 25 &&
        //     event.nativeEvent.contentOffset.y < 100
        //   ) {
        //     scrollViewRef.current?.scrollTo({
        //       x: 0,
        //       y: 220,
        //       animated: true,
        //     });
        //   }
        // }}
        className="flex-1 bg-light-bgSoft px-3"
      >
        <Animated.View style={[imageStyles]}>
          <ImageBackground
            source={Bg}
            resizeMode="cover"
            className="w-full h-52 mt-2 items-center justify-center"
            borderRadius={16}
          >
            <View className="px-3 py-1 items-center justify-center space-y-2">
              <Text className="text-light-textWhite font-fontMedium text-center text-lg">
                Compartilhe o app com seus amigos!
              </Text>

              <Animatable.Image
                animation={fadeInBottom}
                duration={DURATION}
                delay={DELAY}
                source={require("../../../assets/images/start_learning.png")}
                className="h-24"
                resizeMode="contain"
              />

              <TouchableOpacity className="h-8 px-5 rounded shadow bg-light-bgSoft items-center justify-center">
                <Text className="text-light-textColor font-fontSemibold text-base">
                  Compartilhar
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="font-fontBold text-base text-light-textColor">
              Recomendados
            </Text>

            <View className="flex-1 items-center flex-row justify-end">
              <Text className="text-xs font-fontSemibold text-light-textColor mr-1">
                Filtro:
              </Text>

              <SelectDropdown
                data={categories}
                onSelect={(selectedItem, index) => {
                  setValue(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText="Selecionar"
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color="#222831"
                      size={12}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={{
                  backgroundColor: "#fafafa",
                  borderRadius: 4,
                }}
                buttonStyle={{
                  backgroundColor: "#fafafa",
                  borderWidth: 1,
                  borderColor: "#33333333",
                  borderRadius: 4,
                  width: width / 3,
                  height: width * 0.08,
                }}
                buttonTextStyle={{
                  fontSize: 12,
                }}
              />
            </View>
          </View>

          {loading ? (
            <View className="items-center justify-center">
              <ActivityIndicator color="#222831" />
            </View>
          ) : (
            <FlatList
              data={books}
              pagingEnabled
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={width * 0.5}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={8}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: book, index }) => {
                return <BooksCarousel book={book} />;
              }}
            />
          )}

          <Text className={`text-base text-light-textColor mt-6 font-fontBold`}>
            Continuar lendo
          </Text>
          {loading ? (
            <View className="items-center justify-center">
              <ActivityIndicator color="#222831" />
            </View>
          ) : (
            <FlatList
              data={books2}
              pagingEnabled
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={width * 0.5}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={8}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: book, index }) => {
                return <BooksCarousel book={book} />;
              }}
            />
          )}
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default Home;
