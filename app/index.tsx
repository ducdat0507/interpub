import TextBody from "@/components/basic/TextBody";
import Feed from "@/components/feed/Feed";
import BottomBar from "@/components/shell/BottomBar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      color: useThemeColor("color-1"),
      backgroundColor: useThemeColor("background-1"),
    },
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <TextBody>
          <Link href="/user/@yhvr@wetdry.world">
            <Text>yhvr</Text>
          </Link>
          <Link href="/user/@chuckya@wetdry.world">
            <Text> chuckya</Text>
          </Link>
        </TextBody>
      </View>
    </SafeAreaView>
  );
}
