import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import api from '../api/axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [faceId, setFaceId] = useState(true);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const confirmPasswordTimer = useRef(null);

  const validate = () => {
    let err = {};

    if (!name?.trim()) {
      err.name = 'Full name is required';
    } else if (name.trim().length < 3) {
      err.name = 'Minimum 3 characters required';
    }

    if (!email?.trim()) {
      err.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = 'Invalid email format should contain @';
    }

    if (!password) {
      err.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
    ) {
      err.password =
        'Use 8+ chars with uppercase, lowercase, number & special character';
    }

    if (!confirmPassword) {
      err.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      err.confirmPassword = 'Passwords do not match';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field, value) => {
    if (field === 'name') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      setName(filteredValue);
    }

    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
    if (field === 'referral') setReferral(value);

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleContinue = async () => {
    setMessage('');

    if (!validate()) return;

    try {
      await api.post('/api/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
        confirmpassword: confirmPassword,
        referralCode: referral,
      });

      navigation.navigate('TransactionPin');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went wrong. Please try again';

      let fieldErrors = {};

      if (msg.toLowerCase().includes('email')) {
        fieldErrors.email = msg;
      } else if (msg.toLowerCase().includes('password')) {
        fieldErrors.password = msg;
      } else {
        setMessage(msg);
      }

      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="chevron-left"
                  size={moderateScale(28)}
                  color="#000"
                />
              </TouchableOpacity>

              <Text style={styles.titleCentered}>Create your Profile</Text>
            </View>

            <Text style={styles.sub}>
              Tell us a little bit about yourself to get started
            </Text>

            {message ? (
              <Text style={styles.errorCenter}>{message}</Text>
            ) : null}

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              value={name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Enter Name"
              placeholderTextColor="#A0A0A0"
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              value={email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter Email"
              placeholderTextColor="#A0A0A0"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Create Password</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.password && styles.errorInput,
              ]}>
              <TextInput
                style={styles.inputWithIcon}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => handleChange('password', text)}
                placeholder="************"
                placeholderTextColor="#A0A0A0"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.confirmPassword && styles.errorInput,
              ]}>
              <TextInput
                style={styles.inputWithIcon}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={(text) => {
                  handleChange('confirmPassword', text);

                  if (confirmPasswordTimer.current) {
                    clearTimeout(confirmPasswordTimer.current);
                  }

                  confirmPasswordTimer.current = setTimeout(() => {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword:
                        password !== text ? 'Passwords do not match' : '',
                    }));
                  }, 500);
                }}
                placeholder="************"
                placeholderTextColor="#A0A0A0"
              />

              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Icon
                  name={showConfirm ? 'eye-off' : 'eye'}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Text style={styles.label}>
              Referral Code <Text style={styles.optional}>(Optional)</Text>
            </Text>

            <TextInput
              style={styles.input}
              value={referral}
              onChangeText={(text) => handleChange('referral', text)}
              placeholder="PAYOOTHU234"
              placeholderTextColor="#A0A0A0"
            />

            <View style={styles.switchRow}>
              <Switch
                value={faceId}
                onValueChange={setFaceId}
                disabled={true}
              />

              <Text style={styles.switchText}>
                Enable Face ID login for faster, secure access
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}>
                Login
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
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
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
    color: '#777',
    marginBottom: hp('3%'),
    marginTop: hp('1%'),
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('2%'),
  },

  errorCenter: {
    color: 'red',
    textAlign: 'center',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
  },

  label: {
    marginTop: hp('1.8%'),
    marginBottom: hp('0.8%'),
    fontSize: moderateScale(13),
    color: '#333',
    fontWeight: '600',
  },

  optional: {
    color: '#999',
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
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: wp('3%'),
  },

  inputWithIcon: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    fontSize: moderateScale(14),
    color: '#000',
  },

  errorInput: {
    borderColor: '#E53935',
  },

  error: {
    color: '#E53935',
    fontSize: moderateScale(11),
    marginTop: hp('0.5%'),
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3%'),
  },

  switchText: {
    marginLeft: wp('3%'),
    flex: 1,
    fontSize: moderateScale(12),
    color: '#444',
    lineHeight: moderateScale(18),
  },

  button: {
    backgroundColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: hp('4%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  loginText: {
    marginTop: hp('3%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(13),
    marginBottom: hp('3%'),
  },

  link: {
    color: '#5A00D1',
    textDecorationLine: 'underline',
  },
});