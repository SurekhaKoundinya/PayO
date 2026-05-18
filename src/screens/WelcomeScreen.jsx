// // import React, { useEffect } from 'react';
// // import { Image } from 'react-native';
// // import { View, Text, StyleSheet } from 'react-native';

// // export default function WelcomeScreen({ navigation }) {

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       navigation.replace('Onboarding1'); // 👈 auto navigation
// //     }, 3000); // 3 seconds

// //     return () => clearTimeout(timer);
// //   }, [navigation]);

// //   return (
// //        <View style={styles.container}>
// //       <Image
// //         source={require('../../assets/images/Welcome.png')}
// //         style={styles.image}
// //       />
// //     </View>

// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   text: {
// //     fontSize: 36,
// //     color: '#4E00C2',
// //     fontWeight: '700',
// //     letterSpacing: 2,
// //     fontFamily: 'Limelight',
// //   },
// // });


// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function WelcomeScreen({ navigation }) {

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Onboarding1'); // 👈 auto navigation
//     }, 3000); // 3 seconds

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EAEAEA',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   text: {
//     fontSize: 36,
//     color: '#5A00D1',
//     fontWeight: '700',
//     letterSpacing: 2,
//     fontFamily: 'Limelight',
//   },
// });


import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
 
import LinearGradient from 'react-native-linear-gradient';
 
const { width, height } = Dimensions.get('window');
 
export default function WelcomeScreen({ navigation }) {
 
  // LETTER ANIMATIONS
  const wAnim = useRef(new Animated.Value(0)).current;
  const eAnim = useRef(new Animated.Value(0)).current;
  const lAnim = useRef(new Animated.Value(0)).current;
  const cAnim = useRef(new Animated.Value(0)).current;
  const oAnim = useRef(new Animated.Value(0)).current;
  const mAnim = useRef(new Animated.Value(0)).current;
  const e2Anim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
 
    const animateLetter = (anim, delay) => {
      Animated.sequence([
        Animated.delay(delay),
 
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    };
 
    animateLetter(wAnim, 100);
    animateLetter(eAnim, 300);
    animateLetter(lAnim, 500);
    animateLetter(cAnim, 700);
    animateLetter(oAnim, 900);
    animateLetter(mAnim, 1100);
    animateLetter(e2Anim, 1300);
 
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 3500);
 
    return () => clearTimeout(timer);
 
  }, [navigation]);
 
  const animatedStyle = (anim) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        }),
      },
    ],
  });
 
  return (
    <>
      <StatusBar
        backgroundColor="#7B2FF7"
        barStyle="light-content"
      />
 
      <View style={styles.container}>
 
        <LinearGradient
          colors={['#7B2FF7', '#22B7F2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBox}
        >
 
          <View style={styles.textRow}>
 
            <Animated.Text
              style={[styles.text, animatedStyle(wAnim)]}
            >
              W
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(eAnim)]}
            >
              e
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(lAnim)]}
            >
              l
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(cAnim)]}
            >
              c
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(oAnim)]}
            >
              o
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(mAnim)]}
            >
              m
            </Animated.Text>
 
            <Animated.Text
              style={[styles.text, animatedStyle(e2Anim)]}
            >
              e
            </Animated.Text>
 
          </View>
 
        </LinearGradient>
 
      </View>
    </>
  );
}
 
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
 
  gradientBox: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
 
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
 
  text: {
    color: '#FFFFFF',
    fontSize: width * 0.12,
    fontWeight: '700',
    letterSpacing: 1,
  },
 
});
 
