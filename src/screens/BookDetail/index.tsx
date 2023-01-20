import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element/build/v4";
import * as Animatable from "react-native-animatable";

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

const { height, width } = Dimensions.get("screen");

const BookDetail = ({ navigation, route }) => {
  const { item } = route.params;

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
          top: 16,
          right: 16,
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
          top: height * 0.1,
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
          resizeMode="stretch"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center justify-center py-3 bg-blue-primary rounded"
        >
          <Text className="text-textWhite font-fontSemibold text-base">
            Ler Agora
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateY: height }],
          },
        ]}
      >
        <ScrollView
          removeClippedSubviews
          contentContainerStyle={{
            paddingBottom: 24,
            flexGrow: 1,
          }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ translateY: -height * 0.45 }],
              padding: 16,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: height * 0.45,
            },
          ]}
          className="bg-whiteSmoke"
        >
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 200}
            className="text-textBlack font-fontBold text-2xl"
          >
            {item.volumeInfo?.title}
          </Animatable.Text>
          <View className="flex-row items-center justify-between">
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DELAY + 350}
              className="text-grey-secondary font-fontMedium"
            >
              {item.volumeInfo?.authors[0]}
            </Animatable.Text>
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DELAY + 500}
              className="text-grey-secondary opacity-40 font-fontMedium"
            >
              {item.volumeInfo?.publishedDate}
            </Animatable.Text>
          </View>

          <View className="self-center flex-row my-5 py-3 items-center justify-evenly bg-textWhite w-full rounded">
            <View className="items-center">
              <Text className="text-textBlack font-fontSemibold text-base">
                4.6
              </Text>
              <Text className="font-fontMedium text-grey-secondary text-xs">
                Avaliação
              </Text>
            </View>

            <View className="h-full w-[0.5px] bg-textBlack opacity-20" />

            <View className="items-center">
              <Text className="text-textBlack font-fontSemibold text-base">
                {item.volumeInfo?.language}
              </Text>
              <Text className="font-fontMedium text-grey-secondary text-xs">
                Idioma
              </Text>
            </View>

            <View className="h-full w-[0.5px] bg-textBlack opacity-20" />

            <View className="items-center">
              <Text className="text-textBlack font-fontSemibold text-base">
                {item.volumeInfo?.pageCount}
              </Text>
              <Text className="font-fontMedium text-grey-secondary text-xs">
                N° de páginas
              </Text>
            </View>
          </View>

          <View className="mt-3">
            <Text className="text-textBlack font-fontSemibold text-lg">
              Sobre o autor
            </Text>

            <Text className="font-fontMedium text-grey-secondary text-left mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati velit blanditiis dolores nisi totam omnis aut
              reprehenderit optio quam placeat neque accusamus excepturi rerum
              ullam numquam qui sint, dolor in!
            </Text>
          </View>

          <View className="mt-5">
            <Text className="text-textBlack font-fontSemibold text-lg">
              Sobre a obra
            </Text>

            <Text className="font-fontMedium text-grey-secondary text-left mt-2">
              {item.volumeInfo?.description}
            </Text>
          </View>
        </ScrollView>
      </SharedElement>
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
    {
      id: "general.bg",
      animation: "fade",
    },
  ];
};

export default BookDetail;
