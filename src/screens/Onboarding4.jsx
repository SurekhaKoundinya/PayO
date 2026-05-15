import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
 SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {

  // LOGO
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-30)).current;

  // IMAGE
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.85)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;

  // TITLE
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;

  // DESCRIPTION
  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(20)).current;

  // BUTTONS
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(25)).current;

  useEffect(() => {

    Animated.sequence([

      // LOGO
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),

      // IMAGE
      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 5,
          tension: 130,
          useNativeDriver: true,
        }),
      ]),

      // TITLE
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),

      // DESCRIPTION
      Animated.parallel([
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(descTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),

      // BUTTONS
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(buttonTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }),
      ]),

    ]).start(() => {
      startFloatingAnimation();
    });

  }, []);

  // FAST FLOATING IMAGE
  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageFloat, {
          toValue: -8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(imageFloat, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.content}>

        {/* LOGO */}
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

        {/* MAIN IMAGE */}
        <Animated.Image
          source={require('../../assets/images/onboarding4.png')}
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

        {/* TITLE */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          Welcome!
        </Animated.Text>

        {/* DESCRIPTION */}
        <Animated.Text
          style={[
            styles.description,
            {
              opacity: descOpacity,
              transform: [{ translateY: descTranslateY }],
            },
          ]}
        >
          Scan. Pay. Earn Payo.
        </Animated.Text>

      </View>

      {/* BUTTONS */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslateY }],
          },
        ]}
      >

        {/* REGISTER */}
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RegisterMobile')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* LOGIN */}
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
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
    paddingTop: 40,
  },

  logo: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },

  mainImage: {
    width: 285,
    height: 285,
    resizeMode: 'contain',
    marginBottom: 45,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B4DFF',
    marginBottom: 12,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
  },

  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },

  registerBtn: {
    backgroundColor: '#6200EE',
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  registerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  loginBtn: {
    height: 40,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#7B4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#6200EE',
    fontSize: 18,
    fontWeight: '600',
  },
});