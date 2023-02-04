import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AuthContext from "../contexts/Auth/auth";

interface Props {
  icon: JSX.Element;
  title: string;
  button?: JSX.Element;
  onPress?: () => void;
}

const DrawerItem = ({ icon, title, button, onPress }: Props) => {
  const { darkMode } = React.useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center mb-6 justify-between"
    >
      <View className="flex-row items-center justify-between space-x-4">
        <Text>{icon}</Text>
        <Text
          style={{ color: darkMode ? "#e5e5e5" : "#222831" }}
          className="font-fontBold"
        >
          {title}
        </Text>
      </View>

      {button && button}
    </TouchableOpacity>
  );
};

export default DrawerItem;
