import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export default function TextMono({
  style = {},
  ...rest
}: TextProps) {

  return (
    <Text style={[
      {
        fontSize: 14,
        color: useThemeColor("color-1"),
        fontFamily: "Meslo",
      },
      style
    ]} {...rest} />
  );
}
