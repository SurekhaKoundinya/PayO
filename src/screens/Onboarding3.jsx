import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function Onboarding3({ navigation }) {
  const insets = useSafeAreaInsets();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-40)).current;

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;

  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(30)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  const coins = useRef(
    Array.from({ length: width > 400 ? 12 : 8 }).map(() => ({
      translateY: new Animated.Value(-height),
      translateX: new Animated.Value(Math.random() * width),
      size: Math.random() * moderateScale(20) + moderateScale(18),
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 2000 + 2500,
    }))
  ).current;

  useEffect(() => {
    startCoinRain();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 90,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 90,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(descTranslateY, {
          toValue: 0,
          friction: 7,
          tension: 90,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startFloatingAnimation();
    });
  }, []);

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageFloat, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(imageFloat, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startCoinRain = () => {
    coins.forEach((coin) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(coin.translateY, {
            toValue: height + 100,
            duration: coin.duration,
            useNativeDriver: true,
          }),
          Animated.timing(coin.translateY, {
            toValue: -100,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      {coins.map((coin, index) => (
        <Animated.Image
          key={index}
          source={require('../../assets/images/coin.png')}
          style={{
            position: 'absolute',
            width: coin.size,
            height: coin.size,
            opacity: coin.opacity,
            transform: [
              { translateX: coin.translateX },
              { translateY: coin.translateY },
            ],
          }}
        />
      ))}

      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + verticalScale(10),
          },
        ]}
      >
        <Animated.Image
          source={require('../../assets/images/LogoContainer.png')}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }],
            },
          ]}
        />

        <Animated.Image
          source={require('../../assets/images/onboardingScreen3.png')}
          style={[
            styles.mainImage,
            {
              opacity: imageOpacity,
              transform: [
                { scale: imageScale },
                { translateY: imageFloat },
              ],
            },
          ]}
        />

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          Earn with Every{'\n'}Referral
        </Animated.Text>

        <Animated.Text
          style={[
            styles.description,
            {
              opacity: descOpacity,
              transform: [{ translateY: descTranslateY }],
            },
          ]}
        >
          Invite friends and earn PAYO tokens
          {'\n'}
          when they join and transact. Grow
          {'\n'}
          your network, Grow your wallet.
        </Animated.Text>
      </View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: footerOpacity,
            paddingBottom:
              insets.bottom > 0
                ? insets.bottom + moderateScale(16)
                : moderateScale(20),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    zIndex: 2,
  },

  logo: {
    width: moderateScale(120),
    height: moderateScale(45),
    resizeMode: 'contain',
    marginBottom: verticalScale(30),
    marginTop: verticalScale(8),
  },

  mainImage: {
    width: width < 360 ? width * 0.60 : width * 0.68,
    height: width < 360 ? width * 0.60 : width * 0.68,
    resizeMode: 'contain',
    marginBottom: verticalScale(25),
  },

  title: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: '#7B4DFF',
    textAlign: 'center',
    lineHeight: moderateScale(38),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(10),
  },

  description: {
    fontSize: moderateScale(15),
    color: '#444',
    textAlign: 'center',
    lineHeight: moderateScale(26),
    paddingHorizontal: moderateScale(20),
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: moderateScale(30),
  },

  registerBtn: {
    backgroundColor: '#6200EE',
    height: verticalScale(50),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },

  loginBtn: {
    height: verticalScale(50),
    borderRadius: moderateScale(14),
    borderWidth: 1.5,
    borderColor: '#7B4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#6200EE',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
});