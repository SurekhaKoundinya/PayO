// ForgotPassword.jsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
  View,

  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


import styles from './ForgotPasswordStyles';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

export default function ForgotPassword({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [resetToken, setResetToken] = useState('');

  const [errors, setErrors] = useState('');
  const [errorsMobile, setErrorsMobile] = useState('');

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setErrorsMobile('Enter valid 10-digit number');
      return;
    }

    try {
      setSendOtpLoading(true);
      setErrorsMobile('');

      await api.post('/api/auth/reset-send-otp', {
        mobile: phone,
      });

      setOtpSent(true);
    } catch (error) {
      console.log(error?.response?.data || error.message);

      setErrorsMobile(
        error?.response?.data?.message || 'Failed to send OTP',
      );
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpSent) {
      Alert.alert('Error', 'Please send OTP first');
      return;
    }

    if (otp.length < 4) {
      Alert.alert('Error', 'Enter valid OTP');
      return;
    }

    try {
      setVerifyOtpLoading(true);

      const res = await api.post('/api/auth/reset-verify-otp', {
        mobile: phone,
        otp: otp,
      });

      setOtpVerified(true);
      setResetToken(res?.data?.token);
    } catch (error) {
      console.log(error?.response?.data || error.message);
      Alert.alert('Error', 'Invalid OTP');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!otpVerified) {
      Alert.alert('Error', 'Please verify OTP first');
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Enter all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setResetLoading(true);

      const res = await api.post(
        '/api/auth/reset-password',
        {
          mobile: phone,
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        },
      );

      Alert.alert('Success', res?.data?.message || 'Password Reset', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log(error?.response?.data || error.message);
      setErrors(error?.response?.data?.message || error.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  size={28}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Reset Password</Text>

            <Text style={styles.subtitle}>
              Enter your mobile number and verify OTP
            </Text>

            <Text style={styles.label}>Mobile Number</Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={phone}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '');
                  if (cleaned.length <= 10) setPhone(cleaned);

                  setErrorsMobile('');
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
                placeholder="Enter your mobile number"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={10}
                style={styles.textInput}
              />

              <TouchableOpacity
                style={[
                  styles.inlineBtn,
                  { opacity: phone.length === 10 ? 1 : 0.5 },
                ]}
                disabled={
                  phone.length !== 10 ||
                  sendOtpLoading ||
                  otpSent
                }
                onPress={handleSendOtp}>
                {sendOtpLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.inlineBtnText}>
                    {otpSent ? 'Sent' : 'Send OTP'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {errorsMobile ? (
              <Text style={styles.errorText}>{errorsMobile}</Text>
            ) : null}

            <Text style={styles.label}>Enter OTP</Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={otp}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '');
                  setOtp(cleaned);
                }}
                placeholder="Enter OTP"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={6}
                style={styles.textInput}
              />

              <TouchableOpacity
                style={[
                  styles.inlineBtn,
                  { opacity: otpSent ? 1 : 0.5 },
                ]}
                onPress={handleVerifyOtp}
                disabled={
                  !otpSent ||
                  verifyOtpLoading ||
                  otpVerified
                }>
                {verifyOtpLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.inlineBtnText}>
                    {otpVerified ? 'Verified' : 'Verify'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>New Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your new password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={16}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {errors ? (
              <Text style={styles.errorText}>{errors}</Text>
            ) : null}

            <Text style={styles.label}>Confirm Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showConfirmPassword}
                style={styles.passwordInput}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }>
                <Icon
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={16}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { opacity: otpVerified ? 1 : 0.5 },
              ]}
              onPress={handleSubmit}
              disabled={!otpVerified || resetLoading}>
              {resetLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}