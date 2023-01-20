import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BookProps } from "../utils/types";

const BooksCarousel = ({ book }) => {
  return (
    <TouchableOpacity className="mt-2 mr-3">
      <Image
        source={{
          uri:
            book?.volumeInfo?.imageLinks.thumbnail &&
            book?.volumeInfo?.imageLinks.thumbnail,
        }}
        className="h-44 w-32 rounded"
        resizeMode="stretch"
      />

      <View>
        <Text
          numberOfLines={2}
          className="text-base font-fontSemibold text-textBlack w-32"
        >
          {book?.volumeInfo?.title && book?.volumeInfo?.title}
        </Text>
        <Text
          numberOfLines={2}
          className="text-xs font-fontSemibold text-grey-primary w-32"
        >
          {book.volumeInfo.authors && book.volumeInfo.authors}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BooksCarousel;
