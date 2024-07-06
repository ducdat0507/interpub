import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextHeader from "../../basic/TextHeader";
import TextMono from "@/components/basic/TextMono";
import TextBody from "@/components/basic/TextBody";
import HorizontalRule from "@/components/basic/HorizontalRule";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import getUser from "@/api/getUser";
import HTMLBlock from "@/components/html/HTMLBlock";
import DashedLine from "@/components/basic/DashedLine";
import HTMLInline from "@/components/html/HTMLInline";

export default function UserInfoItem({title, content}) {
  return (
    <View style={{display: "flex", flexDirection: "row", gap: 16}}>
      <HTMLInline componentStyle={{ flex: 0.4 }} style={{ color: useThemeColor("color-2"), textAlign: "right" }} content={title} />
      <HTMLInline componentStyle={{ flex: 0.6 }} content={content} />
    </View>
  );
}
