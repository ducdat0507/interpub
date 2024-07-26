import TextBody from "@/components/basic/TextBody";
import Feed from "@/components/feed/Feed";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Fontisto, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { relative } from "path";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      color: useThemeColor("color-1"),
      backgroundColor: useThemeColor("background-1"),
    },
    actionBar: {
      height: 48, 
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    postButton: {
      height: 96,
      flexShrink: 0,
      marginVertical: -24,
      borderRadius: 1e9,
      backgroundColor: useThemeColor("background-2"),
      borderColor: useThemeColor("border-1"), 
      borderWidth: 1, 
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    actionBarButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    currentProfile: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderColor: useThemeColor("border-1"), 
      borderWidth: 1, 
    },
    tabBar: {
      position: "relative",
      borderColor: useThemeColor("border-1"), 
      borderBottomWidth: 1, 
    },
    tabBarHolder: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
    },
    tab: {
      width: 60,
      position: "relative",
    },
    tabPrimary: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 60,
      height: 60,
      borderColor: useThemeColor("border-1"), 
      borderWidth: 1, 
      overflow: "hidden",
      backgroundColor: useThemeColor("background-1"), 
    },
    tabActiveIndicator: {
      position: "absolute",
      bottom: 8,
      left: 14,
      width: 32,
      height: 4,
      borderRadius: 2,
      backgroundColor: useThemeColor("color-1"),
    },
  });

  let color1 = useThemeColor("color-1");
  let background1 = useThemeColor("background-1");

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Feed />
      <View style={styles.tabBar}>
        <View style={styles.tabBarHolder}>
          <LinearGradient
            colors={[background1 + "00", background1]}
            style={{position: "absolute", top: 12, bottom: 0, left: 0, right: 0}}
          />
          <ScrollView horizontal={true} contentContainerStyle={{minWidth: "100%", justifyContent: "center", gap: 12}}>
            <Pressable style={styles.tab}>
              <View style={[styles.tabPrimary, { borderRadius: 1e9 }]}>
              </View>
            </Pressable>
            <Pressable style={styles.tab}>
              <View style={[styles.tabPrimary, { borderRadius: 1e9 }]}>
              </View>
              <View style={styles.tabActiveIndicator} />
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View style={styles.actionBar}>
        <Pressable style={styles.actionBarButton}>
          <Ionicons name="arrow-back-outline" size={24} color={color1} />
        </Pressable>
        <Pressable style={styles.actionBarButton}>
          <Ionicons name="home-outline" size={24} color={color1} />
        </Pressable>
        <Pressable style={styles.postButton}>
          <Ionicons name="pencil-outline" size={24} color={color1} />
        </Pressable>
        <Pressable style={styles.actionBarButton}>
          <Ionicons name="notifications-outline" size={24} color={color1} />
        </Pressable>
        <Pressable style={styles.actionBarButton}>
          <View style={styles.currentProfile} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}