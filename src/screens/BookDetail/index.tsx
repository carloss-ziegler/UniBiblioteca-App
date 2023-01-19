import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
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

const { height } = Dimensions.get("screen");

const BookDetail = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View className="flex-1">
      <SharedElement
        id={`item.${item.id}.image`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={[StyleSheet.absoluteFillObject]}
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
        color="#333"
        onPress={() => navigation.goBack()}
      />

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
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ translateY: -height * 0.4 }],
              padding: 16,
              borderRadius: 16,
            },
          ]}
          className="bg-textWhite"
        >
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 200}
            className="text-textBlack font-fontBold text-2xl"
          >
            {item.title}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 350}
            className="text-textBlack font-fontMedium"
          >
            {item.author}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 500}
            className="text-textBlack font-fontMedium"
          >
            {item.id}
          </Animatable.Text>
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
