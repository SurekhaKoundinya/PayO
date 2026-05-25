// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

// const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 812;

// const scale = size => (width / guidelineBaseWidth) * size;
// const verticalScale = size => (height / guidelineBaseHeight) * size;
// const moderateScale = (size, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// export default function WelcomeScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   // LOGO
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const logoTranslateY = useRef(new Animated.Value(-30)).current;

//   // IMAGE
//   const imageOpacity = useRef(new Animated.Value(0)).current;
//   const imageScale = useRef(new Animated.Value(0.9)).current;

//   // SMOOTH HEARTBEAT
//   const imagePulse = useRef(new Animated.Value(1)).current;

//   // TITLE
//   const titleOpacity = useRef(new Animated.Value(0)).current;
//   const titleTranslateY = useRef(new Animated.Value(20)).current;

//   // DESCRIPTION
//   const descOpacity = useRef(new Animated.Value(0)).current;
//   const descTranslateY = useRef(new Animated.Value(20)).current;

//   // BUTTONS
//   const buttonOpacity = useRef(new Animated.Value(0)).current;
//   const buttonTranslateY = useRef(new Animated.Value(25)).current;

//   useEffect(() => {
//     Animated.sequence([
//       // LOGO
//       Animated.parallel([
//         Animated.timing(logoOpacity, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.spring(logoTranslateY, {
//           toValue: 0,
//           friction: 7,
//           tension: 90,
//           useNativeDriver: true,
//         }),
//       ]),

//       // IMAGE
//       Animated.parallel([
//         Animated.timing(imageOpacity, {
//           toValue: 1,
//           duration: 450,
//           useNativeDriver: true,
//         }),
//         Animated.spring(imageScale, {
//           toValue: 1,
//           friction: 6,
//           tension: 80,
//           useNativeDriver: true,
//         }),
//       ]),

//       // TITLE
//       Animated.parallel([
//         Animated.timing(titleOpacity, {
//           toValue: 1,
//           duration: 250,
//           useNativeDriver: true,
//         }),
//         Animated.spring(titleTranslateY, {
//           toValue: 0,
//           friction: 7,
//           tension: 80,
//           useNativeDriver: true,
//         }),
//       ]),

//       // DESCRIPTION
//       Animated.parallel([
//         Animated.timing(descOpacity, {
//           toValue: 1,
//           duration: 250,
//           useNativeDriver: true,
//         }),
//         Animated.spring(descTranslateY, {
//           toValue: 0,
//           friction: 7,
//           tension: 80,
//           useNativeDriver: true,
//         }),
//       ]),

//       // BUTTONS
//       Animated.parallel([
//         Animated.timing(buttonOpacity, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.spring(buttonTranslateY, {
//           toValue: 0,
//           friction: 7,
//           tension: 80,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start(() => {
//       startHeartbeatAnimation();
//     });
//   }, []);

//   const startHeartbeatAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(imagePulse, {
//           toValue: 1.04,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//         Animated.timing(imagePulse, {
//           toValue: 1,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   return (
//     <SafeAreaView
//       style={styles.container}
//       edges={['top', 'bottom']}
//     >
//       <StatusBar
//         backgroundColor="#FFFFFF"
//         barStyle="dark-content"
//       />

//       <View
//         style={[
//           styles.content,
//           {
//             paddingTop: insets.top + verticalScale(10),
//           },
//         ]}
//       >
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

//         <Animated.Image
//           source={require('../../assets/images/onboarding4.png')}
//           style={[
//             styles.mainImage,
//             {
//               opacity: imageOpacity,
//               transform: [
//                 { scale: imageScale },
//                 { scale: imagePulse },
//               ],
//             },
//           ]}
//         />

//         <Animated.Text
//           style={[
//             styles.title,
//             {
//               opacity: titleOpacity,
//               transform: [{ translateY: titleTranslateY }],
//             },
//           ]}
//         >
//           Welcome!
//         </Animated.Text>

//         <Animated.Text
//           style={[
//             styles.description,
//             {
//               opacity: descOpacity,
//               transform: [{ translateY: descTranslateY }],
//             },
//           ]}
//         >
//           Scan. Pay. Earn Payo.
//         </Animated.Text>
//       </View>

//       <Animated.View
//         style={[
//           styles.buttonContainer,
//           {
//             opacity: buttonOpacity,
//             transform: [{ translateY: buttonTranslateY }],
//             paddingBottom: insets.bottom > 0
//               ? insets.bottom + moderateScale(16)
//               : moderateScale(20),
//           },
//         ]}
//       >
//         <TouchableOpacity
//           style={styles.registerBtn}
//           activeOpacity={0.85}
//           onPress={() => navigation.navigate('RegisterMobile')}
//         >
//           <Text style={styles.registerText}>Register</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.loginBtn}
//           activeOpacity={0.85}
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={styles.loginText}>Login</Text>
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
//     paddingHorizontal: moderateScale(20),
//   },

//   logo: {
//     width: moderateScale(120),
//     height: moderateScale(45),
//     resizeMode: 'contain',
//     marginBottom: verticalScale(30),
//     marginTop: verticalScale(8),
//   },

//   mainImage: {
//     width: width < 360 ? width * 0.62 : width * 0.72,
//     height: width < 360 ? width * 0.62 : width * 0.72,
//     resizeMode: 'contain',
//     marginBottom: verticalScale(30),
//   },

//   title: {
//     fontSize: moderateScale(30),
//     fontWeight: '700',
//     color: '#7B4DFF',
//     textAlign: 'center',
//     marginBottom: verticalScale(12),
//   },

//   description: {
//     fontSize: moderateScale(16),
//     color: '#444',
//     textAlign: 'center',
//     lineHeight: moderateScale(26),
//     paddingHorizontal: moderateScale(10),
//   },

//   buttonContainer: {
//     width: '100%',
//     paddingHorizontal: moderateScale(30),
//   },

//   registerBtn: {
//     backgroundColor: '#6200EE',
//     height: verticalScale(50),
//     borderRadius: moderateScale(14),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(18),
//   },

//   registerText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//   },

//   loginBtn: {
//     height: verticalScale(50),
//     borderRadius: moderateScale(14),
//     borderWidth: 1.5,
//     borderColor: '#7B4DFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   loginText: {
//     color: '#6200EE',
//     fontSize: moderateScale(18),
//     fontWeight: '600',
//   },
// });