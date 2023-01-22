import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import BGImage from "../../../assets/images/image4.png";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

const uni = ["UCB - Universidade Católica de Brasília"];

const Authentication = ({ navigation }) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 24,
        paddingVertical: 24,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flex: 0.4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={BGImage}
          style={{
            width: width,
            height: width * 0.7,
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{ fontSize: 20, color: "#222831" }}
          className="font-fontSemibold"
        >
          Bem-Vindo(a)!
        </Text>

        <View
          style={{
            marginTop: 36,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "#7c7c7c", fontSize: 16 }}
            className="font-fontSemibold"
          >
            Selecione a sua instituição de ensino
          </Text>

          <SelectDropdown
            data={uni}
            onSelect={(selectedItem, index) => {
              setValue(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText="Selecionar"
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={{
              backgroundColor: "#f6f5f5",
              borderRadius: 4,
            }}
            buttonStyle={{
              backgroundColor: "#e5e5e5",
              marginTop: 24,
              borderRadius: 4,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          />

          <TouchableOpacity
            onPress={async () => {
              if (value) {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                navigation.reset({
                  routes: [{ name: "BottomTab" }],
                });
                setLoading(false);
              } else {
                alert("Selecione uma instituição de ensino!");
              }
            }}
            style={{
              marginTop: 28,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1687A7",
              borderRadius: 4,
              paddingHorizontal: 32,
              paddingVertical: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#f6f5f5" />
            ) : (
              <Text
                style={{ color: "#f6f5f5", fontSize: 20 }}
                className="font-fontSemibold"
              >
                Entrar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Authentication;
