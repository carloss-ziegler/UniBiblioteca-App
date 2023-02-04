import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AuthContext from "../contexts/Auth/auth";

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  const { darkMode } = React.useContext(AuthContext);

  return (
    <View
      style={{ backgroundColor: darkMode ? "#2a2a2c" : "#eaeaea" }}
      className="p-2 m-1 rounded-lg flex-row items-center space-x-3"
    >
      <Text
        numberOfLines={1}
        style={{ color: darkMode ? "#e5e5e5" : "#222831" }}
        className="font-fontMedium max-w-[150px] truncate"
      >
        {text}
      </Text>

      <TouchableOpacity>
        <Text
          style={{
            color: darkMode ? "#e5e5e570" : "#22283160",
            fontWeight: "700",
          }}
        >
          X
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tag;
