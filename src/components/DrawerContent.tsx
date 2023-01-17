import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import DrawerItem from "./DrawerItem";

const DrawerContent = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View className="flex-1 bg-blue-secondary p-4">
      <View className="flex-row items-center justify-between mt-10">
        <View>
          <Text className="text-base font-fontSemibold text-[#f6f5f5]">
            Lucas Carlos
          </Text>
          <Text className="text-xs font-fontSemibold text-[#f6f5f5]">
            lucas.carlos@a.ucb.br
          </Text>
        </View>
        <AntDesign name="close" size={28} color="#f6f5f5" />
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
            <Ionicons name="notifications-outline" size={24} color="#f6f5f5" />
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
  );
};

export default DrawerContent;
