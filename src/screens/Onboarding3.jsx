// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//  SafeAreaView,
//   StatusBar,
// } from 'react-native';

// export default function Onboarding3({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#F4F7F5" barStyle="dark-content" />

//       <View style={styles.content}>

//         {/* LOGO */}
//         <Image
//           source={require('../../assets/images/LogoContainer.png')}
//           style={styles.logo}
//         />

//         {/* MAIN IMAGE */}
//         <Image
//           source={require('../../assets/images/onboardingScreen3.png')}
//           style={styles.mainImage}
//         />

//         {/* TITLE */}
//         <Text style={styles.title}>
//           Earn with Every{'\n'}Referral
//         </Text>

//         {/* DESCRIPTION */}
//         <Text style={styles.description}>
//           Invite friends and earn PAYO tokens
//           {'\n'}
//           when they join and transact. Grow
//           {'\n'}
//           your network, Grow your wallet.
//         </Text>

//       </View>

//       {/* FOOTER */}
//       <View style={styles.footer}>

//         {/* SKIP BUTTON */}
//         <TouchableOpacity
//           style={styles.skipBtn}
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>

//         {/* NEXT BUTTON */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={require('../../assets/images/full_load.png')}
//             style={styles.nextImage}
//           />
//         </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F7F5', // figma background
//   },

//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 45,
//   },

//   logo: {
//     width: 145,
//     height: 45,
//     resizeMode: 'contain',
//     marginBottom: 55,
//   },

//   mainImage: {
//     width: 320,
//     height: 300,
//     resizeMode: 'contain',
//     marginBottom: 40,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#7B4DFF',
//     textAlign: 'center',
//     lineHeight: 42,
//     marginBottom: 24,
//   },

//   description: {
//     fontSize: 17,
//     color: '#444',
//     textAlign: 'center',
//     lineHeight: 32,
//     paddingHorizontal: 30,
//     fontWeight: '400',
//   },

//   footer: {
//     position: 'absolute',
//     bottom: 70,
//     left: 35,
//     right: 35,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   skipBtn: {
//     backgroundColor: '#C9F0FF',
//     paddingHorizontal: 22,
//     paddingVertical: 10,
//     borderRadius: 14,
//   },

//   skipText: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#000',
//   },

//   nextImage: {
//     width: 85,
//     height: 85,
//     resizeMode: 'contain',
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

export default function Onboarding3({ navigation }) {

  // LOGO
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-40)).current;

  // IMAGE
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageFloat = useRef(new Animated.Value(0)).current;

  // TITLE
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;

  // DESCRIPTION
  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(30)).current;

  // FOOTER
  const footerOpacity = useRef(new Animated.Value(0)).current;

  // COINS
  const coins = useRef(
    Array.from({ length: 10 }).map(() => ({
      translateY: new Animated.Value(-height),
      translateX: new Animated.Value(Math.random() * width),
      size: Math.random() * 35 + 25,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 2000 + 2500,
    }))
  ).current;

  useEffect(() => {

    // START COIN RAIN IMMEDIATELY
    startCoinRain();

    Animated.sequence([

      // LOGO
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

      // IMAGE
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

      // TITLE
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

      // DESCRIPTION
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

      // FOOTER
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

    ]).start(() => {
      startFloatingAnimation();
    });

  }, []);

  // FLOATING IMAGE
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

  // COIN RAIN
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* FALLING COINS */}
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
          Earn with Every{'\n'}Referral
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
          Invite friends and earn PAYO tokens
          {'\n'}
          when they join and transact. Grow
          {'\n'}
          your network, Grow your wallet.
        </Animated.Text>

      </View>

      {/* FOOTER */}
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: footerOpacity,
          },
        ]}
      >

        {/* SKIP BUTTON */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.navigate('Onboarding4')}
          activeOpacity={0.8}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* NEXT BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding4')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../assets/images/full_load.png')}
            style={styles.nextImage}
          />
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
    zIndex: 2,
  },

  logo: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },

  mainImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 35,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B4DFF',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 18,
  },

  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 25,
  },

  footer: {
    position: 'absolute',
    bottom: 80,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },

  skipBtn: {
    backgroundColor: '#C9F0FF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
  },

  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  nextImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   StatusBar,
//   Animated,
//   Dimensions,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// export default function Onboarding3({ navigation }) {

//   // LOGO
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const logoTranslateY = useRef(new Animated.Value(-40)).current;

//   // IMAGE
//   const imageOpacity = useRef(new Animated.Value(0)).current;
//   const imageScale = useRef(new Animated.Value(0.8)).current;
//   const imageFloat = useRef(new Animated.Value(0)).current;

//   // TITLE
//   const titleOpacity = useRef(new Animated.Value(0)).current;
//   const titleTranslateY = useRef(new Animated.Value(30)).current;

//   // DESCRIPTION
//   const descOpacity = useRef(new Animated.Value(0)).current;
//   const descTranslateY = useRef(new Animated.Value(30)).current;

//   // FOOTER
//   const footerOpacity = useRef(new Animated.Value(0)).current;

//   // COINS
//   const coins = useRef(
//     Array.from({ length: 10 }).map(() => ({
//       translateY: new Animated.Value(-height),
//       translateX: new Animated.Value(Math.random() * width),
//       size: Math.random() * 35 + 25,
//       opacity: Math.random() * 0.3 + 0.1,
//       duration: Math.random() * 4000 + 5000,
//     }))
//   ).current;

//   useEffect(() => {

//     Animated.sequence([

//       // LOGO
//       Animated.parallel([
//         Animated.timing(logoOpacity, {
//           toValue: 1,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//         Animated.spring(logoTranslateY, {
//           toValue: 0,
//           friction: 6,
//           useNativeDriver: true,
//         }),
//       ]),

//       // IMAGE
//       Animated.parallel([
//         Animated.timing(imageOpacity, {
//           toValue: 1,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//         Animated.spring(imageScale, {
//           toValue: 1,
//           friction: 5,
//           useNativeDriver: true,
//         }),
//       ]),

//       // TITLE
//       Animated.parallel([
//         Animated.timing(titleOpacity, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.spring(titleTranslateY, {
//           toValue: 0,
//           friction: 6,
//           useNativeDriver: true,
//         }),
//       ]),

//       // DESCRIPTION
//       Animated.parallel([
//         Animated.timing(descOpacity, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.spring(descTranslateY, {
//           toValue: 0,
//           friction: 6,
//           useNativeDriver: true,
//         }),
//       ]),

//       // FOOTER
//       Animated.timing(footerOpacity, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),

//     ]).start(() => {
//       startFloatingAnimation();
//       startCoinRain();
//     });

//   }, []);

//   // FLOATING IMAGE
//   const startFloatingAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(imageFloat, {
//           toValue: -10,
//           duration: 1800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(imageFloat, {
//           toValue: 0,
//           duration: 1800,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   // COIN RAIN
//   const startCoinRain = () => {
//     coins.forEach((coin) => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(coin.translateY, {
//             toValue: height + 100,
//             duration: coin.duration,
//             useNativeDriver: true,
//           }),
//           Animated.timing(coin.translateY, {
//             toValue: -100,
//             duration: 0,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* FALLING COINS */}
//       {coins.map((coin, index) => (
//         <Animated.Image
//           key={index}
//           source={require('../../assets/images/coin.png')}
//           style={{
//             position: 'absolute',
//             width: coin.size,
//             height: coin.size,
//             opacity: coin.opacity,
//             transform: [
//               { translateX: coin.translateX },
//               { translateY: coin.translateY },
//             ],
//           }}
//         />
//       ))}

//       <View style={styles.content}>

//         {/* LOGO */}
//         <Animated.Image
//           source={require('../../assets/images/LogoContainer.png')}
//           style={[
//             styles.logo,
//             {
//               opacity: logoOpacity,
//               transform: [{ translateY: logoTranslateY }],
//             },
//           ]}
//         />

//         {/* MAIN IMAGE */}
//         <Animated.Image
//           source={require('../../assets/images/onboardingScreen3.png')}
//           style={[
//             styles.mainImage,
//             {
//               opacity: imageOpacity,
//               transform: [
//                 { scale: imageScale },
//                 { translateY: imageFloat },
//               ],
//             },
//           ]}
//         />

//         {/* TITLE */}
//         <Animated.Text
//           style={[
//             styles.title,
//             {
//               opacity: titleOpacity,
//               transform: [{ translateY: titleTranslateY }],
//             },
//           ]}
//         >
//           Earn with Every{'\n'}Referral
//         </Animated.Text>

//         {/* DESCRIPTION */}
//         <Animated.Text
//           style={[
//             styles.description,
//             {
//               opacity: descOpacity,
//               transform: [{ translateY: descTranslateY }],
//             },
//           ]}
//         >
//           Invite friends and earn PAYO tokens
//           {'\n'}
//           when they join and transact. Grow
//           {'\n'}
//           your network, Grow your wallet.
//         </Animated.Text>

//       </View>

//       {/* FOOTER */}
//       <Animated.View
//         style={[
//           styles.footer,
//           {
//             opacity: footerOpacity,
//           },
//         ]}
//       >

//         {/* SKIP BUTTON */}
//         <TouchableOpacity
//           style={styles.skipBtn}
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>

//         {/* NEXT BUTTON */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Onboarding4')}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={require('../../assets/images/full_load.png')}
//             style={styles.nextImage}
//           />
//         </TouchableOpacity>

//       </Animated.View>
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
//     zIndex: 2,
//   },

//   logo: {
//     width: 110,
//     height: 40,
//     resizeMode: 'contain',
//     marginBottom: 40,
//   },

//   mainImage: {
//     width: 250,
//     height: 250,
//     resizeMode: 'contain',
//     marginBottom: 35,
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#7B4DFF',
//     textAlign: 'center',
//     lineHeight: 38,
//     marginBottom: 18,
//   },

//   description: {
//     fontSize: 16,
//     color: '#444',
//     textAlign: 'center',
//     lineHeight: 28,
//     paddingHorizontal: 25,
//   },

//   footer: {
//     position: 'absolute',
//     bottom: 80,
//     left: 50,
//     right: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     zIndex: 2,
//   },

//   skipBtn: {
//     backgroundColor: '#C9F0FF',
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 14,
//   },

//   skipText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },

//   nextImage: {
//     width: 80,
//     height: 80,
//     resizeMode: 'contain',
//   },
// });

