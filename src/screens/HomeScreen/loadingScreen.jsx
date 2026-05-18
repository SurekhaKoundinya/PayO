import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import styles from './loadingScreenStyling';
import api from '../../api/axios';

export default function PaymentLoading({ route, navigation }) {

  const { amount, name, toAddress, pin } = route.params || {};

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    startAnimation();

    const timer = setTimeout(() => {
      processPayment();
    }, 800);

    return () => clearTimeout(timer);

  }, []);

  const startAnimation = () => {

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: -8,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 8,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const processPayment = async () => {

    try {

      await api.post('/api/wallet/transfer', {
        amount,
        toAddress,
        pin,
      });

      navigation.replace('successfullPayment', {
        amount,
        name,
      });

    } catch (err) {

      alert(err?.response?.data?.message || "Payment Failed");

      navigation.goBack();
    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <LinearGradient
        colors={['#6A11CB', '#2575FC', '#12D8FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >

        {/* DOT LOADER */}
        <View style={styles.loaderRow}>

          <Animated.View
            style={[
              styles.dot,
              { transform: [{ translateX: dot1 }] }
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              { transform: [{ translateX: dot2 }] }
            ]}
          />

        </View>

        <Text style={styles.title}>
          Proceeding payment of {amount} PAYO
        </Text>

        <Text style={styles.subtitle}>
          {new Date().toLocaleString()}
        </Text>

      </LinearGradient>

    </SafeAreaView>
  );
}