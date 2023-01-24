import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Switch,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { NavigationStackProp } from "react-navigation-stack";
import * as Haptics from "expo-haptics";

const { height } = Dimensions.get("screen");

interface SettingsProps {
  navigation: NavigationStackProp;
}
const Settings = ({ navigation }: SettingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheet = useRef();

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isEnabled2, setIsEnabled2] = useState<boolean>(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

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
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center"
          >
            <Entypo name="chevron-left" size={32} color="#1687A7" />
            <Text className="text-[#1687A7] font-fontSemibold text-base">
              Voltar
            </Text>
          </TouchableOpacity>
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
            Notificações por E-Mail/SMS
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

        <TouchableOpacity
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            bottomSheet?.current?.show();
          }}
          className="flex-row items-center justify-between"
        >
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
      <BottomSheet
        radius={24}
        sheetBackgroundColor="#f6f5f5"
        hasDraggableIcon
        ref={bottomSheet}
        height={height * 0.3}
      >
        <View className="space-y-1">
          <Text className="font-fontBold text-textBlack text-lg text-center">
            Tema
          </Text>

          <View className="w-full h-[0.5px] bg-[#33333333]" />
        </View>

        <View className="p-4 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-fontSemibold text-textBlack text-base">
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
            <Text className="font-fontSemibold text-textBlack text-base">
              Usar o padrão do dispositivo
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#53d769" }}
              thumbColor={"#f6f5f5"}
              onValueChange={toggleSwitch2}
              value={isEnabled2}
            />
          </View>

          <Text className="text-grey-primary mt-1 font-fontMedium text-xs">
            Defina o modo escuro para usar a opção Claro ou Escuro, localizada
            nas configurações de tela e brilho do dispositivo.
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Settings;
