import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Switch } from "react-native";
import { ParamListBase, DrawerNavigationState } from "@react-navigation/native";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DrawerItem from "./DrawerItem";
import BottomSheet from "react-native-gesture-bottom-sheet";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("screen");

interface DrawerProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}
const CustomDrawer = ({ state, navigation, descriptors }: DrawerProps) => {
  const toggleSwitch = async () => {};
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);
  const [isEnabled2, setIsEnabled2] = React.useState<boolean>(false);

  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const bottomSheet = React.useRef();
  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{ translateX }],
    };
  });

  const viewStyles2 = useAnimatedStyle(() => {
    const translateY = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const viewStyles3 = useAnimatedStyle(() => {
    const translateY = interpolate(drawerProgress.value, [0, 1], [200, 0]);
    const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[viewStyles, { width: width * 0.6 }]}
      className="flex-1"
    >
      <View className="p-4 flex-1 justify-evenly">
        <Animated.View
          style={[viewStyles2]}
          className="flex-row items-center justify-between"
        >
          <View>
            <Text className="text-base font-fontSemibold text-light-textWhite">
              Lucas Carlos
            </Text>
            <Text className="text-xs font-fontSemibold text-light-textWhite opacity-60">
              lucas.carlos@a.ucb.br
            </Text>
          </View>
        </Animated.View>

        <View className="mt-8 justify-start">
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
            icon={<Feather name="settings" size={24} color="#f6f5f5" />}
            title="Configurações"
            onPress={() => navigation.navigate("Settings")}
          />

          <DrawerItem
            icon={<Feather name="moon" size={24} color="#f6f5f5" />}
            title="Tema escuro"
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              bottomSheet?.current?.show();
            }}
          />
        </View>

        <Animated.View style={[viewStyles3]} className="space-y-3">
          <View className="h-[0.5px] bg-light-textWhite opacity-30 w-full mt-3" />

          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <Text className="text-light-textWhite text-sm font-fontSemibold">
              Política de Privacidade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            <Text className="text-light-textWhite text-sm font-fontSemibold">
              Termos e Condições
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-light-textWhite text-sm font-fontSemibold">
              Sobre Nós
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-light-textWhite font-fontSemibold">
              Suporte
            </Text>
            <Text className="text-xs text-light-textWhite">
              unibiblioteca@suporte.com
            </Text>
          </TouchableOpacity>

          <BottomSheet
            radius={24}
            sheetBackgroundColor="#f6f5f5"
            hasDraggableIcon
            ref={bottomSheet}
            height={height * 0.3}
          >
            <View className="space-y-1">
              <Text className="font-fontBold text-light-textColor text-lg text-center">
                Tema
              </Text>

              <View className="w-full h-[0.5px] bg-[#33333333]" />
            </View>

            <View className="p-4 flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-fontSemibold text-light-textColor text-base">
                  Modo escuro
                </Text>

                <Switch
                  trackColor={{ false: "#767577", true: "#53d769" }}
                  thumbColor={"#f6f5f5"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <View className="flex-row items-center justify-between mt-3">
                <Text className="font-fontSemibold text-light-textColor text-base">
                  Usar o padrão do dispositivo
                </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#53d769" }}
                  thumbColor={"#f6f5f5"}
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
              </View>

              <Text className="text-light-textGraySecondary mt-1 font-fontMedium text-xs">
                Defina o modo escuro para usar a opção Claro ou Escuro,
                localizada nas configurações de tela e brilho do dispositivo.
              </Text>
            </View>
          </BottomSheet>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default CustomDrawer;
