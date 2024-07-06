import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export default function HorizontalRule({
  style = {},
  ...rest
}: ViewProps) {

  return (
    <View style={[
      {
        borderColor: useThemeColor("border-1"),
        borderBottomWidth: 1,
      },
      style
    ]} {...rest} />
  );
}
