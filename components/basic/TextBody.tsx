import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export default function TextBody({
  style = {},
  ...rest
}: TextProps) {

  return (
    <Text style={[
      {
        fontSize: 16,
        color: useThemeColor("color-1"),
      },
      style
    ]} {...rest} />
  );
}
