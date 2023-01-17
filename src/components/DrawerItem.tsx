import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  icon: React.Component;
  title: string;
  button?: React.ReactElement;
}

const DrawerItem = ({ icon, title, button }) => {
  return (
    <TouchableOpacity className="flex-row items-center mb-6 justify-between">
      <View className="flex-row items-center justify-between space-x-4">
        <Text>{icon}</Text>
        <Text className="font-fontBold text-[#f6f5f5]">{title}</Text>
      </View>

      {button && button}
    </TouchableOpacity>
  );
};

export default DrawerItem;
