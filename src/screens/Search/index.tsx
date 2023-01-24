import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Search = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <>
            <Text className="text-textBlack font-fontSemibold">Pesquisar</Text>
          </>
        );
      },
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView className="flex-1 px-3">
        <View
          style={{ elevation: 4 }}
          className="flex-row items-center border rounded border-borderGrey justify-center mt-3"
        >
          <View className="h-12 rounded-tl rounded-bl bg-whiteSmoke shadow-sm flex-row items-center px-2 flex-[0.85]">
            <TextInput
              autoFocus
              autoCapitalize="none"
              // value={searchInput}
              // onChangeText={(text) => setSearchInput(text)}
              placeholder="Autores, títulos ou categorias"
              className="flex-1 placeholder:text-xs h-12"
              returnKeyType="done"
              // onSubmitEditing={searchBook}
            />
          </View>

          <View className="h-full w-[0.5px] bg-textBlack opacity-40" />

          <TouchableOpacity
            className="items-center rounded-tr rounded-br flex-[0.15] bg-whiteSmoke shadow-sm justify-center h-12"
            //   onPress={searchBook}
          >
            <Feather name="search" size={20} color="#1687A7" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Search;
