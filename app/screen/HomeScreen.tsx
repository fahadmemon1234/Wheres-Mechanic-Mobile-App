import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export default function Home() {
 
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    const startLoopAnimation = () => {
      Animated.loop(
        Animated.sequence([
         
          Animated.timing(animValue, {
            toValue: 1,
            duration: 2000, 
            easing: Easing.linear,
            useNativeDriver: true,
          }),

         
          Animated.timing(animValue, {
            toValue: 0, 
            duration: 10, 
            useNativeDriver: true,
          }),
          
        ]),
      ).start();
    };

    startLoopAnimation();

   
    return () => animValue.setValue(0);
  }, [animValue]);

  
  const opacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });
  
  const translateY = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -50, 0],
  });

  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={{
            ...styles.textStyle,
            opacity: opacity,
            transform: [
              { translateY: translateY },
            ],
          }}
        >
          Fahad Memon
        </Animated.Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textStyle: {
    fontSize: 50,
    color: 'white',
  }
});