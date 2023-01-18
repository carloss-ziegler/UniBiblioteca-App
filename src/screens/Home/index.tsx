// @ts-nocheck
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Animated,
  Switch,
} from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { BookProps } from "../../utils/types";
import { Books } from "../../mocks/Books";
import BooksCarousel from "../../components/BooksCarousel";
import { fonts } from "../../constants/Theme";
import DrawerItem from "../../components/DrawerItem";

const { width, height } = Dimensions.get("screen");

const categories = ["Tecnologia", "Saúde", "Direito", "Economia"];

const Home = ({ navigation }) => {
  const [books] = useState<BookProps[]>(Books);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderValue = useRef(new Animated.Value(0)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

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
              <Text className="text-base font-fontSemibold text-[#f6f5f5]">
                Lucas Carlos
              </Text>
              <Text className="text-xs font-fontSemibold text-[#f6f5f5]">
                lucas.carlos@a.ucb.br
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
              <AntDesign name="close" size={28} color="#f6f5f5" />
            </TouchableOpacity>
          </View>

          <View className="h-[0.5px] bg-[#f6f5f5] w-full mt-3" />

          <View className="mt-12">
            <DrawerItem
              icon={<AntDesign name="hearto" size={24} color="#f6f5f5" />}
              title="Favoritos"
            />
            <DrawerItem
              icon={<FontAwesome name="moon-o" size={24} color="#f6f5f5" />}
              title="Alterar Tema"
              button={
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              }
            />
          </View>

          <View className="flex-1 justify-end space-y-3">
            <Text className="font-fontMedium text-xs text-[#999999]">Mais</Text>
            <Text className="text-textWhite text-sm font-fontSemibold">
              Política de Privacidade
            </Text>
            <Text className="text-textWhite text-sm font-fontSemibold">
              Sobre Nós
            </Text>
            <View>
              <Text className="text-textWhite font-fontSemibold">Suporte</Text>
              <Text className="text-xs text-textWhite">
                unibiblioteca@suporte.com
              </Text>
            </View>
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
          className="h-16 border-b border-[#33333333] flex-row items-center px-3"
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

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
            className="flex-1"
          >
            <MaterialIcons name="menu-open" size={28} color="#1687A7" />
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
            className="text-base text-[#7c7c7c] font-fontSemibold  mt-6"
          >
            Nos diga,
          </Animated.Text>
          <Animated.Text
            style={{
              opacity: Text2opacity,
            }}
            className="text-base text-[#7c7c7c] font-fontSemibold"
          >
            Qual livro deseja pesquisar no acervo?
          </Animated.Text>

          <View className="flex-row items-center justify-between mt-3">
            <View className="border h-9 border-[#33333333] bg-[#fafafa] flex-1 rounded shadow-sm flex-row items-center px-2">
              <TextInput
                placeholder="Pesquisar por autores, títulos ou categorias"
                className="flex-1"
              />

              <Feather name="search" size={20} color="#1687A7" />
            </View>

            <View className="flex-1 items-center flex-row justify-end">
              <Text className="text-xs font-fontSemibold text-[#222831] mr-1">
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
                      color={"#222831"}
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

          <View className="mt-6">
            <Text className="font-fontBold text-base text-[#222831]">
              Recomendados
            </Text>
            <Animated.FlatList
              data={books}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={32}
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
            <Text className={`text-base text-[#222831] mt-6 font-fontBold`}>
              Continuar lendo
            </Text>
            <Animated.FlatList
              data={books}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={32}
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
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

export default Home;
