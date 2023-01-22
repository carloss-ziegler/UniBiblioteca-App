import * as React from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Image1 from "../../../assets/images/Audiobook.png";
import Image2 from "../../../assets/images/Group1.png";
import Image3 from "../../../assets/images/Group.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

// const bgs = ["#1687A7", "#276678", "#579BB1"];
const bgs = ["#f6f5f5", "#f6f5f5", "#f6f5f5"];
const DATA = [
  {
    key: "3571572",
    title: "Bem-vindo" + "\n" + "ao UniBiblioteca",
    description:
      "Essa plataforma foi criada para você estudante ter acesso aos seus livros universitários de forma facilitada",
    image: Image2,
  },
  {
    key: "3571747",
    title: "Experiência Personalizada",
    description:
      "Pesquise de forma simples sobre títulos, autores, categorias desejadas e ainda crie seu próprio acervo",
    image: Image1,
  },
  {
    key: "3571680",
    title: "Aproveite Offline",
    description:
      "Tenha acesso ao seu acervo em qualquer lugar, a qualquer hora, independente de acesso à internet",
    image: Image3,
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        flexDirection: "row",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: "clamp",
        });

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 24, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.8, 0.4],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: dotWidth,
              borderRadius: 5,
              backgroundColor: "#1687A7",
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  //   const opacity = scrollX.interpolate({
  //     inputRange: bgs.map((_, i) => i * width),
  //     outputRange: [1, 0.6, 1],
  //   });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

// const Square = ({ scrollX }) => {
//   const YOLO = Animated.modulo(
//     Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
//     1
//   );

//   const rotate = YOLO.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ["30deg", "0deg", "30deg"],
//   });

//   const translateX = YOLO.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0, -height * 0.8, 0],
//   });

//   return (
//     <Animated.View
//       style={{
//         width: height,
//         height: height,
//         backgroundColor: "#f6f5f5",
//         borderRadius: 80,
//         position: "absolute",
//         top: -height * 0.6,
//         left: -height * 0.3,
//         transform: [
//           {
//             rotate,
//           },
//           {
//             translateX,
//           },
//         ],
//       }}
//     />
//   );
// };

const Buttons = ({ navigation, scrollX, index }) => {
  const opacity = scrollX.interpolate({
    inputRange: [
      (index - 1) * width - width * 0.7,
      index * width,
      (index + 1) * width - width * 0.7,
    ],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: -48,
        width: "100%",
        paddingHorizontal: 24,
        opacity,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Authentication")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            color: "#1687A7",

            fontSize: 16,
          }}
          className="font-fontBold"
        >
          {index <= 1 ? <Text>Pular</Text> : null}
        </Animated.Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => index + 1}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            color: "#1687A7",

            fontSize: 16,
          }}
          className="font-fontBold"
        >
          {index <= 1 && <Text>Próximo</Text>}
          {index == 2 && <Text>Começar</Text>}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Onboarding({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Backdrop scrollX={scrollX} />
      {/* <Square scrollX={scrollX} /> */}
      <Animated.FlatList
        data={DATA}
        horizontal
        scrollEventThrottle={16}
        decelerationRate="fast"
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        pagingEnabled
        renderItem={({ item, index }) => {
          const translateY = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [-height / 2, 0, -height / 2],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width - width * 0.7,
              index * width,
              (index + 1) * width - width * 0.7,
            ],
            outputRange: [0, 1, 0],
          });

          return (
            <View style={{ width, alignItems: "center", padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Animated.Image
                  source={item.image}
                  style={{
                    width: width / 1.2,
                    height: width / 1.2,
                    resizeMode: "contain",
                    opacity,
                    transform: [
                      {
                        translateY,
                      },
                    ],
                  }}
                />
              </View>

              <View style={{ flex: 0.3 }}>
                <Animated.Text
                  style={{
                    fontSize: 24,
                    marginBottom: 10,
                    textAlign: "center",
                    color: "#222831",
                    opacity,
                  }}
                  className="font-fontBold"
                >
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={{
                    textAlign: "center",
                    color: "#222831",
                    opacity,
                  }}
                  className="font-fontMedium"
                >
                  {item.description}
                </Animated.Text>

                <Buttons
                  navigation={navigation}
                  scrollX={scrollX}
                  index={index}
                />
              </View>
            </View>
          );
        }}
      />

      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
});
