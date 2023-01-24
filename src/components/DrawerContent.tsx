import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DrawerItem from "./DrawerItem";

const { width } = Dimensions.get("screen");

interface DrawerProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}
const CustomDrawer = ({ state, navigation, descriptors }: DrawerProps) => {
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
      style={[viewStyles, { width: width * 0.55 }]}
      className="flex-1"
    >
      <View className="p-4 flex-1">
        <Animated.View
          style={[viewStyles2]}
          className="flex-row items-center justify-between"
        >
          <View>
            <Text className="text-base font-fontSemibold text-textWhite">
              Lucas Carlos
            </Text>
            <Text className="text-xs font-fontSemibold text-textWhite opacity-60">
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
        </View>

        <Animated.View
          style={[viewStyles3]}
          className="flex-1 justify-end space-y-3"
        >
          <View className="h-[0.5px] bg-textWhite opacity-30 w-full mt-3" />

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
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default CustomDrawer;
