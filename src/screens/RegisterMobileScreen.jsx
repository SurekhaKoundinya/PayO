import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function RegisterMobileScreen({ navigation, route }) {
  const { mode = 'register' } = route.params || {};

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidMobile = mobile?.length === 10;

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      setError('Enter valid mobile number');
      return;
    }

    try {
      setLoading(true);
      setError('');

      let response;

      if (mode === 'login') {
        response = await api.post('/api/auth/send-login-otp', { mobile });
      } else {
        response = await api.post('/api/auth/send-otp', { mobile });
      }

      console.log('OTP RESPONSE:', response.data);

      if (response.data?.message === 'OTP sent') {
        navigation.navigate('OTP', { mobile, mode });
      } else {
        setError(response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('ERROR:', error?.response?.data || error.message);

      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  size={moderateScale(28)}
                  color="#000000"
                />
              </TouchableOpacity>

              <Text style={styles.titleCentered}>
                {mode === 'login'
                  ? 'Login with Mobile'
                  : 'Enter Your Mobile Number'}
              </Text>
            </View>

            <Text style={styles.desc}>
              We will send a one time code to verify your number. Standard rates
              may apply
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.label}>Mobile Number</Text>

            <View style={styles.inputRow}>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>+91</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="9876543210"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, '');
                  setMobile(numeric);
                  setError('');
                }}
                maxLength={10}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isValidMobile ? '#4E00C2' : '#ccc',
                },
              ]}
              onPress={handleSendOTP}
              disabled={!isValidMobile || loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            {mode === 'login' ? (
              <Text style={styles.registerText}>
                Don’t have an account?{' '}
                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate('RegisterMobile', {
                      mode: 'register',
                    })
                  }>
                  Register
                </Text>
              </Text>
            ) : (
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            )}

            <Text style={styles.footer}>
              By Continuing, you agree to our{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
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
    backgroundColor: '#F2F2F2',
  },

  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },

  titleCentered: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginLeft: wp('3%'),
    color: '#000',
  },

  errorText: {
    color: 'red',
    fontSize: moderateScale(13),
    marginBottom: hp('1.2%'),
    textAlign: 'center',
  },

  desc: {
    textAlign: 'center',
    color: '#555',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('3%'),
  },

  label: {
    fontSize: moderateScale(12),
    marginBottom: hp('0.8%'),
    marginTop: hp('0.5%'),
    fontWeight: '700',
    color: '#000',
  },

  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  codeBox: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfcdcd',
  },

  codeText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#000',
  },

  input: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    fontSize: moderateScale(15),
    color: '#000',
  },

  button: {
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: hp('4%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  link: {
    color: '#5A00D1',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  loginText: {
    marginTop: hp('3%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(14),
  },

  registerText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#555',
    fontSize: moderateScale(14),
  },

  footer: {
    marginTop: hp('1.5%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    paddingHorizontal: wp('5%'),
  },
});