import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";

export const Translate = (props) => {
  const [translateAnim, setTranslateAnim] = useState(
    new Animated.Value(props.start)
  );

  React.useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: props.end,
      delay: props.delay,
      duration: props.duration,
      useNativeDriver: true,
    }).start();
  }, [props.dependency]);

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateX: translateAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};
