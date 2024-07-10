import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleHTMLAttributes, useRef, useState } from "react";
import { Image, StyleSheet, View, useColorScheme, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";
import HorizontalRule from "../basic/HorizontalRule";
import Post from "@/types/Post";
import HTMLBlock from "../html/HTMLBlock";
import TextBody from "../basic/TextBody";
import { VideoView, useVideoPlayer } from "expo-video";

export default function PostVideo({attachment}) {
  
  const ref = useRef(null);
  const player = useVideoPlayer(attachment.url, player => {
    player.loop = true;
  });

  return (
    <>
      <VideoView
        ref={ref}
        style={{width: "100%", height: "100%", borderRadius: 7}}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </>
  );
}
