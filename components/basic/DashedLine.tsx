import { useThemeColor } from "@/hooks/useThemeColor";
import { View, type ViewProps } from "react-native";

export default function DashedLine({
  style = {},
  ...rest
}: ViewProps) {

  return (
    <View style={[
      {
        borderColor: useThemeColor("border-1"),
        borderWidth: 0.6,
        borderStyle: "dashed",
        borderRadius: 1.2,
      },
      style
    ]} {...rest}>

    </View>
  );
}
