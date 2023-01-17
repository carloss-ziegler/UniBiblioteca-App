import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BookProps } from "../utils/types";

interface Props {
  book: BookProps;
}

const BooksCarousel = ({ book }: Props) => {
  return (
    <TouchableOpacity className="mt-2 mr-2">
      <Image
        source={{ uri: book.thumbnail }}
        className="h-52 w-40 rounded"
        resizeMode="stretch"
      />

      <View>
        <Text
          //   numberOfLines={1}
          className="text-base font-fontSemibold text-[#222831] w-40"
        >
          {book.title}
        </Text>
        <Text className="text-xs font-fontSemibold text-[#9d9d9d]">
          {book.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BooksCarousel;
