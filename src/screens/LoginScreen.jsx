// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
// } from 'react-native';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function LoginScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState('');

//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   const validate = () => {
//     let valid = true;
//     let newErrors = {
//       email: '',
//       password: '',
//     };

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     }

//     if (!password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       const response = await api.post('/api/auth/login', {
//         email,
//         password,
//       });

//       if (response?.data?.message === 'Login success') {
//         const token = response?.data?.token;

//         await Keychain.setGenericPassword('userToken', token);

//         setMessage('');
//         navigation.navigate('Main');
//       } else {
//         setMessage(response?.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       setMessage(
//         error?.response?.data?.message ||
//           error?.message ||
//           'Something went wrong',
//       );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             contentContainerStyle={[
//               styles.scrollContent,
//               {
//                 paddingBottom:
//                   insets.bottom > 0
//                     ? insets.bottom + moderateScale(20)
//                     : moderateScale(25),
//               },
//             ]}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={styles.header}>
//               <TouchableOpacity
//                 onPress={() => navigation.goBack()}
//                 style={styles.backButton}
//               >
//                 <Icon
//                   name="chevron-left"
//                   size={moderateScale(28)}
//                   color="#000"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.titleCentered}>Login to Payo</Text>
//             </View>

//             <Text style={styles.sub}>
//               Welcome back! Please enter your details.
//             </Text>

//             {message ? (
//               <Text style={styles.messageText}>{message}</Text>
//             ) : null}

//             <Text style={styles.label}>Email ID</Text>

//             <TextInput
//               style={[styles.input, errors.email && styles.errorInput]}
//               placeholder="your@email.com"
//               placeholderTextColor="#999"
//               value={email}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setErrors((prev) => ({
//                   ...prev,
//                   email: '',
//                 }));
//               }}
//             />

//             {errors.email ? (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             ) : null}

//             <Text style={styles.label}>Password</Text>

//             <View
//               style={[
//                 styles.passwordContainer,
//                 errors.password && styles.errorInput,
//               ]}
//             >
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Your password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={(text) => {
//                   setPassword(text);
//                   setErrors((prev) => ({
//                     ...prev,
//                     password: '',
//                   }));
//                 }}
//               />

//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={moderateScale(18)}
//                   color="#555"
//                 />
//               </TouchableOpacity>
//             </View>

//             {errors.password ? (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             ) : null}

//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPasswordScreen')}
//             >
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleSubmit}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>

//             <View style={styles.orRow}>
//               <View style={styles.line} />
//               <Text style={styles.or}>OR</Text>
//               <View style={styles.line} />
//             </View>

//             <TouchableOpacity
//               style={styles.otpBtn}
//               onPress={() =>
//                 navigation.navigate('RegisterMobile', {
//                   mode: 'login',
//                 })
//               }
//               activeOpacity={0.8}
//             >
//               <Text style={styles.otpText}>Login with OTP</Text>
//             </TouchableOpacity>

//             <Text style={styles.registerText}>
//               Don’t have an account?{' '}
//               <Text
//                 style={styles.link}
//                 onPress={() =>
//                   navigation.navigate('RegisterMobile', {
//                     mode: 'register',
//                   })
//                 }
//               >
//                 Register
//               </Text>
//             </Text>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#EAEAEA',
//   },

//   scrollContent: {
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2%'),
//     flexGrow: 1,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('2%'),
//   },

//   backButton: {
//     padding: moderateScale(4),
//   },

//   titleCentered: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     color: '#000',
//     marginRight: wp('7%'),
//   },

//   sub: {
//     textAlign: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('4%'),
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     paddingHorizontal: wp('3%'),
//   },

//   messageText: {
//     color: 'red',
//     marginBottom: hp('1.5%'),
//     textAlign: 'center',
//     fontSize: moderateScale(12),
//   },

//   label: {
//     fontSize: moderateScale(12),
//     color: '#333',
//     marginBottom: hp('0.7%'),
//     fontWeight: '700',
//     paddingLeft: wp('1%'),
//   },

//   input: {
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     fontSize: moderateScale(14),
//     color: '#000',
//     marginBottom: hp('1%'),
//   },

//   passwordContainer: {
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingHorizontal: wp('4%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   passwordInput: {
//     flex: 1,
//     paddingVertical: hp('1.8%'),
//     fontSize: moderateScale(14),
//     color: '#000',
//   },

//   errorInput: {
//     borderColor: 'red',
//   },

//   errorText: {
//     color: 'red',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(11),
//   },

//   forgot: {
//     textAlign: 'right',
//     marginTop: hp('1%'),
//     color: '#5A00D1',
//     fontSize: moderateScale(12),
//   },

//   button: {
//     backgroundColor: '#5A00D1',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//     marginTop: hp('3%'),
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   orRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: hp('3%'),
//   },

//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },

//   or: {
//     marginHorizontal: wp('3%'),
//     color: '#777',
//     fontSize: moderateScale(13),
//   },

//   otpBtn: {
//     borderWidth: 2,
//     borderColor: '#5A00D1',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//   },

//   otpText: {
//     color: '#5A00D1',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   registerText: {
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     color: '#555',
//     fontSize: moderateScale(13),
//   },

//   link: {
//     color: '#5A00D1',
//     fontWeight: '600',
//   },
// });




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import NetInfo from '@react-native-community/netinfo';

import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const validate = () => {
    let valid = true;

    let newErrors = {
      email: '',
      password: '',
    };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      setMessage('No internet connection');
      return;
    }

    if (!validate()) return;

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      if (response?.data?.message === 'Login success') {
        const token = response?.data?.token;

        await Keychain.setGenericPassword('userToken', token);

        setMessage('');

        if (isConnected) {
          navigation.navigate('Main');
        }
      } else {
        setMessage(response?.data?.message || 'Login failed');
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />

      {!isConnected && (
        <View style={styles.internetBar}>
          <Text style={styles.internetText}>
            No Internet Connection
          </Text>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom:
                  insets.bottom > 0
                    ? insets.bottom + moderateScale(20)
                    : moderateScale(25),
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon
                  name="chevron-left"
                  size={moderateScale(28)}
                  color="#000"
                />
              </TouchableOpacity>

              <Text style={styles.titleCentered}>Login to Payo</Text>
            </View>

            <Text style={styles.sub}>
              Welcome back! Please enter your details.
            </Text>

            {message ? (
              <Text style={styles.messageText}>{message}</Text>
            ) : null}

            <Text style={styles.label}>Email ID</Text>

            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="your@email.com"
              placeholderTextColor="#999"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);

                setErrors(prev => ({
                  ...prev,
                  email: '',
                }));
              }}
            />

            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <Text style={styles.label}>Password</Text>

            <View
              style={[
                styles.passwordContainer,
                errors.password && styles.errorInput,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);

                  setErrors(prev => ({
                    ...prev,
                    password: '',
                  }));
                }}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={moderateScale(18)}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {errors.password ? (
              <Text style={styles.errorText}>
                {errors.password}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ForgotPasswordScreen')
              }
            >
              <Text style={styles.forgot}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                !isConnected && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!isConnected}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.orRow}>
              <View style={styles.line} />

              <Text style={styles.or}>OR</Text>

              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={[
                styles.otpBtn,
                !isConnected && styles.disabledOtpBtn,
              ]}
              onPress={() =>
                isConnected &&
                navigation.navigate('RegisterMobile', {
                  mode: 'login',
                })
              }
              activeOpacity={0.8}
              disabled={!isConnected}
            >
              <Text style={styles.otpText}>
                Login with OTP
              </Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
              Don’t have an account?{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  isConnected &&
                  navigation.navigate('RegisterMobile', {
                    mode: 'register',
                  })
                }
              >
                Register
              </Text>
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  internetBar: {
    width: '100%',
    backgroundColor: '#ff0000',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  internetText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    flexGrow: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },

  backButton: {
    padding: moderateScale(4),
  },

  titleCentered: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000',
    marginRight: wp('7%'),
  },

  sub: {
    textAlign: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('4%'),
    color: '#666',
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('3%'),
  },

  messageText: {
    color: 'red',
    marginBottom: hp('1.5%'),
    textAlign: 'center',
    fontSize: moderateScale(12),
  },

  label: {
    fontSize: moderateScale(12),
    color: '#333',
    marginBottom: hp('0.7%'),
    fontWeight: '700',
    paddingLeft: wp('1%'),
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: moderateScale(14),
    color: '#000',
    marginBottom: hp('1%'),
  },

  passwordContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    fontSize: moderateScale(14),
    color: '#000',
  },

  errorInput: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    marginBottom: hp('1%'),
    fontSize: moderateScale(11),
  },

  forgot: {
    textAlign: 'right',
    marginTop: hp('1%'),
    color: '#5A00D1',
    fontSize: moderateScale(12),
  },

  button: {
    backgroundColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: hp('3%'),
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  or: {
    marginHorizontal: wp('3%'),
    color: '#777',
    fontSize: moderateScale(13),
  },

  otpBtn: {
    borderWidth: 2,
    borderColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  disabledOtpBtn: {
    opacity: 0.5,
  },

  otpText: {
    color: '#5A00D1',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  registerText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#555',
    fontSize: moderateScale(13),
  },

  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },
});