// @ts-nocheck
import * as React from "react";
import {
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import {
  FlingGestureHandler,
  Directions,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element/build/v4";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import AuthContext from "../../contexts/Auth/auth";

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated, darkMode }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text
                className="font-fontBold"
                style={[
                  styles.title,
                  {
                    color: darkMode ? "#e5e5e5" : "#222831",
                  },
                ]}
                numberOfLines={1}
              >
                {item?.volumeInfo.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text
                  className="font-fontMedium"
                  style={[
                    styles.location,
                    {
                      color: darkMode ? "#e5e5e5" : "#222831",
                    },
                  ]}
                >
                  {item?.volumeInfo.authors}
                </Text>
                <Text
                  className="font-fontMedium"
                  style={[
                    styles.date,
                    {
                      color: darkMode ? "#e5e5e5" : "#222831",
                    },
                  ]}
                >
                  {item.volumeInfo?.pageCount} páginas
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function Favorites({ navigation }) {
  const { darkMode } = React.useContext(AuthContext);
  React.useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=java&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=30`
      );
      setData(response.data.items);
      setLoading(false);
    };
    fetchBooks();
  }, []);

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
              Meu Acervo
            </Text>
          </>
        );
      },
      headerLeft: () => {
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
              className="font-fontSemibold text-base"
            >
              Voltar
            </Text>
          </TouchableOpacity>
        );
      },
      headerStyle: {
        backgroundColor: darkMode ? "#010101" : undefined,
      },
      headerShadowVisible: darkMode ? false : undefined,
    });
  }, []);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: darkMode ? "#1c1c1e" : "#f2f1f6",
          }}
          className="flex-1"
        >
          <OverflowItems
            darkMode={darkMode}
            data={data}
            scrollXAnimated={scrollXAnimated}
          />
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator
                color={darkMode ? "#e5e5e5" : "#222831"}
                size="large"
              />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: SPACING,
                marginTop: height <= 500 ? 16 : 24,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, { zIndex: data.length - index }];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({ item, index: i }) => {
                const inputRange = [i - 1, i, i + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 0.6],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_WIDTH / 2.4,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        navigation.navigate("BookDetail", {
                          item: data[index],
                        });
                      }}
                    >
                      <SharedElement id={`item.${item.id}.image`}>
                        <Image
                          source={{
                            uri: item.volumeInfo?.imageLinks.smallThumbnail,
                          }}
                          style={{
                            width: ITEM_WIDTH / 1.2,
                            height: ITEM_HEIGHT / 1.2,
                            borderRadius: 14,
                          }}
                          resizeMode="cover"
                        />
                      </SharedElement>
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
            />
          )}
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: height > 600 ? 20 : 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: height > 600 ? 16 : 12,
  },
  date: {
    fontSize: height > 600 ? 12 : 8,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
    alignItems: "stretch",
    width: "100%",
  },
});
