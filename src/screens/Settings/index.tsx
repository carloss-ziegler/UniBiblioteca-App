import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { NavigationStackProp } from "react-navigation-stack";
import AuthContext from "../../contexts/Auth/auth";

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
        backgroundColor: darkMode ? "#000" : undefined,
      },
      headerShadowVisible: darkMode ? false : undefined,
    });
  }, []);

  function handleSignOut() {
    signOut();
  }

  return (
    <View
      style={{
        backgroundColor: darkMode ? "#151515" : "#f6f5f5",
      }}
      className="flex-1 p-3"
    >
      <Text
        style={{
          color: darkMode ? "#e5e5e5" : "#222831",
        }}
        className="font-fontSemibold text-base"
      >
        Opções de notificação:
      </Text>

      <View className="mt-3 space-y-4">
        <TouchableOpacity className="flex-row items-center justify-between">
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
            size={16}
            color={darkMode ? "#e5e5e5" : "#222831"}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
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
            size={16}
            color={darkMode ? "#e5e5e5" : "#222831"}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: darkMode ? "#666" : "#bbbbbbbb",
        }}
        className="h-[0.6px] w-full mt-3"
      />

      <Text
        style={{
          color: darkMode ? "#e5e5e5" : "#222831",
        }}
        className="font-fontSemibold text-base mt-5"
      >
        Outras opções:
      </Text>

      <View className="mt-3 space-y-4">
        <TouchableOpacity className="flex-row items-center justify-between">
          <Text
            style={{
              color: darkMode ? "#e5e5e5" : "#222831",
            }}
            className="font-fontMedium"
          >
            Idioma
          </Text>

          <Text
            style={{
              color: darkMode ? "#e5e5e5" : "#222831",
            }}
            className="font-fontMedium opacity-60 text-xs"
          >
            Português
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
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
            size={16}
            color={darkMode ? "#e5e5e5" : "#222831"}
          />
        </TouchableOpacity>
      </View>

      <View className="bg-[#bbbbbbbb] h-[0.6px] w-full mt-3" />

      <TouchableOpacity onPress={handleSignOut} className="mt-3">
        <Text className="font-fontSemibold text-base text-[#E72430]">
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
    </View>
  );
};

export default Settings;
