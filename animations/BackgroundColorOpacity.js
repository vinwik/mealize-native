import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";

export const BackgroundColorOpacity = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.dependency ? 0 : 1,
      delay: props.delay,
      duration: props.duration,
    }).start();
  }, [props.dependency]);

  return (
    <Animated.View
      style={{
        ...props.style,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: props.backgroundColor,
        opacity: fadeAnim,
        zIndex: 0,
      }}
    >
      {props.children}
    </Animated.View>
  );
};
