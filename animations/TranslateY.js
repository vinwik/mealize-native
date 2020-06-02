import React, { useState, useEffect } from "react";
import { View, Animated } from "react-native";

export const TranslateY = (props) => {
  const [translateAnim, setTranslateAnim] = useState(
    new Animated.Value(props.start)
  );
  const [translateAnimY, setTranslateAnimY] = useState(
    new Animated.Value(props.end)
  );

  React.useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: props.end,
      delay: props.delay,
      duration: 350,
      useNativeDriver: true,
    }).start();

    if (props.shouldSlide === true)
      Animated.timing(translateAnimY, {
        toValue: props.start + 5,
        delay: props.delay,
        duration: 350,
      }).start(() => {
        props.setModalVisible(false);
        props.setShouldSlide(false);
      });
  }, [props.modalVisible, props.setModalVisible, props.shouldSlide]);

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [
          { translateY: !props.shouldSlide ? translateAnim : translateAnimY },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
};
