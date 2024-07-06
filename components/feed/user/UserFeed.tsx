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
import UserInfoItem from "./UserInfoItem";

export default function UserFeed() {

  const [handle, setHandle] = useState("@ducdat0507@mastodon.gamedev.place");
  const [[localName, domain], setName] = useState(["", ""]);

  const [data, setData] = useState(null);

  useEffect(() => {
    setName(handle.replace(/^@/, "").split("@") as [string, string]);
  }, [handle]);

  useEffect(() => {
    getUser(localName + "@" + domain).then(x => (console.log(x), setData(x))).catch(e => console.error(e));
  }, [localName, domain]);

  const styles = StyleSheet.create({
    scrollView: {
      gap: 24,
    },
    profileBackgroundHolder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 200,
    },
    profileBackground: {
      backgroundColor: useThemeColor("color-3"),
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    profileBackgroundOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    profileImageHolder: {
      marginTop: 100,
      marginBottom: 8,
      marginLeft: 16,
    },
    profileImage: {
      width: 132,
      height: 132,
      backgroundColor: useThemeColor("color-1"),
      borderRadius: 68,
      borderColor: useThemeColor("background-1"),
      borderWidth: 8,
    },
    profileInfo: {
      paddingHorizontal: 24,
      gap: 8,
    },
    handleContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 4,
    },
    handleButton: {
      borderColor: useThemeColor("border-1"),
      borderWidth: 1,
      display: "flex",
      flexDirection: "row",
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
    bigFollowButton: {
      borderColor: useThemeColor("border-1"),
      borderWidth: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
  });

  const background1 = useThemeColor("background-1");
  const color2 = useThemeColor("color-2");

  return (
    <>
      {data ? <>
        <View style={styles.profileBackgroundHolder}>
          <Image style={styles.profileBackground} source={{
            uri: data.image?.url
          }} />
          <LinearGradient
            // Background Linear Gradient
            colors={[background1 + "00", background1]}
            style={styles.profileBackgroundOverlay}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileImageHolder}>
            <Image style={styles.profileImage} source={{
              uri: data.icon.url
            }} />
          </View>
          <View style={styles.profileInfo}>
            <View>
              <TextHeader>{data.name}</TextHeader>
            </View>
            <View style={styles.handleContainer}>
              <View style={styles.handleButton}>
                <TextMono>@{localName}</TextMono>
                <TextMono style={{color: color2}}>@{domain}</TextMono>
              </View>
            </View>
            <HorizontalRule style={{ marginVertical: 8 }} />
            <View style={{ gap: 12 }}>
              <HTMLBlock content={data.summary} />
              <DashedLine />
              <UserInfoItem title={"Joined"} content={new Date(data.published).toDateString()} />
              { data.attachment?.length 
                ? <> 
                  <DashedLine />
                  {data.attachment.map(link => <UserInfoItem title={link.name} content={link.value} />)}
                </> : null }
            </View>
            <HorizontalRule style={{ marginVertical: 8 }} />
            <Pressable style={styles.bigFollowButton} onPress={() => {}}>
              <TextBody>
                Big follow button
              </TextBody>
            </Pressable>
          </View>
        </ScrollView>
      </> : <>
      <TextBody>Loading...</TextBody>
      </>}
    </>
  );
}
