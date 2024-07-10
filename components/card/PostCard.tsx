import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useColorScheme, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";
import HorizontalRule from "../basic/HorizontalRule";
import Post from "@/types/Post";
import HTMLBlock from "../html/HTMLBlock";
import TextBody from "../basic/TextBody";
import PostAttachment from "./PostAttachment";
import PostAttachmentView from "./PostAttachmentView";
import TextMono from "../basic/TextMono";
import DashedLine from "../basic/DashedLine";
import Account from "@/types/Account";
import { formatDuration } from "@/helper/format";
import { Ionicons } from "@expo/vector-icons";
import TextHeader from "../basic/TextHeader";
import EmojiDisplay from "../basic/EmojiDisplay";

export default function PostCard({post}: { post: Post }) {
  
  const styles = StyleSheet.create({
    authorInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    userImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    boostUserImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginTop: -4,
      marginRight: -6,
      marginBottom: -12,
      borderColor: useThemeColor("background-1"),
      borderWidth: 4,
      overflow: "hidden",
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: useThemeColor("border-1"),
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
    }
  });

  const color2 = useThemeColor("color-2");
  const color3 = useThemeColor("color-3");
  const border1 = useThemeColor("border-1");

  return (
    <>
      <View style={{marginHorizontal: 24, gap: 12}}>
        {typeof post.author == "object" ? <View style={styles.authorInfo}>
          <View style={{alignItems: "flex-end", flexDirection: "column-reverse"}}>
            <Image source={{uri: post.author.profileImageUrl}} style={styles.userImage} />
            {!!post.boostData && <View style={styles.boostUserImage}>
              <Image source={{uri: (post.boostData.boostedBy as Account).profileImageUrl}} style={{width: "100%", height: "100%", borderRadius: 1e9}} resizeMode={"contain"} />
            </View>}
          </View>
          <View style={{gap: 2, paddingBottom: 4}}>
            {!!post.boostData && <TextBody style={{color: color3}}>
              <Text style={{fontWeight: "700"}}>
                {typeof post.boostData.boostedBy == "object" ? post.boostData.boostedBy.displayName : post.boostData.boostedBy}
              </Text> boosted
            </TextBody>}
            <TextBody style={{fontWeight: "700"}}>{post.author.displayName}</TextBody>
            <TextMono>
              @{post.author.handle?.split("@")[1]}
              <Text style={{color: color2}}>@{post.author.handle?.split("@")[2]}</Text>
            </TextMono>
          </View>
        </View> : <>
        </>}
        <HTMLBlock content={post.body ?? ""} />
        {post.attachments.length >= 1 && <PostAttachmentView attachments={post.attachments} />}
        <ScrollView style={{marginHorizontal: -24, marginBottom: -12}} horizontal={true}>
          <View style={{flexDirection: "row", gap: 8, marginHorizontal: 24, marginBottom: 12}}>
            <Pressable style={styles.actionButton}>
              <TextBody>⭐</TextBody>
              <TextBody> {post.starCount}</TextBody>
            </Pressable>
            {!!post.reactions?.length && <>
              <View style={{borderColor: border1, borderLeftWidth: 1 }} />
              {post.reactions.map(reaction => <>
                <Pressable style={styles.actionButton}>
                  <TextBody style={{marginVertical: -6}}><EmojiDisplay emoji={reaction.emoji}/> </TextBody>
                  <TextBody>{reaction.count}</TextBody>
                </Pressable>
              </>)}
            </>}
          </View>
        </ScrollView>
        <DashedLine />
        <View style={{flexDirection: "row", gap: 8}}>
          <Pressable style={styles.actionButton}>
            <TextBody><Ionicons name="chatbubble-outline" size={24}/></TextBody>
            {!!post.replyCount && <TextBody> {post.replyCount}</TextBody>}
          </Pressable>
          <Pressable style={styles.actionButton}>
            <TextBody><Ionicons name="rocket-outline" size={24}/></TextBody>
            {!!post.boostCount && <TextBody> {post.boostCount}</TextBody>}
          </Pressable>
          <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
            <TextBody style={{color: color3}}>
              {formatDuration(Date.now() - +post.createdAt)}
            </TextBody>
          </View>
          <Pressable style={styles.actionButton}>
            <TextBody><Ionicons name="bookmark-outline" size={24}/></TextBody>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <TextBody><Ionicons name="ellipsis-vertical-outline" size={24}/></TextBody>
          </Pressable>
        </View>
      </View>
      <HorizontalRule style={{marginVertical: 24, borderColor: useThemeColor("border-2") }} />
    </>
  );
}
