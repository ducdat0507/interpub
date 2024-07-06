import { useWindowDimensions } from "react-native";
import UserFeed from "./user/UserFeed";
import RenderHtml from "react-native-render-html";
import { useThemeColor } from "@/hooks/useThemeColor";

export type HTMLBlockProps = {
  content: string;
};

export default function HTMLBlock({ content }: HTMLBlockProps) {
  const { width } = useWindowDimensions();

  const tagsStyles = {
    body: {
      whiteSpace: "normal",
      color: useThemeColor("color-1"),
      fontSize: 16,
      marginBottom: -8,
    },
    a: {
      color: useThemeColor("color-2"),
      textDecorationColor: useThemeColor("color-2"),
    },
    p: {
      marginTop: 0,
      marginBottom: 8,
    },
  };

  return (
    <RenderHtml
      source={{ html: content }}
      tagsStyles={tagsStyles}
      contentWidth={width}
    />
  );
}
