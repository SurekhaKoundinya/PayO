import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function SendPinScreen({
  route,
  navigation,
}) {
  const {
    amount,
    name,
    address,
    sender,
    senderData,
  } = route.params;

  const [pin, setPin] = useState('');

  const handlePress = (val) => {
    if (pin.length < 4) {
      setPin(pin + val);
    }
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      Alert.alert(
        'Error',
        'Enter 4 digit PIN',
      );
      return;
    }

    navigation.navigate('loading', {
      amount,
      name,
      toAddress: address,
      pin,
    });
  };

  const handleDelete = () => {
    setPin((prev) =>
      prev.slice(0, -1),
    );
  };

  const Key = ({
    num,
    letters,
    onPress,
  }) => (
    <TouchableOpacity
      style={styles.key}
      activeOpacity={0.8}
      onPress={() =>
        onPress(num)
      }>
      <Text style={styles.keyText}>
        {num}
      </Text>

      {letters ? (
        <Text
          style={
            styles.keyLetters
          }>
          {letters}
        </Text>
      ) : null}
    </TouchableOpacity>
  );

  const renderDots = () =>
    [...Array(4)].map(
      (_, i) => (
        <View
          key={i}
          style={[
            styles.pinDot,
            pin[i]
              ? styles.activeDot
              : styles.inactiveDot,
          ]}
        />
      ),
    );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.scrollContent
        }>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.goBack()
          }>
          <Text
            style={styles.cancel}>
            Cancel
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View
            style={styles.section}>
            <Text
              style={styles.small}>
              From wallet
            </Text>

            <Text
              style={styles.name}
              numberOfLines={1}>
              {sender?.name ||
                senderData?.name}
            </Text>

            <Text
              style={styles.wallet}
              numberOfLines={1}>
              {sender?.wallet ||
                senderData?.walletAddress}
            </Text>
          </View>

          <View
            style={styles.toSection}>
            <View
              style={
                styles.rowBetween
              }>
              <Text
                style={
                  styles.small
                }>
                To wallet
              </Text>

              <Text
                style={
                  styles.amount
                }>
                {amount} PAYO
              </Text>
            </View>

            <Text
              style={styles.name}
              numberOfLines={1}>
              {name}
            </Text>

            <Text
              style={
                styles.address
              }
              numberOfLines={2}>
              {address}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          ENTER 4-DIGIT
          TRANSACTION PIN
        </Text>

        <View
          style={styles.dotsRow}>
          {renderDots()}
        </View>

        <View
          style={styles.keypad}>
          <View style={styles.row}>
            <Key
              num="1"
              onPress={
                handlePress
              }
            />
            <Key
              num="2"
              letters="ABC"
              onPress={
                handlePress
              }
            />
            <Key
              num="3"
              letters="DEF"
              onPress={
                handlePress
              }
            />
          </View>

          <View style={styles.row}>
            <Key
              num="4"
              letters="GHI"
              onPress={
                handlePress
              }
            />
            <Key
              num="5"
              letters="JKL"
              onPress={
                handlePress
              }
            />
            <Key
              num="6"
              letters="MNO"
              onPress={
                handlePress
              }
            />
          </View>

          <View style={styles.row}>
            <Key
              num="7"
              letters="PQRS"
              onPress={
                handlePress
              }
            />
            <Key
              num="8"
              letters="TUV"
              onPress={
                handlePress
              }
            />
            <Key
              num="9"
              letters="WXYZ"
              onPress={
                handlePress
              }
            />
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={
                styles.deleteKey
              }
              activeOpacity={0.8}
              onPress={
                handleDelete
              }>
              <Text
                style={
                  styles.deleteText
                }>
                ⌫
              </Text>
            </TouchableOpacity>

            <Key
              num="0"
              onPress={
                handlePress
              }
            />

            <TouchableOpacity
              style={
                styles.payButton
              }
              activeOpacity={0.8}
              onPress={
                handleSubmit
              }>
              <Text
                style={
                  styles.payText
                }>
                PAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F5F5F5',
    },

    scrollContent: {
      flexGrow: 1,
      paddingHorizontal:
        wp('4%'),
      paddingTop: hp('1%'),
      paddingBottom:
        hp('4%'),
    },

    cancel: {
      marginBottom:
        hp('1.5%'),
      color: '#444',
      fontSize:
        moderateScale(
          15,
        ),
    },

    card: {
      borderRadius:
        moderateScale(
          16,
        ),
      overflow: 'hidden',
      width: '100%',
      alignSelf: 'center',
    },

    section: {
      backgroundColor:
        '#FFFFFF',
      paddingVertical:
        hp('1.5%'),
      paddingHorizontal:
        wp('4%'),
    },

    toSection: {
      backgroundColor:
        '#D9D2F3',
      paddingVertical:
        hp('1.5%'),
      paddingHorizontal:
        wp('4%'),
    },

    small: {
      color: '#777',
      fontSize:
        moderateScale(
          11,
        ),
      marginBottom:
        hp('0.2%'),
    },

    rowBetween: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
    },

    amount: {
      fontWeight: '700',
      color: '#2E8B57',
      fontSize:
        moderateScale(
          13,
        ),
    },

    name: {
      fontWeight: '700',
      marginTop:
        hp('0.2%'),
      fontSize:
        moderateScale(
          17,
        ),
      textTransform:
        'capitalize',
      color: '#111',
    },

    wallet: {
      fontWeight: '600',
      color: '#111',
      marginTop:
        hp('0.2%'),
      fontSize:
        moderateScale(
          11,
        ),
    },

    address: {
      color: '#666',
      fontSize:
        moderateScale(
          10,
        ),
      marginTop:
        hp('0.2%'),
    },

    title: {
      textAlign: 'center',
      fontSize:
        moderateScale(
          16,
        ),
      fontWeight: '600',
      color: '#444',
      marginTop:
        hp('5%'),
      marginBottom:
        hp('3%'),
    },

    dotsRow: {
      flexDirection:
        'row',
      justifyContent:
        'center',
      marginBottom:
        hp('3%'),
    },

    pinDot: {
      width:
        moderateScale(
          14,
        ),
      height:
        moderateScale(
          14,
        ),
      borderRadius:
        moderateScale(
          7,
        ),
      marginHorizontal:
        wp('2%'),
    },

    activeDot: {
      backgroundColor:
        '#1F2F8A',
    },

    inactiveDot: {
      backgroundColor:
        '#D3D3D3',
    },

    keypad: {
      marginTop: 'auto',
    },

    row: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      marginBottom:
        hp('1.8%'),
    },

    key: {
      width: wp('28%'),
      minWidth: 90,
      height: hp('7%'),
      minHeight: 58,
      borderRadius:
        moderateScale(
          18,
        ),
      backgroundColor:
        '#FFFFFF',
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    keyText: {
      fontSize:
        moderateScale(
          28,
        ),
      color: '#111',
      fontWeight: '400',
    },

    keyLetters: {
      fontSize:
        moderateScale(
          10,
        ),
      color: '#777',
      marginTop:
        hp('0.1%'),
    },

    deleteKey: {
      width: wp('28%'),
      minWidth: 90,
      height: hp('7%'),
      minHeight: 58,
      borderRadius:
        moderateScale(
          18,
        ),
      backgroundColor:
        '#C7D0EA',
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    deleteText: {
      fontSize:
        moderateScale(
          24,
        ),
      color: '#111',
    },

    payButton: {
      width: wp('28%'),
      minWidth: 90,
      height: hp('7%'),
      minHeight: 58,
      borderRadius:
        moderateScale(
          18,
        ),
      backgroundColor:
        '#223B99',
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    payText: {
      color: '#fff',
      fontSize:
        moderateScale(
          18,
        ),
      fontWeight: '700',
    },
  });