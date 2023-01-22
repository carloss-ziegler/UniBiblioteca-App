// @ts-nocheck
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import BooksCarousel from "../../components/BooksCarousel";
import DrawerItem from "../../components/DrawerItem";
import axios from "axios";

const { width } = Dimensions.get("screen");

const categories = ["Tecnologia", "Saúde", "Direito", "Economia"];

const Home = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [books2, setBooks2] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isEnabled2, setIsEnabled2] = useState<boolean>(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderValue = useRef(new Animated.Value(0)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

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

  async function searchBook() {
    if (searchInput != "") {
      setLoading(true);
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&printType=books&key=AIzaSyAtenw6fsNwoK-bHEPUfWTSbEFs6cVjGKc&maxResults=40`
        )
        .then((data) => {
          if (data.data.items.length >= 1) {
            setBooks(data.data.items);
            setLoading(false);
          } else {
            alert("Nenhum dado encontrado!");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const opacity = scrollY.interpolate({
    inputRange: [0, 10, 20],
    outputRange: [1, 0.5, 0],
  });

  const Text2opacity = scrollY.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [1, 0.5, 0],
  });

  return (
    <View className="flex-1 bg-transparent">
      {/* Drawer */}
      <View className="flex-1 bg-blue-secondary">
        <View className="p-4 flex-1 max-w-[65%]">
          <View className="flex-row items-center justify-between mt-10">
            <View>
              <Text className="text-base font-fontSemibold text-textWhite">
                Lucas Carlos
              </Text>
              <Text className="text-xs font-fontSemibold text-textWhite">
                lucas.carlos@a.ucb.br
              </Text>
            </View>
          </View>

          <View className="h-[0.5px] bg-textWhite w-full mt-3" />

          <View className="mt-12 justify-start">
            <DrawerItem
              icon={
                <MaterialCommunityIcons
                  name="bookshelf"
                  size={24}
                  color="#f6f5f5"
                />
              }
              title="Meu Acervo"
              onPress={() => navigation.navigate("Favorites")}
            />
            <DrawerItem
              icon={<FontAwesome name="moon-o" size={24} color="#f6f5f5" />}
              title="Alterar Tema"
              button={
                <Switch
                  trackColor={{ false: "#767577", true: "#53d769" }}
                  thumbColor={isEnabled ? "#f6f5f5" : "#f6f5f5"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              }
            />
            <DrawerItem
              icon={
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#f6f5f5"
                />
              }
              title="Notificações"
              button={
                <Switch
                  trackColor={{ false: "#767577", true: "#53d769" }}
                  thumbColor={isEnabled ? "#f6f5f5" : "#f6f5f5"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
              }
            />

            <DrawerItem
              icon={<Feather name="settings" size={24} color="#f6f5f5" />}
              title="Configurações"
              onPress={() => navigation.navigate("Settings")}
            />
          </View>

          <View className="flex-1 justify-end space-y-3">
            <View className="h-[0.5px] bg-textWhite w-full mt-3" />

            <TouchableOpacity
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text className="text-textWhite text-sm font-fontSemibold">
                Política de Privacidade
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("TermsAndConditions")}
            >
              <Text className="text-textWhite text-sm font-fontSemibold">
                Termos e Condições
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-textWhite text-sm font-fontSemibold">
                Sobre Nós
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-textWhite font-fontSemibold">Suporte</Text>
              <Text className="text-xs text-textWhite">
                unibiblioteca@suporte.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Screen */}
      <Animated.View
        className="flex-1 absolute top-0 bottom-0 right-0 left-0"
        style={{
          transform: [
            { scale: scaleValue },
            {
              translateX: offsetValue,
            },
          ],
          borderRadius: borderValue,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            paddingTop: 24,
            backgroundColor: "#fafafa",
          }}
          className="h-16 border-b border-borderGrey flex-row items-center px-3"
        >
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.84,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(borderValue, {
                toValue: showMenu ? 0 : 16,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : width * 0.7,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
            className="flex-1"
            style
          >
            {showMenu ? (
              <MaterialIcons name="close" size={28} color="#1687A7" />
            ) : (
              <MaterialIcons name="menu-open" size={28} color="#1687A7" />
            )}
          </TouchableOpacity>

          <Image
            source={require("../../../assets/images/Logo2.png")}
            className="w-36 h-16 mx-auto flex-1"
            resizeMode="contain"
          />

          <View className="flex-1" />
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          className="flex-1 bg-[#f6f5f5] px-3"
        >
          <Animated.Text
            style={{ opacity }}
            className="text-base text-grey-secondary font-fontSemibold  mt-6"
          >
            Nos diga,
          </Animated.Text>
          <Animated.Text
            style={{
              opacity: Text2opacity,
            }}
            className="text-base text-grey-secondary font-fontSemibold"
          >
            Qual livro deseja pesquisar no acervo?
          </Animated.Text>

          <View
            style={{ elevation: 4 }}
            className="flex-row items-center border rounded border-borderGrey justify-center mt-3"
          >
            <View className="h-10 rounded-tl rounded-bl bg-whiteSmoke shadow-sm flex-row items-center px-2 flex-[0.85]">
              <TextInput
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
                placeholder="Autores, títulos ou categorias"
                className="flex-1 placeholder:text-xs"
                returnKeyType="done"
                onSubmitEditing={searchBook}
              />
            </View>

            <View className="h-full w-[0.5px] bg-textBlack opacity-40" />

            <TouchableOpacity
              className="items-center rounded-tr rounded-br flex-[0.15] bg-whiteSmoke shadow-sm justify-center h-10"
              onPress={searchBook}
            >
              <Feather name="search" size={20} color="#1687A7" />
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center justify-between">
              <Text className="font-fontBold text-base text-textBlack">
                Recomendados
              </Text>

              <View className="flex-1 items-center flex-row justify-end">
                <Text className="text-xs font-fontSemibold text-textBlack mr-1">
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
              <Animated.FlatList
                data={books}
                pagingEnabled
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={width * 0.5}
                keyExtractor={(item) => item.id}
                scrollEventThrottle={8}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: book, index }) => {
                  return <BooksCarousel book={book} />;
                }}
              />
            )}

            <Text className={`text-base text-textBlack mt-6 font-fontBold`}>
              Continuar lendo
            </Text>
            {loading ? (
              <View className="items-center justify-center">
                <ActivityIndicator color="#222831" />
              </View>
            ) : (
              <Animated.FlatList
                data={books2}
                pagingEnabled
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={width * 0.5}
                keyExtractor={(item) => item.id}
                scrollEventThrottle={8}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
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
    </View>
  );
};

export default Home;
