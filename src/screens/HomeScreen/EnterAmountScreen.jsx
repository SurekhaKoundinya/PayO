import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import api from '../../api/axios';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function EnterAmountScreen({
  navigation,
  name,
  address,
  setActiveTab,
  show,
}) {
  const [amount, setAmount] = useState('');
  const [available, setAvailable] = useState('');
  const [senderData, setSenderData] =
    useState({});
  const [message, setMessage] =
    useState('');

  const route = useRoute();

  const Transname =
    route?.params?.name;
  const Transaddress =
    route?.params?.address;
  const TransrouteAmount =
    route?.params?.amount;
  const TransShow =
    route?.params?.show;

  useEffect(() => {
    const fetchBalance =
      async () => {
        try {
          const response =
            await api.get(
              '/api/wallet/balance',
            );

          setAvailable(
            response?.data?.balance ||
              '0',
          );
        } catch (error) {
          console.log(
            'Error fetching balance:',
            error,
          );
        }
      };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchProfileData =
      async () => {
        try {
          const res =
            await api.get(
              '/api/wallet/profile',
            );

          setSenderData(
            res?.data?.data,
          );
        } catch (err) {
          console.log(
            err.message,
          );
        }
      };

    fetchProfileData();
  }, [navigation]);

  const handleContinue =
    async () => {
      const data =
        address ||
        Transaddress;

      if (!data) {
        Alert.alert(
          'Error',
          'Enter valid wallet address',
        );
        return;
      }

      try {
        await api.post(
          '/api/wallet/transfer/preview',
          {
            toAddress: data,
            amount: amount,
          },
        );

        if (TransShow) {
          navigation.navigate(
            'SendPin',
            {
              amount:
                TransrouteAmount,
              name: Transname,
              address:
                Transaddress,
              senderData,
            },
          );
        } else {
          navigation.navigate(
            'SendPin',
            {
              amount,
              name,
              address,
              senderData,
            },
          );
        }
      } catch (err) {
        setMessage(
          err?.response?.data
            ?.message,
        );
      }
    };

  return (
    <LinearGradient
      colors={
        TransShow
          ? [
              '#6A00F4',
              '#1A0033',
            ]
          : [
              'transparent',
              'transparent',
            ]
      }
      style={styles.gradient}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scrollContent
          }>
          <View
            style={
              styles.container
            }>
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }>
              <Text
                style={
                  styles.cancel
                }>
                Cancel
              </Text>
            </TouchableOpacity>

            <Text
              style={
                styles.title
              }>
              Total Tokens Transfer
              Details
            </Text>

            <View
              style={
                styles.amountCard
              }>
              <View
                style={
                  styles.amountRow
                }>
                <TextInput
                  style={
                    styles.amountInput
                  }
                  value={amount}
                  onChangeText={(
                    text,
                  ) => {
                    const cleaned =
                      text.replace(
                        /[^0-9]/g,
                        '',
                      );

                    setAmount(
                      cleaned,
                    );
                    setMessage(
                      '',
                    );
                  }}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#eee"
                  cursorColor="#fff"
                  maxLength={
                    6
                  }
                />

                <Text
                  style={
                    styles.currency
                  }>
                  PAYO
                </Text>
              </View>
            </View>

            {message ? (
              <Text
                style={
                  styles.errorText
                }>
                {message}
              </Text>
            ) : null}

            <Text
              style={
                styles.toText
              }>
              To -{' '}
              {name ||
                Transname}
            </Text>

            <Text
              style={
                styles.address
              }
              numberOfLines={
                2
              }>
              {address ||
                Transaddress}
            </Text>

            <View
              style={
                styles.row
              }>
              {[
                '100',
                '300',
                '500',
                '700',
              ].map(
                (
                  val,
                ) => (
                  <TouchableOpacity
                    key={
                      val
                    }
                    style={
                      styles.quickBtn
                    }
                    onPress={() =>
                      setAmount(
                        val,
                      )
                    }>
                    <Text
                      style={
                        styles.quickText
                      }>
                      {val}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            <View
              style={
                styles.balanceBox
              }>
              <Text
                style={
                  styles.balanceText
                }>
                Available
                balance
              </Text>

              <Text
                style={
                  styles.balanceAmount
                }>
                {
                  available
                }
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.continueBtn
              }
              onPress={
                handleContinue
              }>
              <Text
                style={
                  styles.continueText
                }>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles =
  StyleSheet.create({
    gradient: {
      flex: 1,
    },

    safeArea: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
      paddingBottom:
        hp('18%'),
    },

    container: {
      flex: 1,
      paddingHorizontal:
        wp('5%'),
      paddingTop:
        hp('2%'),
    },

    cancel: {
      color: '#fff',
      fontSize:
        moderateScale(
          16,
        ),
      marginBottom:
        hp('2.5%'),
    },

    title: {
      color: '#fff',
      textAlign:
        'center',
      fontSize:
        moderateScale(
          16,
        ),
      marginBottom:
        hp('3%'),
      fontWeight:
        '600',
    },

    amountCard: {
      backgroundColor:
        '#9B6DFF',
      borderRadius:
        moderateScale(
          20,
        ),
      paddingVertical:
        hp('3%'),
      paddingHorizontal:
        wp('6%'),
      alignItems:
        'center',
      justifyContent:
        'center',
      alignSelf:
        'center',
      width: '85%',
      marginBottom:
        hp('3%'),
    },

    amountRow: {
      flexDirection:
        'row',
      alignItems:
        'center',
    },

    amountInput: {
      fontSize:
        moderateScale(
          36,
        ),
      color: '#fff',
      fontWeight:
        '700',
      textAlign:
        'center',
      minWidth:
        wp('20%'),
    },

    currency: {
      fontSize:
        moderateScale(
          16,
        ),
      color:
        '#00FFD1',
      marginLeft:
        wp('2%'),
      fontWeight:
        '600',
    },

    toText: {
      color: '#fff',
      textAlign:
        'center',
      marginBottom:
        hp('0.8%'),
      textTransform:
        'capitalize',
      fontSize:
        moderateScale(
          14,
        ),
    },

    address: {
      color: '#ccc',
      textAlign:
        'center',
      marginBottom:
        hp('3%'),
      fontSize:
        moderateScale(
          12,
        ),
    },

    errorText: {
      color: '#ff0000',
      textAlign:
        'center',
      marginBottom:
        hp('1.5%'),
      fontSize:
        moderateScale(
          14,
        ),
    },

    row: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      flexWrap:
        'wrap',
      marginBottom:
        hp('3%'),
    },

    quickBtn: {
      backgroundColor:
        '#E5E5E5',
      paddingVertical:
        hp('1.2%'),
      borderRadius:
        moderateScale(
          8,
        ),
      width: wp('18%'),
      minWidth: 60,
      alignItems:
        'center',
      marginBottom:
        hp('1%'),
    },

    quickText: {
      fontWeight:
        '500',
      fontSize:
        moderateScale(
          13,
        ),
    },

    balanceBox: {
      backgroundColor:
        '#7B3FE4',
      borderRadius:
        moderateScale(
          14,
        ),
      paddingVertical:
        hp('1.8%'),
      paddingHorizontal:
        wp('4%'),
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      marginBottom:
        hp('2.5%'),
    },

    balanceText: {
      color: '#ddd',
      fontSize:
        moderateScale(
          12,
        ),
    },

    balanceAmount: {
      color: '#fff',
      fontWeight:
        '600',
      fontSize:
        moderateScale(
          14,
        ),
      textAlign:
        'right',
    },

    continueBtn: {
      backgroundColor:
        '#16A34A',
      paddingVertical:
        hp('2%'),
      borderRadius:
        moderateScale(
          10,
        ),
      alignItems:
        'center',
    },

    continueText: {
      color: '#fff',
      fontWeight:
        '600',
      fontSize:
        moderateScale(
          14,
        ),
    },
  });