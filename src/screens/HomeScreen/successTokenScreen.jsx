// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
// } from 'react-native';
// import styles from './successScreenStyling';

// export default function PaymentSuccess({ route, navigation }) {

//   // ✅ get amount from previous screen
//   const { amount } = route.params || {};

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // ✅ reset navigation (no back to payment screens)
//       navigation.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'Main',
//             state: {
//               routes: [{ name: 'Home' }],
//             },
//           },
//         ],
//       });
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* SUCCESS ICON */}
//       <View style={styles.iconContainer}>
//         <Text style={styles.check}>✓</Text>
//       </View>

//       {/* TEXT */}
//       <Text style={styles.title}>Payment Successful</Text>

//       {/* ✅ dynamic amount */}
//       <Text style={styles.subtitle}>
//         {amount} PAYO sent successfully
//       </Text>

//       {/* ✅ real time */}
//       <Text style={styles.subtitle}>
//         {new Date().toLocaleString()}
//       </Text>

//     </SafeAreaView>
//   );
// }

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
 
import LinearGradient from 'react-native-linear-gradient';
 
import styles from './successScreenStyling';
 
export default function PaymentSuccess({ route, navigation }) {
 
  const { amount } = route.params || {};
 
  // ANIMATIONS
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(30)).current;
 
  useEffect(() => {
 
    // SUCCESS POP ANIMATION
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
 
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
 
      Animated.timing(textAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
 
    // AUTO NAVIGATION
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: 'Home' }],
            },
          },
        ],
      });
    }, 3000);
 
    return () => clearTimeout(timer);
 
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
 
      <LinearGradient
        colors={['#6A11CB', '#2575FC', '#12D8FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
 
        {/* SUCCESS ICON */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.check}>✓</Text>
        </Animated.View>
 
        {/* TEXT */}
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ translateY: textAnim }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.title}>
            Payment Successful
          </Text>
 
          <Text style={styles.subtitle}>
            {amount} PAYO sent successfully
          </Text>
 
          <Text style={styles.time}>
            {new Date().toLocaleString()}
          </Text>
        </Animated.View>
 
      </LinearGradient>
 
    </SafeAreaView>
  );
}