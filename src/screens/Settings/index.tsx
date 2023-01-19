import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { Entypo } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
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

      <View className="h-[0.5px] bg-grey-secondary w-full mt-3" />

      <View className="mt-3 space-y-3">
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
    </View>
  );
};

export default Settings;
