import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";

export const FadeIn = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: props.delay,
      duration: props.duration,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...props.style,
        flex: 1,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};
