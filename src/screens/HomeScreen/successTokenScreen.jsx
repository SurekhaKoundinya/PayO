import React, { useEffect, useRef } from 'react';
import {
  Text,
  Animated,
  Easing,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import styles from './successScreenStyling';

export default function PaymentSuccess({
  route,
  navigation,
}) {
  const { amount } = route.params || {};

  const scaleAnim = useRef(
    new Animated.Value(0),
  ).current;

  const opacityAnim = useRef(
    new Animated.Value(0),
  ).current;

  const textAnim = useRef(
    new Animated.Value(30),
  ).current;

  useEffect(() => {
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
        easing: Easing.out(
          Easing.ease,
        ),
        useNativeDriver: true,
      }),

      Animated.timing(textAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(
          Easing.ease,
        ),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {
                  name: 'Home',
                },
              ],
            },
          },
        ],
      });
    }, 3000);

    return () =>
      clearTimeout(timer);
  }, []);
 
  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <LinearGradient
        colors={[
          '#6A11CB',
          '#2575FC',
          '#12D8FA',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                {
                  scale: scaleAnim,
                },
              ],
              opacity:
                opacityAnim,
            },
          ]}>
          <Text style={styles.check}>
            ✓
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.textWrapper,
            {
              opacity:
                opacityAnim,
              transform: [
                {
                  translateY:
                    textAnim,
                },
              ],
            },
          ]}>
          <Text style={styles.title}>
            Payment Successful
          </Text>

          <Text style={styles.subtitle}>
            {amount} PAYO sent
            successfully
          </Text>

          <Text
            style={styles.time}
            numberOfLines={2}>
            {new Date().toLocaleString()}
          </Text>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}