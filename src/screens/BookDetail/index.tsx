import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element/build/v4";
import * as Animatable from "react-native-animatable";
import AuthContext from "../../contexts/Auth/auth";
import ProgressBar from "../../components/ProgressBar";

const DELAY = 300;
const DURATION = 400;
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const fadeInTop = {
  0: {
    opacity: 0,
    translateY: -250,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const { width } = Dimensions.get("screen");

interface ScrollProps {
  layoutMeasurement: {
    height: number;
  };
  contentOffset: {
    y: number;
  };
  contentSize: {
    height: number;
  };
}

interface Props {
  navigation: any;
  route: any;
}

const BookDetail = ({ navigation, route }: Props) => {
  const { darkMode } = React.useContext(AuthContext);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const { item } = route.params;
  const bottomSheet = React.useRef();
  const [percentage, setPercentage] = React.useState<number>(0);

  const { height } = useWindowDimensions();

  function scrollPercentage({
    contentOffset,
    contentSize,
    layoutMeasurement,
  }: ScrollProps) {
    const visibleContent = Math.ceil((height / contentSize.height) * 100);

    const value =
      ((layoutMeasurement.height + contentOffset.y) / contentSize.height) * 100;

    setPercentage(value);
  }

  React.useEffect(() => {
    bottomSheet.current?.show();
  }, []);

  function handleMoveToTop() {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }

  return (
    <View className="flex-1">
      <SharedElement
        id={`item.${item.id}.image`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={{ uri: item.volumeInfo?.imageLinks.thumbnail }}
          style={[StyleSheet.absoluteFillObject]}
          blurRadius={2}
        />
      </SharedElement>
      <Animatable.View
        duration={DURATION * 1.5}
        delay={DELAY}
        animation="fadeIn"
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        ]}
      />
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 16,
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 2,
        }}
        color="#f6f5f5"
        onPress={() => navigation.goBack()}
      />

      <Animatable.View
        animation={fadeInTop}
        duration={DURATION}
        delay={DELAY + 100}
        style={{
          position: "absolute",
          top: height * 0.05,
          alignSelf: "center",
          shadowColor: "#000",
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowRadius: 12,
          elevation: 12,
        }}
        className="space-y-3"
      >
        <Animatable.Image
          source={{ uri: item.volumeInfo?.imageLinks.thumbnail }}
          style={{
            width: width / 2,
            height: height / 3,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />

        <TouchableOpacity
          activeOpacity={0.9}
          className="items-center justify-center py-3 bg-light-blue-primary rounded"
        >
          <Text className="text-light-textWhite font-fontSemibold text-base">
            Ler Agora
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View
        animation={fadeInBottom}
        duration={DURATION}
        delay={DELAY}
        style={{
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: height * 0.45,
          opacity: 0.5,
          backgroundColor: darkMode ? "#010101" : "#fafafa",
        }}
      >
        <View className="pb-3">
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 200}
            className="font-fontBold text-2xl"
            style={{
              color: darkMode ? "#e5e5e5" : "#222831",
            }}
          >
            {item.volumeInfo?.title}
          </Animatable.Text>
          <View className="flex-row items-center justify-between">
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DELAY + 350}
              className="text-light-textGraySecondary font-fontMedium"
            >
              {item?.volumeInfo.authors
                ? item.volumeInfo.authors[0]
                : "Sem autor disponível"}
            </Animatable.Text>
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DELAY + 500}
              className="text-light-textGraySecondary opacity-40 font-fontMedium"
            >
              Publicado em {item.volumeInfo?.publishedDate}
            </Animatable.Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 56,
            flexGrow: 1,
          }}
          scrollEventThrottle={16}
          onScroll={(event) => scrollPercentage(event.nativeEvent)}
        >
          <View
            style={{ backgroundColor: darkMode ? "#252525" : "#f6f5f5" }}
            className="self-center flex-row my-5 py-3 px-4 items-center justify-evenly w-full rounded"
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="items-center py-1">
                <Text
                  style={{
                    color: darkMode ? "#e5e5e5" : "#222831",
                  }}
                  className="font-fontSemibold text-base"
                >
                  <AntDesign name="star" size={16} color="#FCB404" /> 4.6
                  <Text className="text-xs text-grey-primary">/5</Text>
                </Text>
                <Text className="font-fontMedium text-light-textGraySecondary text-xs">
                  Avaliação
                </Text>
              </View>

              <View className="h-full w-[1px] bg-light-textColor opacity-20" />

              <View className="items-center">
                <Text
                  style={{
                    color: darkMode ? "#e5e5e5" : "#222831",
                  }}
                  className="font-fontSemibold text-base"
                >
                  {item.volumeInfo?.language}
                </Text>
                <Text className="font-fontMedium text-light-textGraySecondary text-xs">
                  Idioma
                </Text>
              </View>

              <View className="h-full w-[1px] bg-light-textColor opacity-20" />

              <View className="items-center">
                <Text
                  style={{
                    color: darkMode ? "#e5e5e5" : "#222831",
                  }}
                  className="font-fontSemibold text-base"
                >
                  {item.volumeInfo?.pageCount}
                </Text>
                <Text className="font-fontMedium text-light-textGraySecondary text-xs">
                  N° de páginas
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-3">
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "#222831",
              }}
              className="font-fontSemibold text-lg"
            >
              Sobre a obra
            </Text>

            <Text className="font-fontMedium text-light-textGraySecondary text-left mt-2">
              {item?.volumeInfo.description
                ? item?.volumeInfo.description
                : "Não há informação disponível"}
            </Text>
          </View>

          <View className="mt-5">
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "#222831",
              }}
              className="font-fontSemibold text-lg"
            >
              Sobre o autor
            </Text>

            <Text className="font-fontMedium text-light-textGraySecondary text-left mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati velit blanditiis dolores nisi totam omnis aut
              reprehenderit optio quam placeat neque accusamus excepturi rerum
              ullam numquam qui sint, dolor in!
            </Text>
          </View>
        </ScrollView>

        <ProgressBar onMoveTop={handleMoveToTop} value={percentage} />
      </Animatable.View>
    </View>
  );
};

BookDetail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  return [
    {
      id: `item.${item.id}.image`,
      animation: "fade",
    },
  ];
};

export default BookDetail;
