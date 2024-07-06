import { useWindowDimensions } from "react-native";
import UserFeed from "./user/UserFeed";
import RenderHtml from "react-native-render-html";
import { useThemeColor } from "@/hooks/useThemeColor";

export type HTMLBlockProps = {
  style?: object,
  componentStyle?: object,
  content: string;
};

export default function HTMLInline({ style, componentStyle, content }: HTMLBlockProps) {
  if (!style) style = {};
  const { width } = useWindowDimensions();

  const tagsStyles = {
    body: {
      whiteSpace: "normal",
      color: style.color ?? useThemeColor("color-1"),
      textAlign: style.textAlign ?? "left",
      fontSize: 16,
    },
    a: {
      color: useThemeColor("color-2"),
      textDecorationColor: useThemeColor("color-2"),
    },
    div: {
      display: "inline",
    },
    p: {
      display: "inline",
      margin: 0,
    },
  };

  return (
    <RenderHtml
      source={{ html: content }}
      baseStyle={componentStyle}
      tagsStyles={tagsStyles}
      contentWidth={width}
    />
  );
}
