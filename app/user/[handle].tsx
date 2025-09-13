import Feed from "@/components/feed/Feed";
import UserFeed from "@/components/feed/user/UserFeed";
import BottomBar from "@/components/shell/BottomBar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserPage() {
  const { handle } = useLocalSearchParams();

  const styles = StyleSheet.create({
	mainContainer: {
	  flex: 1,
	  color: useThemeColor("color-1"),
	  backgroundColor: useThemeColor("background-1"),
	},
  });

  return (
	<SafeAreaView style={styles.mainContainer}>
	  <UserFeed handle={handle} />
	</SafeAreaView>
  );
}
