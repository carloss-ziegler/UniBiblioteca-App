import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  icon: JSX.Element;
  title: string;
  button?: JSX.Element;
  onPress?: () => void;
}

const DrawerItem = ({ icon, title, button, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center mb-6 justify-between"
    >
      <View className="flex-row items-center justify-between space-x-4">
        <Text>{icon}</Text>
        <Text className="font-fontBold text-light-textWhite">{title}</Text>
      </View>

      {button && button}
    </TouchableOpacity>
  );
};

export default DrawerItem;
