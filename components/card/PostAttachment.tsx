import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleHTMLAttributes, useState } from "react";
import { Image, Pressable, StyleSheet, View, useColorScheme, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";
import HorizontalRule from "../basic/HorizontalRule";
import Post from "@/types/Post";
import HTMLBlock from "../html/HTMLBlock";
import TextBody from "../basic/TextBody";
import PostVideo from "./PostVideo";
import { Ionicons } from "@expo/vector-icons";

export default function PostAttachment({attachment, style}) {
  
  const styles = StyleSheet.create({
    container: {
      borderColor: useThemeColor("border-1"),
      borderWidth: 1,
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
    },
    playButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: useThemeColor("background-2"),
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-40px, -40px)",
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor: useThemeColor("border-1"),
      borderWidth: 1,
    },
  });

  let color1 = useThemeColor("color-1");

  return (
    <>
      <View style={[styles.container, style]}>
        {attachment.type.startsWith("image") ? <>
          <Image style={{width: "100%", height: "100%", borderRadius: 7}} source={{ uri: attachment.previewUrl }} />
        </> : attachment.type.startsWith("video") ? <>
          <Image style={{width: "100%", height: "100%", borderRadius: 7}} source={{ uri: attachment.previewUrl }} />
          <View style={styles.playButton}>
            <Ionicons name="play-outline" size={40} color={color1} style={{marginLeft: 4}} />
          </View>
        </> : <>
          <TextBody>{attachment.type}</TextBody>
        </>}
      </View>
    </>
  );
}
