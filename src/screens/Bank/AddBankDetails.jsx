import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

import styles from './AddBankDetailsStyles';
import api from '../../api/axios';

const AddBankDetails = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    bank: '',
    account: '',
    confirmAccount: '',
    ifsc: '',
    accountType: 'Savings',
    bankProof: null,
  });

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [banksList, setBanksList] =
    useState([]);

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'IDBI Bank',
    'Yes Bank',
    'Central Bank of India',
    'Indian Bank',
    'UCO Bank',
    'Bank of India',
    'Federal Bank',
    'South Indian Bank',
    'RBL Bank',
    'Bandhan Bank',
  ];

  const fetchBankListData =
    async () => {
      try {
        const res = await api.get(
          '/api/wallet/all-banks',
        );

        setBanksList(
          res?.data?.data || [],
        );
      } catch (err) {
        console.log(
          err.message,
        );
      }
    };

  useFocusEffect(
    useCallback(() => {
      fetchBankListData();
    }, []),
  );

  const handleChange = (
    name,
    value,
  ) => {
    if (name === 'name') {
      value =
        value.replace(
          /[^a-zA-Z ]/g,
          '',
        );

      if (value.length > 25)
        return;
    }

    if (
      name === 'mobile' ||
      name === 'account' ||
      name ===
      'confirmAccount'
    ) {
      value =
        value.replace(
          /[^0-9]/g,
          '',
        );
    }

    if (name === 'ifsc') {
      value =
        value.toUpperCase();
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const pickBankProof = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && result.assets?.length > 0) {
      setForm({
        ...form,
        bankProof: result.assets[0],
      });
    }
  };

  const handleSubmit =
    async () => {
      if (loading) return;

      const {
        name,
        mobile,
        bank,
        account,
        confirmAccount,
        ifsc,
        accountType,
        bankProof,
      } = form;

      if (
        !name ||
        !mobile ||
        !bank ||
        !account ||
        !confirmAccount ||
        !ifsc ||
        !accountType ||
        !bankProof
      ) {
        alert(
          'All fields are required',
        );
        return;
      }

      if (
        !/^[A-Za-z ]{1,25}$/.test(
          name,
        )
      ) {
        alert(
          'Name must contain only alphabets and max 25 characters',
        );
        return;
      }

      if (
        !/^[6-9]\d{9}$/.test(
          mobile,
        )
      ) {
        alert(
          'Invalid mobile number',
        );
        return;
      }

      if (
        account !==
        confirmAccount
      ) {
        alert(
          'Account number does not match',
        );
        return;
      }

      if (
        account.length < 9 ||
        account.length > 18
      ) {
        alert(
          'Account number must be between 9 and 18 digits',
        );
        return;
      }

      const ifscRegex =
        /^[A-Z]{4}0[A-Z0-9]{6}$/;

      if (
        !ifscRegex.test(ifsc)
      ) {
        alert(
          'Invalid IFSC code',
        );
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.post(
            'api/bank/add-bank',
            {
              name,
              mobile,
              bank,
              account,
              ifsc,
              accountType,
              confirmAccount,
            },
          );

        if (
          res?.data?.success
        ) {
          alert(
            'Bank Details Saved Successfully!',
          );

          navigation.navigate(
            'TpinScreen',
            {
              account:
                account.trim(),
              bankResponse:
                res?.data?.data,
            },
          );
        }
      } catch (err) {
        console.log(
          'BANK API ERROR:',
          err?.response
            ?.data ||
          err.message,
        );
      } finally {
        setLoading(false);
      }
    };

  const Label = ({
    text,
  }) => (
    <Text
      style={
        styles.sectionTitle
      }>
      {text}{' '}
      <Text
        style={{
          color: 'red',
        }}>
        *
      </Text>
    </Text>
  );

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={[
        'top',
        'bottom',
      ]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.container
          }>
          {/* HEADER */}
          <View
            style={
              styles.header
            }>
            <TouchableOpacity
              style={
                styles.backButton
              }
              onPress={() =>
                navigation.navigate(
                  'UserProfile',
                )
              }>
              <Text
                style={
                  styles.back
                }>
                <Icon
                  name="chevron-left"
                  size={28}
                  color="#000000"
                />
              </Text>
            </TouchableOpacity>

            <Text
              style={
                styles.title
              }>
              Add Bank
              Account
            </Text>
          </View>

          {/* ACCOUNT HOLDER */}
          <Label text="Account Holder Name" />

          <TextInput
            style={
              styles.input
            }
            placeholder="Enter Name"
            value={
              form.name
            }
            maxLength={25}
            onChangeText={(
              text,
            ) =>
              handleChange(
                'name',
                text,
              )
            }
          />

          {/* MOBILE */}
          <Label text="Mobile Number" />

          <TextInput
            style={
              styles.input
            }
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            value={
              form.mobile
            }
            onChangeText={(
              text,
            ) =>
              handleChange(
                'mobile',
                text,
              )
            }
          />

          {/* ACCOUNT TYPE */}
          <Label text="Account Type" />

          <TouchableOpacity
            style={
              styles.radioRow
            }
            onPress={() =>
              handleChange(
                'accountType',
                'Savings',
              )
            }>
            <View
              style={[
                styles.radioOuter,
                form.accountType ===
                'Savings' &&
                styles.radioOuterActive,
              ]}>
              {form.accountType ===
                'Savings' && (
                  <View
                    style={
                      styles.radioInner
                    }
                  />
                )}
            </View>

            <Text
              style={
                styles.radioText
              }>
              Savings
              Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.radioRow
            }
            onPress={() =>
              handleChange(
                'accountType',
                'Current',
              )
            }>
            <View
              style={[
                styles.radioOuter,
                form.accountType ===
                'Current' &&
                styles.radioOuterActive,
              ]}>
              {form.accountType ===
                'Current' && (
                  <View
                    style={
                      styles.radioInner
                    }
                  />
                )}
            </View>

            <Text
              style={
                styles.radioText
              }>
              Current
              Account
            </Text>
          </TouchableOpacity>

          {/* BANK */}
          <Label text="Select Bank" />

          <TouchableOpacity
            style={
              styles.dropdownInput
            }
            onPress={() =>
              setShowDropdown(
                !showDropdown,
              )
            }>
            <Text
              style={
                styles.bankIcon
              }>
              🏦
            </Text>

            <Text
              style={
                styles.dropdownText
              }>
              {form.bank ||
                'Select Bank'}
            </Text>

            <Text
              style={
                styles.dropdownArrow
              }>
              {showDropdown
                ? '⌃'
                : '⌄'}
            </Text>
          </TouchableOpacity>

          {showDropdown && (
            <View
              style={
                styles.dropdown
              }>
              <FlatList
                nestedScrollEnabled
                data={banks}
                keyExtractor={(
                  item,
                  index,
                ) =>
                  index.toString()
                }
                renderItem={({
                  item,
                }) => (
                  <TouchableOpacity
                    style={
                      styles.dropdownItem
                    }
                    onPress={() => {
                      handleChange(
                        'bank',
                        item,
                      );

                      setShowDropdown(
                        false,
                      );
                    }}>
                    <Text>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* ACCOUNT */}
          <Label text="Account Number" />

          <TextInput
            style={
              styles.input
            }
            keyboardType="numeric"
            value={
              form.account
            }
            onChangeText={(
              text,
            ) =>
              handleChange(
                'account',
                text,
              )
            }
          />

          {/* CONFIRM */}
          <Label text="Confirm Account Number" />

          <TextInput
            style={
              styles.input
            }
            keyboardType="numeric"
            value={
              form.confirmAccount
            }
            onChangeText={(
              text,
            ) =>
              handleChange(
                'confirmAccount',
                text,
              )
            }
          />

          {/* IFSC */}
          <Label text="IFSC Code" />

          <TextInput
            style={
              styles.input
            }
            autoCapitalize="characters"
            value={
              form.ifsc
            }
            onChangeText={(
              text,
            ) =>
              handleChange(
                'ifsc',
                text,
              )
            }
          />

          {/* BANK PROOF */}
          <Label text="Upload Passbook Image" />

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={pickBankProof}
            activeOpacity={0.8}
          >
            {form.bankProof ? (
              <Image
                source={{ uri: form.bankProof.uri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ) : (
              <>
                <Icon name="upload" size={24} color="#7b1fa2" />
                <Text style={styles.uploadText}>
                  Tap to upload bank proof
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* BUTTON */}
          <TouchableOpacity
            style={
              styles.button
            }
            activeOpacity={
              0.8
            }
            onPress={
              handleSubmit
            }>
            <Text
              style={
                styles.buttonText
              }>
              {loading
                ? 'Saving...'
                : 'Save & Continue'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBankDetails;