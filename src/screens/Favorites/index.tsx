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
  ScrollView,
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

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text
                className="font-fontBold text-textBlack"
                style={[styles.title]}
                numberOfLines={1}
              >
                {item.volumeInfo?.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text className="font-fontMedium" style={[styles.location]}>
                  {item.volumeInfo?.authors[0]}
                </Text>
                <Text className="font-fontMedium" style={[styles.date]}>
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
  React.useEffect(() => {
    const fetchBooks = async () => {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=typescript&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=30`
        )
        .then((data) => {
          setData(data.data.items);
          setLoading(false);
        });
    };
    fetchBooks();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <>
            <Text className="font-fontSemibold text-textBlack">Meu Acervo</Text>
          </>
        );
      },
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
        <SafeAreaView className="flex-1">
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator color="#222831" size="large" />
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
                padding: SPACING * 2,
                marginTop: 44,
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
                          resizeMode="stretch"
                        />
                      </SharedElement>
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
            />
          )}
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
                  backgroundColor: "#f6f5f5",
                  borderRadius: 16,
                },
              ]}
            />
          </SharedElement>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: 24,
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
