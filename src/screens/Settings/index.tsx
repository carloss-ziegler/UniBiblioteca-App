import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <>
            <Text className="font-fontSemibold text-textBlack">
              Configurações
            </Text>
          </>
        );
      },
    });
  }, []);

  return (
    <View className="flex-1 bg-textWhite p-3">
      <Text className="font-fontSemibold text-textBlack text-base">
        Opções de notificação:
      </Text>

      <View className="mt-3 space-y-4">
        <TouchableOpacity className="flex-row items-center justify-between">
          <Text className="text-textBlack font-fontMedium">
            Notificações de push
          </Text>

          <Entypo name="chevron-right" size={16} color="#222831" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
          <Text className="text-textBlack font-fontMedium">
            Notificações por e-mail/SMS
          </Text>

          <Entypo name="chevron-right" size={16} color="#222831" />
        </TouchableOpacity>
      </View>

      <View className="h-[0.6px] bg-[#bbbbbbbb] w-full mt-3" />

      <Text className="font-fontSemibold text-textBlack text-base mt-5">
        Outras opções:
      </Text>

      <View className="mt-3 space-y-4">
        <TouchableOpacity className="flex-row items-center justify-between">
          <Text className="text-textBlack font-fontMedium">Idioma</Text>

          <Text className="font-fontMedium text-textBlack opacity-60 text-xs">
            Português
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
          <Text className="text-textBlack font-fontMedium">Tema</Text>

          <View className="flex-row items-center space-x-1">
            <Text className="font-fontMedium text-textBlack opacity-60 text-xs">
              Claro
            </Text>
            <Entypo name="chevron-down" size={16} color="#22283190" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
          <Text className="text-textBlack font-fontMedium">Sobre</Text>

          <Entypo name="chevron-right" size={16} color="#222831" />
        </TouchableOpacity>
      </View>

      <View className="bg-[#bbbbbbbb] h-[0.6px] w-full mt-3" />

      <TouchableOpacity
        onPress={async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigation.reset({
            routes: [{ name: "Authentication" }],
          });
          setLoading(false);
        }}
        className="mt-3"
      >
        {loading ? (
          <ActivityIndicator color="#222831" />
        ) : (
          <Text className="font-fontSemibold text-base text-[#E72430]">
            Sair de Lucas Carlos
          </Text>
        )}
      </TouchableOpacity>

      <Text className="self-center absolute bottom-10 font-fontMedium opacity-50">
        Versão 1.0.0
      </Text>
    </View>
  );
};

export default Settings;
