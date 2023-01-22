import { Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favorites from "../screens/Favorites";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#1687A7" : "#33333366"}
              />
            );
          },
          tabBarLabel({ focused }) {
            return (
              <Text
                style={{
                  color: focused ? "#1687A7" : "#33333366",
                  fontSize: 12,
                }}
              >
                Início
              </Text>
            );
          },
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <AntDesign
                name="search1"
                size={24}
                color={focused ? "#1687A7" : "#33333366"}
              />
            );
          },
          tabBarLabel({ focused }) {
            return (
              <Text
                style={{
                  color: focused ? "#1687A7" : "#33333366",
                  fontSize: 12,
                }}
              >
                Pesquisar
              </Text>
            );
          },
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <MaterialCommunityIcons
                name="bookshelf"
                size={24}
                color={focused ? "#1687A7" : "#33333366"}
              />
            );
          },
          tabBarLabel({ focused }) {
            return (
              <Text
                style={{
                  color: focused ? "#1687A7" : "#33333366",
                  fontSize: 12,
                }}
              >
                Meu Acervo
              </Text>
            );
          },
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
        name="Favorites"
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
