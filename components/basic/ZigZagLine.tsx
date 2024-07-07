import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { View, type ViewProps } from "react-native";
import { Defs, Path, Pattern, Rect, Svg } from "react-native-svg";

export default function ZigZagLine({
  baseStyle,
  style
}: any) {
  if (!style) style = {};
  const [width, setWidth] = useState(10);
  return (
    <View style={baseStyle}>
      <Svg height="10" width="100%" viewBox={"0 0 " + width + " 10"} onLayout={(e) => { setWidth(e.nativeEvent.layout.width) }}>
        <Defs>
          <Pattern
            id="zig-zag"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="10"
            height="10"
            viewBox="0 0 10 10">
            <Path d="M 0 1 L 5 9 L 10 1 L 15 9" stroke={style.color ?? useThemeColor("border-1")} fill="transparent" />
          </Pattern>
        </Defs>
        <Rect fill="url(#zig-zag)" x="0" y="0" width="100%" height="10" />
      </Svg>
    </View>
  );
}
