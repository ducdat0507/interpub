import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import TextHeader from "../../basic/TextHeader";
import TextMono from "@/components/basic/TextMono";
import TextBody from "@/components/basic/TextBody";
import HorizontalRule from "@/components/basic/HorizontalRule";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import getUser from "@/api/activitypub/getUser";
import HTMLBlock from "@/components/html/HTMLBlock";
import DashedLine from "@/components/basic/DashedLine";
import UserInfoItem from "./UserInfoItem";
import ZigZagLine from "@/components/basic/ZigZagLine";
import Account from "@/types/Account";
import { formatDate } from "@/helper/format";
import Animated, { useAnimatedProps, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import PostList from "../PostList";
import Post from "@/types/Post";
import PostFeed from "@/types/PostFeed";
import PostCard from "@/components/card/PostCard";
import getAPI from "@/api/getAPI";
import { PubAPI } from "@/api/getAPI";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function UserFeed() {

  const [handle, setHandle] = useState("@ducdat0507@mastodon.gamedev.place");
  const [[localName, domain], setName] = useState(["", ""]);

  const [data, setData] = useState({} as Account);
  const [timelinePosts, setTimelinePosts] = useState<{counter: number, value: Post[]}>({counter: 0, value: []});
  const timelineFeed = useRef<PostFeed>({});

  const safeHeight = useSafeAreaInsets().top;
  console.log(safeHeight);
  const bannerHeight = 240 + safeHeight;

  useEffect(() => {
    setName(handle.replace(/^@/, "").split("@") as [string, string]);
  }, [handle]);

  useEffect(() => {
    let api: PubAPI;
    if (localName && domain) getAPI(domain).then(x => {
      api = x;
      console.log(api);
      return api.getAccount(localName + "@" + domain);
    }).then(x => {
      setData(x);
      console.log(api);
      return api.getPostFeed(x.feeds?.accountTimeline?.endpoint);
    }).then(x => {
      timelineFeed.current = (x);
      timelineFeed.current.onUpdate = updateTimelinePosts;
      return x.getNext();
    }).catch(e => console.error(e));
    if (localName && domain) getAPI(domain);
  }, [localName, domain]);


  const updateTimelinePosts = (posts: Post[]) => {
    setTimelinePosts({counter: timelinePosts.counter + 1, value: posts});
  }

  const styles = StyleSheet.create({
    header: {
      position: "relative",
      height: 48,
    },
    headerBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderColor: useThemeColor("border-1"),
      borderBottomWidth: 1,
    },
    scrollView: {
      gap: 24,
      paddingBottom: 0,
    },
    profileBackgroundHolder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: bannerHeight,
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
      width: 132,
      height: 132,
      borderRadius: 68,
      borderColor: useThemeColor("background-1"),
      borderWidth: 8,
      overflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: 1e9,
      backgroundColor: useThemeColor("color-1"),
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
  const border1 = useThemeColor("border-1");

  const gradientRef = useRef<LinearGradient>(null);

  const scrollRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const animatedProps = {
    profileBackground: useAnimatedProps(() => {
      let headerHeight = (48 + safeHeight) / bannerHeight;
      let prog = Math.min(Math.max(scrollOffset.value / 500, 0), 1);
      return {
        colors: [
          background1 + Math.floor(prog * 224).toString(16).padStart(2, '0'), 
          background1 + Math.floor(255 - prog * 32).toString(16).padStart(2, '0'),
          background1, background1
        ],
        locations: [0, 1 - prog * (1 - headerHeight), 1 - prog * prog * (1 - headerHeight), 1],
      };
    }),
    scrollView: useAnimatedProps(() => {
      return {
        scrollEventThrottle: scrollOffset.value < 500 ? 33 : 200,
      };
    }),
  };
  const animatedStyles = {
    headerBackground: useAnimatedStyle(() => {
      return {
        opacity: Math.min(Math.max(scrollOffset.value / 10 - 9, 0), 1)
      };
    }),
    profileBackground: useAnimatedStyle(() => {
      let headerHeight = (48 + safeHeight) / bannerHeight;
      let prog = Math.min(Math.max(scrollOffset.value / 500, 0), 1);
      return {
        top: -bannerHeight / 2 * ((1 - headerHeight) * prog * prog),
        bottom: bannerHeight / 2 * ((1 - headerHeight) * prog * prog),
      };
    }),
  };

  return (
    <>
      <View style={styles.profileBackgroundHolder}>
        <Animated.Image style={[styles.profileBackground, animatedStyles.profileBackground]} source={{
          uri: data.profileBannerUrl
        }} />
        <AnimatedLinearGradient ref={gradientRef}
          colors={[background1 + "00", background1 + "80", background1 + "b0", background1]}
          locations={[0, 0, 1, 1]}
          animatedProps={animatedProps.profileBackground}
          style={styles.profileBackgroundOverlay}
        />
      </View>
      <Animated.View style={[styles.header]}>
        <Animated.View style={[styles.headerBackground, animatedStyles.headerBackground]}>
        </Animated.View>
      </Animated.View>

      <Animated.FlatList ref={scrollRef} style={styles.scrollView} scrollEventThrottle={33}
        animatedProps={animatedProps.scrollView}
        data={timelinePosts.value}
        keyExtractor={(item, index) => index}
        windowSize={10}
        initialNumToRender={1}

        ListHeaderComponent={<>
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
        </>}

        renderItem={({item}) => <PostCard post={item} />}

        ListFooterComponent={<>
          <TextBody style={{color: color3, alignSelf: "center"}}>End of feed</TextBody>
          <View style={{height: 60}} />
        </>}
        />
    </>
  );
}
