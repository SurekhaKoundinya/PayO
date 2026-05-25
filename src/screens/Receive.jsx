import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import api from '../api/axios';
import BottomNav from './components/bottomNav';
import Icon from 'react-native-vector-icons/Feather';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

const Receive = ({ navigation }) => {
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState('');
  const [timer, setTimer] = useState(900);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  const fetchQr = async () => {
    try {
      setLoading(true);

      const res = await api.get('api/wallet/generate-address');
      const data = res.data;

      const qrImage = data.qr?.startsWith('data:image')
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address || 'No Address');

      setTimer(900);
      setLoading(false);
    } catch (err) {
      console.log('QR ERROR:', err.response?.data || err.message);
      setQr(null);
      setAddress('');
      setTimer(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQr();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timer === 0 && !loading) {
      fetchQr();
    }
  }, [timer]);

  const handleCopy = () => {
    Clipboard.setString(address);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Address copied', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Address copied');
    }
  };

  const handleShare = async () => {
    try {
      if (!qr) return;

      const base64Data = qr.replace(/^data:image\/png;base64,/, '');
      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(filePath, base64Data, 'base64');

      await Share.open({
        url: 'file://' + filePath,
        message: `Send PAYO to this address:\n${address}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <LinearGradient
      colors={['#5B21B6', '#2E1065', '#0F021F']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Icon
                name="chevron-left"
                size={moderateScale(28)}
                color="#ffffff"
              />
            </TouchableOpacity>

            <Text style={styles.header}>Receive</Text>
          </View>

          <View style={styles.qrContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#6A0DAD" />
            ) : qr ? (
              <Image source={{ uri: qr }} style={styles.qrImage} />
            ) : (
              <Text style={styles.errorText}>Failed to load QR</Text>
            )}
          </View>

          <View style={styles.addressCard}>
            <Text style={styles.label}>WALLET ADDRESS</Text>

            <Text
              style={styles.address}
              numberOfLines={2}
            >
              {address}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleCopy}
            >
              <Icon name="copy" size={18} color="#fff" />
              <Text style={styles.actionText}> Copy address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleShare}
            >
              <Icon name="share-2" size={18} color="#fff" />
              <Text style={styles.actionText}> Share address</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timer}>
            QR expires in {formatTime()} sec
          </Text>

          <TouchableOpacity onPress={fetchQr}>
            <Text style={styles.regenerate}>Regenerate</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav navigation={navigation} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Receive;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: hp('2%'),
    paddingBottom: hp('18%'),
    paddingHorizontal: wp('4%'),
  },

  headerRow: {
    width: '100%',
    minHeight: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  backBtn: {
    position: 'absolute',
    left: wp('2%'),
  },

  header: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#fff',
  },

  qrContainer: {
    backgroundColor: '#F2F2F2',
    padding: wp('4%'),
    borderRadius: moderateScale(26),
    width: wp('68%'),
    height: wp('68%'),
    minWidth: 240,
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('3%'),
  },

  qrImage: {
    width: '88%',
    height: '88%',
    resizeMode: 'contain',
  },

  addressCard: {
    width: '90%',
    backgroundColor: '#7C3AED',
    padding: wp('4.5%'),
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: '#C4B5FD',
    borderStyle: 'dashed',
    marginBottom: hp('3%'),
  },

  label: {
    fontSize: moderateScale(12),
    color: '#E9D5FF',
    marginBottom: hp('0.8%'),
  },

  address: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#fff',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: hp('3%'),
    flexWrap: 'wrap',
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: hp('1.6%'),
    paddingHorizontal: wp('4%'),
    borderRadius: moderateScale(12),
    flex: 1,
    marginHorizontal: wp('1%'),
    minWidth: wp('40%'),
    marginBottom: hp('1%'),
  },

  actionText: {
    color: '#fff',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },

  timer: {
    color: '#E9D5FF',
    fontSize: moderateScale(14),
    marginBottom: hp('1.5%'),
    textAlign: 'center',
  },

  regenerate: {
    color: '#E9D5FF',
    fontSize: moderateScale(14),
    textDecorationLine: 'underline',
  },

  errorText: {
    color: '#ccc',
    fontSize: moderateScale(13),
  },
});