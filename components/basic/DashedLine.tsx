import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { View, type ViewProps } from "react-native";
import Svg, { Defs, Pattern, Path, Rect } from "react-native-svg";

export default function ZigZagLine({
  baseStyle,
  style
}: any) {
  if (!style) style = {};
  const [width, setWidth] = useState(1000);
  return (
    <View style={baseStyle}>
      <Svg height="1" width="100%" viewBox={"0 0 " + width + " 1"} onLayout={(e) => { setWidth(e.nativeEvent.layout.width) }}>
        <Defs>
          <Pattern
            id="dashed"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="10"
            height="1"
            viewBox="0 0 10 1">
            <Path d="M 0 0.5 L 5 0.5" stroke={style.color ?? useThemeColor("border-1")} fill="transparent" />
          </Pattern>
        </Defs>
        <Rect fill="url(#dashed)" x="0" y="0" width="100%" height="1" />
      </Svg>
    </View>
  );
}
