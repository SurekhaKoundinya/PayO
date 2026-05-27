import React, { useEffect, useRef } from 'react';

import {
  Animated,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function PayoLogo() {

  const translateY = useRef(
    new Animated.Value(300),
  ).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <View style={styles.mainContainer}>

      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateY },
            ],
          },
        ]}>

        {/* Center Content */}
        <View style={styles.centerContent}>

          {/* Circle */}
          <View style={styles.circle}>
            <Text style={styles.text}>
              PAYO
            </Text>
          </View>

          {/* Line */}
          <View style={styles.line} />

          {/* Dot */}
          <View style={styles.dot} />

        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#5A00D1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerContent: {
    alignItems: 'center',
  },

  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#5A00D1',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },

  line: {
    width: 2,
    height: height / 2.5,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginTop: 6,
  },

});