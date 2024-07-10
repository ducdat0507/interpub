import { useThemeColor } from "@/hooks/useThemeColor";
import Emoji from "@/types/Emoji";
import { useState } from "react";
import { Image, Text, View, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";

export default function EmojiDisplay({emoji, style}: {emoji: Emoji, style?: any}) {
  return (
    emoji.unicode !== undefined 
      ? <Text>{emoji.unicode}</Text>
      : <Image style={{height: 17, aspectRatio: emoji.imageRatio, alignSelf: "center"}} source={{uri: emoji.imageUrl}} />
  );
}
