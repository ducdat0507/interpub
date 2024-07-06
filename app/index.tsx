import Feed from "@/components/feed/Feed";
import { useThemeColor } from "@/hooks/useThemeColor";
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
      <Feed />
    </SafeAreaView>
  );
}