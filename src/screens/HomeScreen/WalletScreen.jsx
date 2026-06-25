import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../api/axios';
import styles from './WalletScreenStyles';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export default function WalletScreen({
  navigation,
}) {
  const [wallet, setWallet] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [qr, setQr] =
    useState(null);

  const [address, setAddress] =
    useState('');

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get(
        '/api/wallet/getwalletdashboard',
      );

      setWallet(res?.data);
    } catch (error) {
      console.log(
        'Wallet API error:',
        error?.response ||
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const progress =
    wallet?.dailyLimit > 0
      ? ((wallet?.dailyUsed || 0) /
        wallet?.dailyLimit) *
      100
      : 0;

  const fetchQr = async () => {
    try {
      const res = await api.get(
        'api/wallet/generate-address',
      );

      const data = res.data;

      const qrImage =
        data.qr?.startsWith(
          'data:image',
        )
          ? data.qr
          : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address);

      return {
        qrImage,
        address: data.address,
      };
    } catch (err) {
      console.log(
        'QR ERROR:',
        err.message,
      );
      return null;
    }
  };

  const handleCopy = () => {
    const walletAddress =
      wallet?.id;

    if (!walletAddress) return;

    Clipboard.setString(
      walletAddress,
    );

    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Address copied',
        ToastAndroid.SHORT,
      );
    }
  };

  const handleShare = async () => {
    try {
      const result =
        await fetchQr();

      if (!result) return;

      const {
        qrImage,
        address,
      } = result;

      const base64Data =
        qrImage.replace(
          /^data:image\/png;base64,/,
          '',
        );

      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(
        filePath,
        base64Data,
        'base64',
      );

      await Share.open({
        url: 'file://' + filePath,
        message: `Send PAYO to this address:\n${address}`,
      });
    } catch (error) {
      console.log(
        'Share error:',
        error,
      );
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[
          '#7B2CFF',
          '#1C0033',
        ]}
        style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[
        '#7B2CFF',
        '#1C0033',
      ]}
      style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.walletHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={
                  styles.cancelContainer
                }
                activeOpacity={0.8}
                onPress={() =>
                  navigation.goBack()
                }>
                <Icon
                  name="chevron-left"
                  size={28}
                  color="#ffffff"
                />
              </TouchableOpacity>

              <View>
                <Text
                  style={
                    styles.walletTitle
                  }>
                  My Wallet
                </Text>

                <Text
                  style={
                    styles.walletId
                  }
                  numberOfLines={1}>
                  {wallet?.id}
                </Text>
              </View>
            </View>

            <Header type="" />
          </View>

          <View style={styles.card}>
            <Text style={styles.active}>
              • Active Wallet
            </Text>

            <Text style={styles.label}>
              Total Balance
            </Text>

            <Text style={styles.balance}>
              {wallet?.balance?.toLocaleString()}
              <Text
                style={{
                  fontSize: 16,
                  color: '#74FFA3',
                }}>
                {' '}
                PAYO
              </Text>
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={
                  styles.btnWhite
                }
                activeOpacity={0.8}
                onPress={
                  handleCopy
                }>
                <Text>
                  Copy Address
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.btnOutline
                }
                activeOpacity={0.8}
                onPress={
                  handleShare
                }>
                <Text
                  style={{
                    color:
                      '#fff',
                  }}>
                  Share QR
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={
              styles.rowBetween
            }>
            <Text
              style={
                styles.sectionTitle
              }>
              Token Holdings
            </Text>
          </View>

          <View style={styles.box}>
            <View
              style={
                styles.rowBetween
              }>
              <Text
                style={
                  styles.boxTitle
                }>
                Referral Rewards
              </Text>

              <View
                style={{
                  alignItems:
                    'flex-end',
                }}>
                <Text
                  style={
                    styles.amount
                  }>
                  {wallet?.referralRewards ||
                    0}{' '}
                  PAYO
                </Text>

                <Text
                  style={[
                    styles.pending,
                    {
                      color:
                        wallet?.referralStatus ===
                          'Unlocked'
                          ? '#22c55e'
                          : '#facc15',
                    },
                  ]}>
                  {
                    wallet?.referralStatus
                  }
                </Text>
              </View>
            </View>

            {wallet?.referralStatus ===
              'Locked' ? (
              <Text
                style={
                  styles.locked
                }>
                • Unlocks in{' '}
                {
                  wallet?.unlockInDays
                }{' '}
                days
              </Text>
            ) : (
              <Text
                style={[
                  styles.locked,
                  {
                    color:
                      '#22c55e',
                  },
                ]}>
                • Rewards Available
              </Text>
            )}
          </View>

          <View style={styles.box}>
            <Text
              style={
                styles.boxTitle
              }>
              Daily Transaction
              Limit
            </Text>

            <View
              style={
                styles.rowBetween
              }>
              <Text
                style={
                  styles.subText
                }>
                Used{' '}
                {wallet?.dailyUsed ||
                  0}
              </Text>

              <Text
                style={
                  styles.subText
                }>
                Limit:{' '}
                {wallet?.dailyLimit ||
                  0}
              </Text>
            </View>

            <View
              style={
                styles.progressBg
              }>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(
                      progress,
                      100,
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>

          <View
            style={
              styles.bottomButtons
            }>
            <TouchableOpacity
              style={
                styles.freezeBtn
              } />

            <TouchableOpacity
              style={styles.sendBtn}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  'SendScreen',
                )
              }>
              <Text
                style={
                  styles.sendText
                }>
                Send PAYO
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

