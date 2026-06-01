// LoginScreen.jsx

import React, {
  useState,
  useEffect,
} from 'react';

import {
  View,
  Text,
  TextInput,
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

import api from '../../../api/axios';

import * as Keychain from 'react-native-keychain';

import Icon from 'react-native-vector-icons/Feather';

import { moderateScale } from 'react-native-size-matters';

import styles from './Login';

export default function LoginScreen({
  navigation,
}) {

  const insets = useSafeAreaInsets();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [isConnected, setIsConnected] =
    useState(true);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {

    const unsubscribe =
      NetInfo.addEventListener(state => {
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

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {

    newErrors.email =
      'Email is required';

    valid = false;

  } else if (!emailRegex.test(email)) {

    newErrors.email =
      'Enter valid email';

    valid = false;
  }

  if (!password.trim()) {

    newErrors.password =
      'Password is required';

    valid = false;

  } else if (password.length < 6) {

    newErrors.password =
      'Password must be 6 characters';

    valid = false;
  }

  setErrors(newErrors);

  return valid;
};

  const handleSubmit = async () => {

  if (!isConnected) {

    setMessage(
      'No internet connection',
    );

    return;
  }

  if (!validate()) return;

  try {

    const response = await api.post(
      '/api/auth/login',
      {
        email,
        password,
      },
    );

    console.log(
      'LOGIN RESPONSE:',
      response.data,
    );

    const token =
      response?.data?.token;

    if (token) {

      await Keychain.setGenericPassword(
        'userToken',
        token,
      );

      setMessage('');

      navigation.replace(
        'BottomTabs',
      );

    } else {

      setMessage(
        response?.data?.message ||
        'Login failed',
      );
    }

  } catch (error) {

    console.log(
      'LOGIN ERROR:',
      error?.response?.data,
    );

    setMessage(
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong',
    );
  }
};

  return (

    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom']}>

      <StatusBar
        backgroundColor="#EAEAEA"
        barStyle="dark-content"
      />

      {!isConnected && (
        <View style={styles.internetBar}>
          <Text style={styles.internetText}>
            No Internet Connection
          </Text>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}>

          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom:
                  insets.bottom > 0
                    ? insets.bottom +
                      moderateScale(20)
                    : moderateScale(25),
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            <View style={styles.header}>

              <TouchableOpacity
                onPress={() =>
                  navigation.goBack()
                }
                style={styles.backButton}>

                <Icon
                  name="chevron-left"
                  size={moderateScale(28)}
                  color="#000"
                />

              </TouchableOpacity>

              <Text style={styles.titleCentered}>
                Login to Payo
              </Text>

            </View>

            <Text style={styles.sub}>
              Welcome back! Please enter your details.
            </Text>

            {message ? (
              <Text style={styles.messageText}>
                {message}
              </Text>
            ) : null}

            <Text style={styles.label}>
              Email ID
            </Text>

            <TextInput
              style={[
                styles.input,
                errors.email &&
                  styles.errorInput,
              ]}
              placeholder="your@email.com"
              placeholderTextColor="#999"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => {

                setEmail(text);

                setErrors(prev => ({
                  ...prev,
                  email: '',
                }));
              }}
            />

            {errors.email ? (
              <Text style={styles.errorText}>
                {errors.email}
              </Text>
            ) : null}

            <Text style={styles.label}>
              Password
            </Text>

            <View
              style={[
                styles.passwordContainer,
                errors.password &&
                  styles.errorInput,
              ]}>

              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#999"
                secureTextEntry={
                  !showPassword
                }
                value={password}
                onChangeText={text => {

                  setPassword(text);

                  setErrors(prev => ({
                    ...prev,
                    password: '',
                  }));
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    !showPassword,
                  )
                }>

                <Icon
                  name={
                    showPassword
                      ? 'eye'
                      : 'eye-off'
                  }
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
                navigation.navigate(
                  'ForgotPasswordScreen',
                )
              }>

              <Text style={styles.forgot}>
                Forgot Password?
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                !isConnected &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!isConnected}>

              <Text style={styles.buttonText}>
                Submit
              </Text>

            </TouchableOpacity>

            <View style={styles.orRow}>

              <View style={styles.line} />

              <Text style={styles.or}>
                OR
              </Text>

              <View style={styles.line} />

            </View>

            <TouchableOpacity
              style={[
                styles.otpBtn,
                !isConnected &&
                  styles.disabledOtpBtn,
              ]}
              onPress={() =>
                isConnected &&
                navigation.navigate(
                  'RegisterScreen',
                  {
                    mode: 'login',
                  },
                )
              }
              activeOpacity={0.8}
              disabled={!isConnected}>

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
                  navigation.navigate(
                    'RegisterScreen',
                    {
                      mode: 'register',
                    },
                  )
                }>

                Register

              </Text>

            </Text>

          </ScrollView>

        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}