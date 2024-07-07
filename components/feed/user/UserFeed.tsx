import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextHeader from "../../basic/TextHeader";
import TextMono from "@/components/basic/TextMono";
import TextBody from "@/components/basic/TextBody";
import HorizontalRule from "@/components/basic/HorizontalRule";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import getUser from "@/api/getUser";
import HTMLBlock from "@/components/html/HTMLBlock";
import DashedLine from "@/components/basic/DashedLine";
import UserInfoItem from "./UserInfoItem";
import ZigZagLine from "@/components/basic/ZigZagLine";
import Account from "@/types/Account";
import { formatDate } from "@/helper/format";
import Animated, { useAnimatedProps, useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import getPostFeed from "@/api/getPostFeed";
import PostList from "../PostList";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function UserFeed() {

  const [handle, setHandle] = useState("eniko@peoplemaking.games");
  const [[localName, domain], setName] = useState(["", ""]);

  const [data, setData] = useState({} as Account);
  const [timelinePosts, setTimelinePosts] = useState<PostFeed>([]);
  const timelineFeed = useRef<PostFeed>({});

  useEffect(() => {
    setName(handle.replace(/^@/, "").split("@") as [string, string]);
  }, [handle]);

  useEffect(() => {
    if (localName && domain) getUser(localName + "@" + domain).then(x => {
      setData(x);
      return getPostFeed(x.feeds?.accountTimeline?.endpoint)
    }).then(x => {
      timelineFeed.current = (x);
      timelineFeed.current.onUpdate = () => setTimelinePosts(timelineFeed.current.posts);
      return x.getNext();
    }).then(x => {
      console.log(timelineFeed.current.onUpdate);
    }).catch(e => console.error(e));
  }, [localName, domain]);

  const styles = StyleSheet.create({
    scrollView: {
      gap: 24,
      paddingBottom: 0,
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
      flexWrap: "wrap",
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
  const color3 = useThemeColor("color-3");

  const gradientRef = useRef<LinearGradient>(null);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const animatedProps = useAnimatedProps(() => {
    let headerHeight = 60 / 200;
    let prog = Math.min(Math.max(scrollOffset.value / 500, 0), 1);
    return {
      colors: [
        background1 + Math.floor(prog * 128).toString(16).padStart(2, '0'), 
        background1 + Math.floor(255 - prog * 96).toString(16).padStart(2, '0'),
        background1, background1
      ],
      locations: [0, 1 - prog * (1 - headerHeight), 1 - prog * prog * (1 - headerHeight), 1],
    };
  });

  return (
    <>
      <View style={styles.profileBackgroundHolder}>
        <Image style={styles.profileBackground} source={{
          uri: data.profileBannerUrl
        }} />
        <AnimatedLinearGradient ref={gradientRef}
          colors={[background1 + "00", background1 + "80", background1 + "b0", background1]}
          locations={[0, 0, 1, 1]}
          animatedProps={animatedProps}
          style={styles.profileBackgroundOverlay}
        />
      </View>
      <Animated.ScrollView ref={scrollRef} style={styles.scrollView} scrollEventThrottle={50}>
        <View style={styles.profileImageHolder}>
          <Image style={styles.profileImage} source={{
            uri: data.profileImageUrl
          }} />
        </View>
        <View style={styles.profileInfo}>
          <View>
            <TextHeader>{data.displayName}</TextHeader>
          </View>
          <View style={styles.handleContainer}>
            <View style={styles.handleButton}>
              <TextMono>@{localName}</TextMono>
              <TextMono style={{color: color2}}>@{domain}</TextMono>
            </View>
          </View>
          <HorizontalRule style={{ marginVertical: 8 }} />
          <View style={{ gap: 12 }}>
            { data.description
              ? <> 
                <HTMLBlock content={data.description} />
                <DashedLine baseStyle={{ marginVertical: 4 }}  />
              </> : null }
            <UserInfoItem title={"Joined"} content={data.creationDate ? formatDate(data.creationDate) : "¯\\_(ツ)_/¯"} />
            { data.extraInfo?.length 
              ? data.extraInfo.map(link => <UserInfoItem title={link.title} content={link.content} />)
              : null }
            { data.links?.length 
              ? <> 
                <DashedLine baseStyle={{ marginVertical: 4 }}  />
                {data.links.map(link => <UserInfoItem title={link.title} content={link.content} />)}
              </> : null }
          </View>
          <HorizontalRule style={{ marginVertical: 8 }} />
          <Pressable style={styles.bigFollowButton} onPress={() => {}}>
            <TextBody>
              Big follow button
            </TextBody>
          </Pressable>
        </View>
        <ZigZagLine baseStyle={{ marginVertical: 24 }}  />
        {false && <PostList posts={timelinePosts} />}
        <TextBody style={{color: color3, alignSelf: "center"}}>End of feed</TextBody>
        <View style={{height: 60}} />
      </Animated.ScrollView>
    </>
  );
}
