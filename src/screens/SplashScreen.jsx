// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   Animated,
//   Dimensions,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// export default function SplashScreen({ navigation }) {

//   const [showLogo, setShowLogo] = useState(false);
//   const slideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {

//     // 1️⃣ Violet screen for 2 seconds
//     const violetTimer = setTimeout(() => {
//       setShowLogo(true);

//       // start logo animation
//       Animated.timing(slideAnim, {
//         toValue: 140,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();

//     }, 2000);

//     // 2️⃣ After total 5 seconds go to Welcome
//     const navTimer = setTimeout(() => {
//       navigation.replace('Welcome');
//     }, 5000);

//     return () => {
//       clearTimeout(violetTimer);
//       clearTimeout(navTimer);
//     };

//   }, []);

//   return (
//     <View style={styles.container}>

//       {/* Violet Screen */}
//       {!showLogo && (
//         <View style={styles.violetScreen} />
//       )}

//       {/* Logo Screen */}
//       {showLogo && (
//         <Animated.Image
//           source={require('../../assets/images/payoLogo.png')}
//           style={[
//             styles.logoImage,
//             {
//               transform: [{ translateY: slideAnim }],
//             },
//           ]}
//         />
//       )}

//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#6C2BD9',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   violetScreen: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#6C2BD9',
//   },

//   logoImage: {
//     width: width * 1.1,
//     height: width * 1.2,
//     resizeMode: 'contain',
//   },

// });


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Easing,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const { width } = Dimensions.get('window');

// const SplashScreen = ({ navigation }) => {
//   const [screenStep, setScreenStep] = useState(1);

//   const dotFade = useRef(new Animated.Value(0)).current;
//   const expandAnim = useRef(new Animated.Value(1)).current;

//   const logoAnim = useRef(new Animated.Value(0)).current;

//   // FINAL SCREEN ANIMATION
//   const finalLogoAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const timers = [];

//     // SCREEN 1
//     Animated.timing(dotFade, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();

//     // SCREEN 2
//     timers.push(
//       setTimeout(() => {
//         setScreenStep(2);

//         Animated.timing(expandAnim, {
//           toValue: 80,
//           duration: 1600,
//           easing: Easing.out(Easing.exp),
//           useNativeDriver: true,
//         }).start(() => {

//           setScreenStep(3);

//           Animated.timing(logoAnim, {
//             toValue: 1,
//             duration: 1200,
//             useNativeDriver: true,
//           }).start();

//         });

//       }, 1200),
//     );

//     // SCREEN 4
//     timers.push(
//       setTimeout(() => {

//         setScreenStep(4);

//         Animated.timing(finalLogoAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }).start();

//         // NAVIGATE
//         setTimeout(() => {
//           navigation.replace('Onboarding1');
//         }, 2000);

//       }, 5000),
//     );

//     return () => timers.forEach(clearTimeout);
//   }, []);

//   // SCREEN 1
//   if (screenStep === 1) {
//     return (
//       <View style={styles.whiteContainer}>
//         <StatusBar
//           backgroundColor="#F8F8F8"
//           barStyle="dark-content"
//         />

//         <Animated.View
//           style={[
//             styles.smallDot,
//             {
//               opacity: dotFade,
//             },
//           ]}
//         />
//       </View>
//     );
//   }

//   // SCREEN 2
//   if (screenStep === 2) {
//     return (
//       <View style={styles.whiteContainer}>
//         <StatusBar
//           backgroundColor="#F8F8F8"
//           barStyle="dark-content"
//         />

//         <Animated.View
//           style={[
//             styles.expandCircleWrapper,
//             {
//               transform: [{ scale: expandAnim }],
//             },
//           ]}>
//           <LinearGradient
//             colors={['#8427F7', '#0DB6E8']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.expandCircle}
//           />
//         </Animated.View>
//       </View>
//     );
//   }

//   // SCREEN 3
//   if (screenStep === 3) {
//     return (
//       <LinearGradient
//         colors={['#8427F7', '#0DB6E8']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradientContainer}>

//         <StatusBar
//           backgroundColor="#8427F7"
//           barStyle="light-content"
//         />

//         <Animated.Image
//           source={require('../../assets/images/icongroup.png')}
//           resizeMode="contain"
//           style={[
//             styles.logo,
//             {
//               opacity: logoAnim,
//               transform: [
//                 {
//                   scale: logoAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.7, 1],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       </LinearGradient>
//     );
//   }

//   // SCREEN 4
//   return (
//     <View style={styles.blackContainer}>
//       <StatusBar
//         backgroundColor="#02040D"
//         barStyle="light-content"
//       />

//       {/* LOGO + TAGLINE SAME TIME */}
//       <Animated.View
//         style={[
//           styles.logoWrapper,
//           {
//             opacity: finalLogoAnim,
//             transform: [
//               {
//                 scale: finalLogoAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.8, 1],
//                 }),
//               },
//             ],
//           },
//         ]}>

//         {/* PAYO LOGO */}
//         <Animated.Image
//           source={require('../../assets/images/icongroup.png')}
//           resizeMode="contain"
//           style={styles.finalLogo}
//         />

//         {/* TAGLINE */}
//         <Animated.Image
//           source={require('../../assets/images/tag.png')}
//           resizeMode="contain"
//           style={styles.tagLine}
//         />

//       </Animated.View>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   whiteContainer: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   gradientContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   blackContainer: {
//     flex: 1,
//     backgroundColor: '#02040D',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   smallDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 100,
//     backgroundColor: '#7B2CF4',
//     shadowColor: '#00B7F1',
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 10,
//   },

//   expandCircleWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   expandCircle: {
//     width: 14,
//     height: 14,
//     borderRadius: 100,
//   },

//   logo: {
//     width: width * 0.58,
//     height: 120,
//   },

//   logoWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   finalLogo: {
//     width: width * 0.72,
//     height: 140,
//   },

//   tagLine: {
//     width: width * 0.55,
//     height: 24,
//     marginTop: -18,
//   },
// });



import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Easing,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [screenStep, setScreenStep] = useState(1);

  const dotFade = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(1)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  // BLACK TRANSITION
  const blackOverlayScale = useRef(new Animated.Value(0)).current;

  // SCREEN 4 ANIMATIONS
  const finalLogoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  // FINAL FADE OUT
  const finalFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timers = [];

    // SCREEN 1
    Animated.timing(dotFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // SCREEN 2
    timers.push(
      setTimeout(() => {
        setScreenStep(2);

        Animated.timing(expandAnim, {
          toValue: 80,
          duration: 1600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start(() => {
          setScreenStep(3);

          Animated.timing(logoAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        });
      }, 1200),
    );

    // TRANSITION TO SCREEN 4
    timers.push(
      setTimeout(() => {

        // BLACK COVER ANIMATION
        Animated.timing(blackOverlayScale, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start(() => {

          setScreenStep(4);

          // PAYO LOGO
          Animated.timing(finalLogoOpacity, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => {

            // TAGLINE
            setTimeout(() => {
              Animated.timing(taglineOpacity, {
                toValue: 1,
                duration: 700,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(() => {

                // WELCOME TEXT
                setTimeout(() => {
                  Animated.timing(welcomeOpacity, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }).start(() => {

                    // LOADER
                    setTimeout(() => {

                      Animated.timing(loadingOpacity, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                      }).start();

                      // WAIT
                      setTimeout(() => {

                        // FADE OUT
                        Animated.timing(finalFadeOut, {
                          toValue: 0,
                          duration: 900,
                          easing: Easing.linear,
                          useNativeDriver: true,
                        }).start(() => {
                          navigation.replace('Onboarding1');
                        });

                      }, 1400);

                    }, 500);

                  });
                }, 500);

              });
            }, 500);

          });

        });

      }, 5000),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // SCREEN 1
  if (screenStep === 1) {
    return (
      <View style={styles.whiteContainer}>
        <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

        <Animated.View
          style={[
            styles.smallDot,
            {
              opacity: dotFade,
            },
          ]}
        />
      </View>
    );
  }

  // SCREEN 2
  if (screenStep === 2) {
    return (
      <View style={styles.whiteContainer}>
        <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

        <Animated.View
          style={[
            styles.expandCircleWrapper,
            {
              transform: [{ scale: expandAnim }],
            },
          ]}>
          <LinearGradient
            colors={['#8427F7', '#0DB6E8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.expandCircle}
          />
        </Animated.View>
      </View>
    );
  }

  // SCREEN 3
  if (screenStep === 3) {
    return (
      <LinearGradient
        colors={['#8427F7', '#0DB6E8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}>

        <StatusBar backgroundColor="#8427F7" barStyle="light-content" />

        <Animated.Image
          source={require('../../assets/images/icongroup.png')}
          resizeMode="contain"
          style={[
            styles.logo,
            {
              opacity: logoAnim,
              transform: [
                {
                  scale: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
              ],
            },
          ]}
        />

        {/* BLACK TRANSITION */}
        <Animated.View
          style={[
            styles.blackTransition,
            {
              transform: [
                {
                  scale: blackOverlayScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 15],
                  }),
                },
              ],
            },
          ]}
        />

      </LinearGradient>
    );
  }

  // SCREEN 4
  return (
    <Animated.View
      style={[
        styles.blackContainer,
        {
          opacity: finalFadeOut,
        },
      ]}>

      <StatusBar
        backgroundColor="#02040D"
        barStyle="light-content"
      />

      {/* PAYO LOGO */}
      <Animated.Image
        source={require('../../assets/images/icongroup.png')}
        resizeMode="contain"
        style={[
          styles.finalLogo,
          {
            opacity: finalLogoOpacity,
          },
        ]}
      />

      {/* TAGLINE */}
      <Animated.Image
        source={require('../../assets/images/tag.png')}
        resizeMode="contain"
        style={[
          styles.tagLine,
          {
            opacity: taglineOpacity,
          },
        ]}
      />

      {/* WELCOME TEXT */}
      <Animated.Text
        style={[
          styles.welcomeText,
          {
            opacity: welcomeOpacity,
          },
        ]}>
        welcome
      </Animated.Text>

      {/* LOADER */}
      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: loadingOpacity,
          },
        ]}>

        <ActivityIndicator
          size="large"
          color="#8B5CF6"
        />

      </Animated.View>

    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  blackContainer: {
    flex: 1,
    backgroundColor: '#02040D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallDot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: '#7B2CF4',
    shadowColor: '#00B7F1',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },

  expandCircleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  expandCircle: {
    width: 14,
    height: 14,
    borderRadius: 100,
  },

  logo: {
    width: width * 0.58,
    height: 120,
  },

  finalLogo: {
    width: width * 0.58,
    height: 120,
  },

  tagLine: {
    width: width * 0.55,
    height: 24,
    marginTop: -18,
  },

  welcomeText: {
    position: 'absolute',
    bottom: 150,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'lowercase',
  },

  loaderContainer: {
    position: 'absolute',
    bottom: 90,
  },

  blackTransition: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 140,
    backgroundColor: '#02040D',
    bottom: -60,
    left: -60,
  },
});

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Easing,
//   ActivityIndicator,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const { width } = Dimensions.get('window');

// const SplashScreen = ({ navigation }) => {
//   const [screenStep, setScreenStep] = useState(1);

//   const dotFade = useRef(new Animated.Value(0)).current;
//   const expandAnim = useRef(new Animated.Value(1)).current;
//   const logoAnim = useRef(new Animated.Value(0)).current;

//   // SCREEN 4 ANIMATIONS
//   const finalLogoOpacity = useRef(new Animated.Value(0)).current;
//   const taglineOpacity = useRef(new Animated.Value(0)).current;
//   const welcomeOpacity = useRef(new Animated.Value(0)).current;
//   const loadingOpacity = useRef(new Animated.Value(0)).current;

//   // FINAL FADE OUT
//   const finalFadeOut = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     const timers = [];

//     // SCREEN 1
//     Animated.timing(dotFade, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();

//     // SCREEN 2
//     timers.push(
//       setTimeout(() => {
//         setScreenStep(2);

//         Animated.timing(expandAnim, {
//           toValue: 80,
//           duration: 1600,
//           easing: Easing.out(Easing.exp),
//           useNativeDriver: true,
//         }).start(() => {
//           setScreenStep(3);

//           Animated.timing(logoAnim, {
//             toValue: 1,
//             duration: 1200,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           }).start();
//         });
//       }, 1200),
//     );

//     // SCREEN 4
//     timers.push(
//       setTimeout(() => {
//         setScreenStep(4);

//         // PAYO LOGO
//         Animated.timing(finalLogoOpacity, {
//           toValue: 1,
//           duration: 800,
//           easing: Easing.linear,
//           useNativeDriver: true,
//         }).start(() => {

//           // TAGLINE
//           setTimeout(() => {
//             Animated.timing(taglineOpacity, {
//               toValue: 1,
//               duration: 700,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             }).start(() => {

//               // WELCOME TEXT
//               setTimeout(() => {
//                 Animated.timing(welcomeOpacity, {
//                   toValue: 1,
//                   duration: 700,
//                   easing: Easing.linear,
//                   useNativeDriver: true,
//                 }).start(() => {

//                   // LOADER AFTER HALF SEC
//                   setTimeout(() => {

//                     Animated.timing(loadingOpacity, {
//                       toValue: 1,
//                       duration: 500,
//                       easing: Easing.linear,
//                       useNativeDriver: true,
//                     }).start();

//                     // WAIT LITTLE
//                     setTimeout(() => {

//                       // FADE OUT ALL
//                       Animated.timing(finalFadeOut, {
//                         toValue: 0,
//                         duration: 900,
//                         easing: Easing.linear,
//                         useNativeDriver: true,
//                       }).start(() => {
//                         navigation.replace('Onboarding1');
//                       });

//                     }, 1400);

//                   }, 500);

//                 });
//               }, 500);

//             });
//           }, 500);

//         });

//       }, 5000),
//     );

//     return () => timers.forEach(clearTimeout);
//   }, []);

//   // SCREEN 1
//   if (screenStep === 1) {
//     return (
//       <View style={styles.whiteContainer}>
//         <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

//         <Animated.View
//           style={[
//             styles.smallDot,
//             {
//               opacity: dotFade,
//             },
//           ]}
//         />
//       </View>
//     );
//   }

//   // SCREEN 2
//   if (screenStep === 2) {
//     return (
//       <View style={styles.whiteContainer}>
//         <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

//         <Animated.View
//           style={[
//             styles.expandCircleWrapper,
//             {
//               transform: [{ scale: expandAnim }],
//             },
//           ]}>
//           <LinearGradient
//             colors={['#8427F7', '#0DB6E8']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.expandCircle}
//           />
//         </Animated.View>
//       </View>
//     );
//   }

//   // SCREEN 3
//   if (screenStep === 3) {
//     return (
//       <LinearGradient
//         colors={['#8427F7', '#0DB6E8']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradientContainer}>

//         <StatusBar backgroundColor="#8427F7" barStyle="light-content" />

//         <Animated.Image
//           source={require('../../assets/images/icongroup.png')}
//           resizeMode="contain"
//           style={[
//             styles.logo,
//             {
//               opacity: logoAnim,
//               transform: [
//                 {
//                   scale: logoAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.7, 1],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       </LinearGradient>
//     );
//   }

//   // SCREEN 4
//   return (
//     <Animated.View
//       style={[
//         styles.blackContainer,
//         {
//           opacity: finalFadeOut,
//         },
//       ]}>

//       <StatusBar
//         backgroundColor="#02040D"
//         barStyle="light-content"
//       />

//       {/* PAYO LOGO */}
//       <Animated.Image
//         source={require('../../assets/images/icongroup.png')}
//         resizeMode="contain"
//         style={[
//           styles.finalLogo,
//           {
//             opacity: finalLogoOpacity,
//           },
//         ]}
//       />

//       {/* TAGLINE */}
//       <Animated.Image
//         source={require('../../assets/images/tag.png')}
//         resizeMode="contain"
//         style={[
//           styles.tagLine,
//           {
//             opacity: taglineOpacity,
//           },
//         ]}
//       />

//       {/* WELCOME TEXT */}
//       <Animated.Text
//         style={[
//           styles.welcomeText,
//           {
//             opacity: welcomeOpacity,
//           },
//         ]}>
//         welcome
//       </Animated.Text>

//       {/* LOADER */}
//       <Animated.View
//         style={[
//           styles.loaderContainer,
//           {
//             opacity: loadingOpacity,
//           },
//         ]}>

//         <ActivityIndicator
//           size="large"
//           color="#8B5CF6"
//         />

//       </Animated.View>

//     </Animated.View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   whiteContainer: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   gradientContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   blackContainer: {
//     flex: 1,
//     backgroundColor: '#02040D',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   smallDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 100,
//     backgroundColor: '#7B2CF4',
//     shadowColor: '#00B7F1',
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 10,
//   },

//   expandCircleWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   expandCircle: {
//     width: 14,
//     height: 14,
//     borderRadius: 100,
//   },

//   logo: {
//     width: width * 0.58,
//     height: 120,
//   },

//   finalLogo: {
//     width: width * 0.72,
//     height: 140,
//   },

//   tagLine: {
//     width: width * 0.55,
//     height: 24,
//     marginTop: -18,
//   },

//   welcomeText: {
//     position: 'absolute',
//     bottom: 150,
//     color: '#FFFFFF',
//     fontSize: 34,
//     fontWeight: '600',
//     letterSpacing: 1,
//     textTransform: 'lowercase',
//   },

//   loaderContainer: {
//     position: 'absolute',
//     bottom: 90,
//   },
// });
