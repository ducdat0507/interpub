import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleHTMLAttributes, useState } from "react";
import { Image, ScrollView, StyleSheet, View, useColorScheme, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";
import HorizontalRule from "../basic/HorizontalRule";
import Post from "@/types/Post";
import HTMLBlock from "../html/HTMLBlock";
import TextBody from "../basic/TextBody";
import PostAttachment from "./PostAttachment";

export default function PostAttachmentView({attachments}) {
  
  const styles = StyleSheet.create({
    container: {
      gap:8,
    },
  });

  const autoStyle = attachments.length == 1 ? {
    aspectRatio: 16/9
  } : attachments.length == 2 ? {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  } : {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  } as StyleHTMLAttributes<View>;

  const itemStyle = attachments.length == 1 ? {

  } : attachments.length == 2 ? {
    flex: 0.5,
    aspectRatio: 8/9,
  } : {
    flex: 0.5,
    aspectRatio: 16/9,
  } as StyleHTMLAttributes<View>;

  return (
    attachments.length <= 2 ? <>
      <View style={[styles.container, autoStyle]}>
        {attachments.map(x => <PostAttachment style={itemStyle} attachment={x} />)}
      </View>
    </> : <>
      <ScrollView horizontal style={{marginHorizontal: -24, aspectRatio: 16/9}}>
        <View style={[{paddingHorizontal: 24}, styles.container, autoStyle]}>
          {[...new Array(Math.ceil(attachments.length / 2))].map((_, i) => <>
            <View style={[{display: "flex", flexDirection: "column", flex: 0.1, gap: 8}]}>
              <PostAttachment style={itemStyle} attachment={attachments[i * 2]} />
              {attachments[i * 2 + 1] ? <PostAttachment style={itemStyle} attachment={attachments[i * 2 + 1]} /> : <View/>}
            </View>
          </>)}
        </View>
      </ScrollView>
    </>
  );
}
