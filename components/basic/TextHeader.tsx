import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, type TextProps } from "react-native";

export default function TextHeader({
  style = {},
  ...rest
}: TextProps) {

  return (
    <Text style={[
      {
        fontSize: 32,
        fontWeight: '700',
        color: useThemeColor("color-1"),
      },
      style
    ]} {...rest} />
  );
}
