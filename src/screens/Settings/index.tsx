import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackProp } from "react-navigation-stack";
import AuthContext from "../../contexts/Auth/auth";
import * as Haptics from "expo-haptics";

interface SettingsProps {
  navigation: NavigationStackProp;
}
const Settings = ({ navigation }: SettingsProps) => {
  const { signOut, darkMode } = useContext(AuthContext);

  useLayoutEffect(() => {
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
              Configurações
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

  function handleSignOut() {
    signOut();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{
        backgroundColor: darkMode ? "#010101" : "#f2f1f6",
      }}
      className="py-5"
    >
      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: darkMode ? "#66666699" : "#d8d8d8",
          backgroundColor: darkMode ? "#1c1c1e" : "#fff",
        }}
        className="mt-3 p-3"
      >
        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center justify-between">
            <View className="h-16 w-16 rounded-full bg-[#017BFF] items-center justify-center">
              <Text className="text-white text-2xl">LC</Text>
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <View>
                <Text
                  style={{
                    color: darkMode ? "#e5e5e5" : "#222831",
                  }}
                  className="font-fontMedium text-base"
                >
                  Lucas Carlos
                </Text>

                <Text
                  style={{
                    color: darkMode ? "#e5e5e580" : "#22283180",
                  }}
                  className="font-fontMedium text-xs"
                >
                  Universidade Católica de Brasília
                </Text>
              </View>
              <Entypo
                name="chevron-right"
                size={18}
                color={darkMode ? "#e5e5e560" : "#22283160"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* <Text
        style={{
          color: darkMode ? "#e5e5e5" : "#222831",
        }}
        className="font-fontSemibold text-lg px-3"
      >
        Opções de notificação
      </Text> */}

      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: darkMode ? "#66666699" : "#d8d8d8",
          backgroundColor: darkMode ? "#1c1c1e" : "#fff",
        }}
        className="mt-8 p-3"
      >
        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between mb-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="p-1 rounded bg-[#179E8D] items-center justify-center">
              <Entypo
                name="notification"
                size={16}
                color="#fff"
                style={{ marginLeft: 2 }}
              />
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="font-fontMedium"
              >
                Notificações de push
              </Text>
              <Entypo
                name="chevron-right"
                size={18}
                color={darkMode ? "#e5e5e560" : "#22283160"}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: darkMode ? "#66666699" : "#d8d8d8",
            width: "200%",
          }}
        />

        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between mt-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="p-1 rounded bg-[#38A6E1] items-center justify-center">
              <MaterialIcons name="email" size={16} color="#fff" />
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="font-fontMedium"
              >
                Notificações por E-Mail/SMS
              </Text>
              <Entypo
                name="chevron-right"
                size={18}
                color={darkMode ? "#e5e5e560" : "#22283160"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* <Text
        style={{
          color: darkMode ? "#e5e5e5" : "#222831",
        }}
        className="font-fontSemibold text-lg mt-5 px-3"
      >
        Outras opções
      </Text> */}

      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: darkMode ? "#66666699" : "#d8d8d8",
          backgroundColor: darkMode ? "#1c1c1e" : "#fff",
        }}
        className="mt-8 p-3"
      >
        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between mb-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="p-1 rounded bg-[#43B560] items-center justify-center">
              <Ionicons name="ios-language" size={16} color="#fff" />
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="font-fontMedium"
              >
                Idioma
              </Text>
              <Text
                className="font-fontMedium text-xs"
                style={{ color: darkMode ? "#e5e5e560" : "#22283160" }}
              >
                Português
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: darkMode ? "#66666699" : "#d8d8d8",
            width: "200%",
          }}
        />

        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between my-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="p-1 rounded bg-[#F43930] items-center justify-center">
              <Entypo name="heart" size={16} color="#fff" />
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="font-fontMedium"
              >
                Sobre
              </Text>
              <Entypo
                name="chevron-right"
                size={18}
                color={darkMode ? "#e5e5e560" : "#22283160"}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: darkMode ? "#66666699" : "#d8d8d8",
            width: "200%",
          }}
        />

        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          className="flex-row items-center justify-between mt-3"
        >
          <View className="flex-row items-center justify-between">
            <View className="p-1 rounded bg-[#017BFF] items-center justify-center">
              <Ionicons name="information" size={16} color="#fff" />
            </View>
            <View className="flex-row items-center justify-between flex-1 ml-3">
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#222831",
                }}
                className="font-fontMedium"
              >
                Ajuda
              </Text>
              <Entypo
                name="chevron-right"
                size={18}
                color={darkMode ? "#e5e5e560" : "#22283160"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        className="self-center absolute bottom-16"
      >
        <Text className="font-fontSemibold text-sm text-[#E72430]">
          Sair de Lucas Carlos
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: darkMode ? "#e5e5e5" : "#222831",
        }}
        className="self-center absolute bottom-10 font-fontMedium opacity-30"
      >
        Versão 1.0.0
      </Text>
    </ScrollView>
  );
};

export default Settings;
