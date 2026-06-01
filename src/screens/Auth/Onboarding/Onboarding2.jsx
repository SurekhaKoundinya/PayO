import React, {
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import styles from './Onboarding2Styles';

const { width, height } =
  Dimensions.get('window');

export default function Onboarding2({
  navigation,
}) {

  const insets =
    useSafeAreaInsets();

  const logoOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const logoTranslateY =
    useRef(
      new Animated.Value(-40),
    ).current;

  const imageOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const imageScale =
    useRef(
      new Animated.Value(0.8),
    ).current;

  const imageFloat =
    useRef(
      new Animated.Value(0),
    ).current;

  const titleOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const titleTranslateY =
    useRef(
      new Animated.Value(30),
    ).current;

  const descOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const descTranslateY =
    useRef(
      new Animated.Value(30),
    ).current;

  const footerOpacity =
    useRef(
      new Animated.Value(0),
    ).current;

  const coins = useRef(
    Array.from({
      length:
        width > 400
          ? 12
          : 8,
    }).map(() => ({
      translateY:
        new Animated.Value(
          -height,
        ),

      translateX:
        new Animated.Value(
          Math.random() *
            width,
        ),

      size:
        Math.random() * 20 +
        18,

      opacity:
        Math.random() * 0.3 +
        0.1,

      duration:
        Math.random() * 2000 +
        2500,
    })),
  ).current;
/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    startCoinRain();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          logoOpacity,
          {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          },
        ),

        Animated.spring(
          logoTranslateY,
          {
            toValue: 0,
            friction: 7,
            tension: 90,
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.parallel([
        Animated.timing(
          imageOpacity,
          {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          },
        ),

        Animated.spring(
          imageScale,
          {
            toValue: 1,
            friction: 6,
            tension: 100,
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.parallel([
        Animated.timing(
          titleOpacity,
          {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          },
        ),

        Animated.spring(
          titleTranslateY,
          {
            toValue: 0,
            friction: 7,
            tension: 90,
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.parallel([
        Animated.timing(
          descOpacity,
          {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          },
        ),

        Animated.spring(
          descTranslateY,
          {
            toValue: 0,
            friction: 7,
            tension: 90,
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.timing(
        footerOpacity,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        },
      ),
    ]).start(() => {
      startFloatingAnimation();
    });

  }, []);

  const startFloatingAnimation =
    () => {

      Animated.loop(
        Animated.sequence([
          Animated.timing(
            imageFloat,
            {
              toValue: -10,
              duration: 800,
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            imageFloat,
            {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            },
          ),
        ]),
      ).start();
    };

  const startCoinRain =
    () => {

      coins.forEach(coin => {

        Animated.loop(
          Animated.sequence([
            Animated.timing(
              coin.translateY,
              {
                toValue:
                  height + 100,
                duration:
                  coin.duration,
                useNativeDriver: true,
              },
            ),

            Animated.timing(
              coin.translateY,
              {
                toValue: -100,
                duration: 0,
                useNativeDriver: true,
              },
            ),
          ]),
        ).start();
      });
    };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>

      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      {coins.map(
        (coin, index) => (

          <Animated.Image
            key={index}
            source={require('../../../../assets/images/coin.png')}
            style={{
              position:
                'absolute',

              width:
                coin.size,

              height:
                coin.size,

              opacity:
                coin.opacity,

              transform: [
                {
                  translateX:
                    coin.translateX,
                },

                {
                  translateY:
                    coin.translateY,
                },
              ],
            }}
          />
        ),
      )}

      <View
        style={[
          styles.content,
          {
            paddingTop:
              insets.top + 10,
          },
        ]}>

        <Animated.Image
          source={require('../../../../assets/images/LogoContainer.png')}
          style={[
            styles.logo,
            {
              opacity:
                logoOpacity,

              transform: [
                {
                  translateY:
                    logoTranslateY,
                },
              ],
            },
          ]}
        />

        <Animated.Image
          source={require('../../../../assets/images/onboardingScreen2.png')}
          style={[
            styles.mainImage,
            {
              opacity:
                imageOpacity,

              transform: [
                {
                  scale:
                    imageScale,
                },

                {
                  translateY:
                    imageFloat,
                },
              ],
            },
          ]}
        />

        <Animated.Text
          style={[
            styles.title,
            {
              opacity:
                titleOpacity,

              transform: [
                {
                  translateY:
                    titleTranslateY,
                },
              ],
            },
          ]}>

          Instant QR{'\n'}
          Payments

        </Animated.Text>

        <Animated.Text
          style={[
            styles.description,
            {
              opacity:
                descOpacity,

              transform: [
                {
                  translateY:
                    descTranslateY,
                },
              ],
            },
          ]}>

          Scan a QR code
          to send tokens
          in seconds.
          {'\n'}
          Safe, secure,
          and lightning-fast
          {'\n'}
          wallet-to-wallet
          transfers.

        </Animated.Text>

      </View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity:
              footerOpacity,

            bottom:
              insets.bottom > 0
                ? insets.bottom +
                  12
                : 20,
          },
        ]}>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() =>
            navigation.navigate(
              'Onboarding3',
            )
          }
          activeOpacity={0.8}>

          <Text
            style={styles.skipText}>

            Skip

          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Onboarding3',
            )
          }
          activeOpacity={0.8}>

          <Image
            source={require('../../../../assets/images/half_load.png')}
            style={
              styles.nextImage
            }
          />

        </TouchableOpacity>

      </Animated.View>

    </SafeAreaView>
  );
}