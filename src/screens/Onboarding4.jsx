

// import React from 'react';
// import {
//   View,
//   Text,
//  StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// export default function WelcomeScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       <View style={styles.content}>

//         {/* LOGO */}
//         <Image
//           source={require('../../assets/images/LogoContainer.png')}
//           style={styles.logo}
//         />

//         {/* MAIN IMAGE */}
//         <Image
//           source={require('../../assets/images/onboarding4.png')}
//           style={styles.mainImage}
//         />

//         {/* TITLE */}
//         <Text style={styles.title}>Welcome!</Text>

//         {/* DESCRIPTION */}
//         <Text style={styles.description}>
//           Scan. Pay. Earn Payo.
//         </Text>

//       </View>

//       {/* BUTTONS */}
//       <View style={styles.buttonContainer}>

//         {/* REGISTER */}
//         <TouchableOpacity
//           style={styles.registerBtn}
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('RegisterMobile')}
//         >
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>

//         {/* LOGIN */}
//         <TouchableOpacity
//           style={styles.loginBtn}
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },

//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 40,
//   },

//   /* LOGO */
//   logo: {
//     width: 110,
//     height: 40,
//     resizeMode: 'contain',
//     marginBottom: 40,
//   },

//   /* MAIN IMAGE */
//   mainImage: {
//     width: 285,
//     height: 285,
//     resizeMode: 'contain',
//     marginBottom: 45,
//   },

//   /* TITLE */
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#7B4DFF',
//     marginBottom: 12,
//     textAlign: 'center',
//   },

//   /* DESCRIPTION */
//   description: {
//     fontSize: 16,
//     color: '#444',
//     textAlign: 'center',
//     lineHeight: 26,
//   },

//   /* BUTTON CONTAINER */
//   buttonContainer: {
//     paddingHorizontal: 40,
//     paddingBottom: 50,
//   },

//   /* REGISTER BUTTON */
//   registerBtn: {
//     backgroundColor: '#6200EE',
//     height: 40,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 18,
//   },

//   registerText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   /* LOGIN BUTTON */
//   loginBtn: {
//     height: 40,
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: '#7B4DFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   loginText: {
//     color: '#6200EE',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

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
  Dimensions,
} from 'react-native';
 
const { width, height } = Dimensions.get('window');
 
export default function Onboarding4({ navigation }) {
  const title = "Welcome!";
  const letters = title.split('');
 
  const logoY = useRef(new Animated.Value(-80)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
 
  const imageScale = useRef(new Animated.Value(0.3)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;
  const imageRotate = useRef(new Animated.Value(-15)).current;
  const imagePulse = useRef(new Animated.Value(1)).current;
 
  const descX = useRef(new Animated.Value(80)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
 
  const registerX = useRef(new Animated.Value(-120)).current;
  const registerOpacity = useRef(new Animated.Value(0)).current;
 
  const loginX = useRef(new Animated.Value(120)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;
 
  const letterAnimations = useRef(
    letters.map(() => ({
      translateY: new Animated.Value(-60),
      opacity: new Animated.Value(0),
    }))
  ).current;
 
  // const rainCoins = useRef(
  //   Array.from({ length: 10 }).map(() => ({
  //     translateY: new Animated.Value(-height),
  //     translateX: new Animated.Value(Math.random() * width),
  //     opacity: Math.random() * 0.35 + 0.12,
  //     size: Math.random() * 70 + 80,
  //     duration: Math.random() * 5000+4000,
  //   }))
  // ).current;
    const rainCoins = useRef(
      Array.from({ length: 10 }).map(() => ({
        translateY: new Animated.Value(-height),
        translateX: new Animated.Value(Math.random() * width),
        size: Math.random() * 35 + 25,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 2000 + 2500,
      }))
    ).current;
 
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
 
      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(imageRotate, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
 
      Animated.stagger(
        70,
        letterAnimations.map(anim =>
          Animated.parallel([
            Animated.spring(anim.translateY, {
              toValue: 0,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }),
          ])
        )
      ),
 
      Animated.parallel([
        Animated.timing(descX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
 
      Animated.parallel([
        Animated.timing(registerX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(registerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
 
      Animated.parallel([
        Animated.timing(loginX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loginOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      startImageLoop();
      startCoinRain();
    });
  }, []);
 
  const startImageLoop = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(imageFloat, {
            toValue: -10,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(imageFloat, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(imagePulse, {
            toValue: 1.04,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(imagePulse, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };
 
  const startCoinRain = () => {
    rainCoins.forEach((coin) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4F7F5" barStyle="dark-content" />
 
      {/* COIN RAIN BACKGROUND */}
      {rainCoins.map((coin, index) => (
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
 
      <View style={styles.content}>
        {/* LOGO */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ translateY: logoY }],
          }}
        >
          <Image
            source={require('../../assets/images/LogoContainer.png')}
            style={styles.logo}
          />
        </Animated.View>
 
        {/* MAIN IMAGE */}
        <Animated.View
          style={{
            opacity: imageOpacity,
            transform: [
              { scale: imageScale },
              { scale: imagePulse },
              { translateY: imageFloat },
              {
                rotate: imageRotate.interpolate({
                  inputRange: [-15, 0],
                  outputRange: ['-15deg', '0deg'],
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../assets/images/onboarding4.png')}
            style={styles.mainImage}
          />
        </Animated.View>
 
        {/* TITLE */}
        <View style={styles.titleContainer}>
          {letters.map((letter, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.title,
                {
                  opacity: letterAnimations[index].opacity,
                  transform: [
                    { translateY: letterAnimations[index].translateY },
                  ],
                },
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
 
        {/* DESCRIPTION */}
        <Animated.Text
          style={[
            styles.description,
            {
              opacity: descOpacity,
              transform: [{ translateX: descX }],
            },
          ]}
        >
          Scan. Pay. Earn Payo.
        </Animated.Text>
      </View>
 
      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <Animated.View
          style={{
            opacity: registerOpacity,
            transform: [{ translateX: registerX }],
          }}
        >
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('RegisterMobile')}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
 
        <Animated.View
          style={{
            opacity: loginOpacity,
            transform: [{ translateX: loginX }],
          }}
        >
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    paddingHorizontal: width * 0.06,
  },
 
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
 
  logo: {
    width: width * 0.35,
    height: height * 0.06,
    resizeMode: 'contain',
    marginBottom: height * 0.04,
  },
 
  mainImage: {
    width: width * 0.78,
    height: width * 0.78,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
 
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
 
  title: {
    fontSize: width < 360 ? 28 : 34,
    fontWeight: '700',
    color: '#7B4DFF',
  },
 
  description: {
    fontSize: width < 360 ? 16 : 20,
    color: '#444',
    textAlign: 'center',
    fontWeight: '400',
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
 