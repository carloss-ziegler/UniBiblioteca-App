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
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import BooksCarousel from "../../components/BooksCarousel";
import axios from "axios";
import Bg from "../../../assets/images/bg_3.png";
import Logo from "../../../assets/images/Logo2.png";
import WhiteLogo from "../../../assets/images/LogoBranco.png";
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
import AuthContext from "../../contexts/Auth/auth";
import { StatusBar } from "expo-status-bar";
import Loader from "../../components/Loader";

const { width } = Dimensions.get("screen");

const categories = ["Tecnologia", "Saúde", "Direito", "Economia"];

const Home = ({ navigation }) => {
  const { darkMode } = React.useContext(AuthContext);
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
        `https://www.googleapis.com/books/v1/volumes?q=java&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=40`
      ),
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=dart&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=40`
      ),
    ])
      .then(([firstData, secondData]) => {
        setBooks(firstData.data.items);
        setBooks2(secondData.data.items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Animated.View style={[viewStyles]} className="flex-1">
      <Animated.View
        style={{
          paddingTop: 24,
          height: 80,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: darkMode ? "#66666699" : "#d8d8d8",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 16,
          backgroundColor: darkMode ? "#010101" : "#fafafa",
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons
            name="menu-open"
            size={28}
            color={darkMode ? "#f6f5f5" : "#1687A7"}
          />
        </TouchableOpacity>

        <Image
          source={darkMode ? WhiteLogo : Logo}
          className="h-12 mx-auto"
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("Search");
          }}
        >
          <MaterialIcons
            name="search"
            size={28}
            color={darkMode ? "#f6f5f5" : "#1687A7"}
            style={{ justifyContent: "flex-end" }}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        keyboardDismissMode="on-drag"
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: 1,
          paddingHorizontal: 12,
          backgroundColor: darkMode ? "#1c1c1e" : "#f2f1f6",
        }}
        scrollEventThrottle={16}
      >
        <Animated.View style={[imageStyles]}>
          <ImageBackground
            source={Bg}
            resizeMode="cover"
            className="w-full h-52 mt-2 items-center justify-center shadow"
            borderRadius={16}
          >
            {/* <View className="px-3 py-1 items-center justify-center space-y-2">
              <Text className="text-light-bgSoft font-fontSemibold text-center text-lg">
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
            </View> */}
          </ImageBackground>
        </Animated.View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "#222831",
              }}
              className="font-fontBold text-sm"
            >
              Recomendados
            </Text>

            <View className="flex-1 items-center flex-row justify-end">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="text-xs font-fontSemibold mr-1"
              >
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

          <Text
            style={{
              color: darkMode ? "#e5e5e5" : "#222831",
            }}
            className="text-sm mt-6 font-fontBold"
          >
            Continuar lendo
          </Text>

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
        </View>
      </Animated.ScrollView>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </Animated.View>
  );
};

export default Home;
