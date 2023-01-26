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
import { NavigationNavigateAction } from "react-navigation";
import AuthContext from "../../contexts/Auth/auth";

const { width, height } = Dimensions.get("screen");

// const bgs = ["#1687A7", "#276678", "#579BB1"];
const DATA = [
  {
    key: "3571572",
    title: "Bem-vindo" + "\n" + "ao UniBiblioteca",
    description:
      "Essa plataforma foi criada para você, estudante, ter acesso aos seus livros universitários de forma facilitada",
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

interface IndicatorProps {
  scrollX: Animated.Value;
}
const Indicator = ({ scrollX }: IndicatorProps) => {
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

// interface BackdropProps {
//   scrollX: Animated.Value;
// }
// const Backdrop = ({ scrollX }: BackdropProps) => {
//   const backgroundColor = scrollX.interpolate({
//     inputRange: bgs.map((_, i) => i * width),
//     outputRange: bgs.map((bg) => bg),
//   });

//   return (
//     <Animated.View
//       style={[
//         StyleSheet.absoluteFillObject,
//         {
//           backgroundColor,
//         },
//       ]}
//     />
//   );
// };

interface ButtonPops {
  scrollX: Animated.Value;
  index: number;
  onPress: () => void;
  navigation: NavigationNavigateAction;
  darkMode: boolean;
}
const Buttons = ({
  navigation,
  scrollX,
  index,
  onPress,
  darkMode,
}: ButtonPops) => {
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
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: -64,
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
            color: darkMode ? "#e5e5e5" : "#1687a7",

            fontSize: 16,
          }}
          className="font-fontBold"
        >
          {index <= 1 ? <Text>Pular</Text> : null}
        </Animated.Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{
            color: darkMode ? "#e5e5e5" : "#1687a7",

            fontSize: 16,
          }}
          className="font-fontBold"
        >
          {index <= 1 && <Text>Próximo</Text>}
          {index == 2 && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Authentication")}
            >
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#1687a7",

                  fontSize: 16,
                }}
                className="font-fontBold"
              >
                Começar
              </Text>
            </TouchableOpacity>
          )}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface OnboardingProps {
  navigation: NavigationNavigateAction;
}
export default function Onboarding({ navigation }: OnboardingProps) {
  const { darkMode } = React.useContext(AuthContext);
  const scrollX = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const FlatListRef = React.useRef<Animated.FlatList>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkMode ? "#121212" : "#f6f5f5",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar style={darkMode ? "light" : "dark"} />
      {/* <Backdrop scrollX={scrollX} /> */}
      <Animated.FlatList
        ref={FlatListRef}
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
                    color: darkMode ? "#e5e5e5" : "#222831",
                    opacity,
                  }}
                  className="font-fontBold"
                >
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={{
                    textAlign: "center",
                    color: darkMode ? "#e5e5e5" : "#222831",
                    opacity,
                  }}
                  className="font-fontMedium"
                >
                  {item.description}
                </Animated.Text>

                <Buttons
                  navigation={navigation}
                  scrollX={scrollX}
                  darkMode={darkMode}
                  index={index}
                  onPress={() => {
                    if (FlatListRef.current && index < 2) {
                      FlatListRef.current.scrollToIndex({
                        index: index + 1,
                        animated: true,
                      });
                    }
                  }}
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
