import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AuthContext from "../contexts/Auth/auth";
import { useNavigation } from "@react-navigation/native";

const BooksCarousel = ({ book }) => {
  const { darkMode } = React.useContext(AuthContext);
  const navigation = useNavigation();

  if (book.length < 1) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("BookDetail", {
          item: book,
        })
      }
      className="mt-2 mr-3"
    >
      <Image
        source={{
          uri:
            book.volumeInfo.imageLinks.smallThumbnail &&
            book.volumeInfo.imageLinks.smallThumbnail,
        }}
        className="h-44 w-32 rounded"
        resizeMode="stretch"
      />

      <View>
        <Text
          style={{
            color: darkMode ? "#e5e5e5" : "#222831",
          }}
          numberOfLines={2}
          className="text-base font-fontSemibold w-32"
        >
          {book.volumeInfo.title && book.volumeInfo.title}
        </Text>
        <Text
          numberOfLines={2}
          className="text-xs font-fontSemibold text-light-textGraySecondary w-32"
        >
          {book.volumeInfo.authors && book.volumeInfo.authors}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BooksCarousel;
