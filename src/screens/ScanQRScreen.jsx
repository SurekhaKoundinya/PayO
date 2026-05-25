import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import { launchImageLibrary } from 'react-native-image-picker';
import api from '../api/axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function ScanQRScreen({
  setSelectedUser,
  setActiveTab,
}) {
  const device = useCameraDevice('back');

  const [hasPermission, setHasPermission] =
    useState(false);

  const [scannedData, setScannedData] =
    useState(null);

  const [torch, setTorch] =
    useState('off');

  const [
    isProcessingScan,
    setIsProcessingScan,
  ] = useState(false);

  const scanLine = useRef(
    new Animated.Value(0),
  ).current;

  const scannerSize =
    wp('65%') < 280
      ? wp('65%')
      : 280;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: scannerSize - 20,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scannerSize]);

  useEffect(() => {
    const getPermission = async () => {
      const permission =
        await Camera.requestCameraPermission();

      setHasPermission(
        permission === 'granted',
      );
    };

    getPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScannedData(null);
      setIsProcessingScan(false);
    }, []),
  );

  const handleQR = async (value) => {
    if (
      scannedData ||
      isProcessingScan
    )
      return;

    setIsProcessingScan(true);

    try {
      const res = await api.post(
        'api/wallet/scan-qr',
        {
          qrData: value,
        },
      );

      const user = {
        name: res?.data?.name,
        address:
          res?.data?.walletAddress,
      };

      setScannedData(user);
      setSelectedUser(user);
      setActiveTab('amount');
    } catch (err) {
      Alert.alert(
        'Invalid QR',
        'The scanned QR code is invalid.',
        [
          {
            text: 'OK',
            onPress: () =>
              setIsProcessingScan(false),
          },
        ],
      );
    }
  };

  const codeScanner =
    useCodeScanner({
      codeTypes: ['qr'],
      onCodeScanned: (codes) => {
        if (
          codes.length > 0 &&
          !scannedData
        ) {
          handleQR(codes[0].value);
        }
      },
    });

  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          No Camera Permission
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scanWrapper,
          {
            width: scannerSize,
            height: scannerSize,
          },
        ]}>
        {!scannedData && (
          <>
            <Camera
              style={styles.camera}
              device={device}
              isActive
              torch={torch}
              codeScanner={codeScanner}
            />

            <View
              style={styles.cameraOverlay}
            />

            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [
                    {
                      translateY:
                        scanLine,
                    },
                  ],
                },
              ]}
            />
          </>
        )}

        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      <Text style={styles.scanText}>
        Scanning QR code...
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.smallBtn}
          onPress={async () => {
            const res =
              await launchImageLibrary({
                mediaType: 'photo',
              });

            if (res.assets?.length) {
              handleQR('uploaded-image');
            }
          }}>
          <Text style={styles.smallText}>
            Upload QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() =>
            setTorch(
              torch === 'off'
                ? 'on'
                : 'off',
            )
          }>
          <Text style={styles.smallText}>
            Torch
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.text}>
        <Text style={styles.infoText}>
          Point your camera at a QR code
        </Text>

        <Text style={styles.infoSubText}>
          Hold steady for faster scanning
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: hp('18%'),
    paddingHorizontal: wp('5%'),
  },

  scanWrapper: {
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    marginTop: hp('2%'),
  },

  camera: {
    width: '100%',
    height: '100%',
  },

  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      'rgba(106,0,244,0.35)',
  },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#ffffff',
  },

  cornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 28,
    height: 28,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },

  cornerTR: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },

  cornerBL: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 28,
    height: 28,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },

  cornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 28,
    height: 28,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },

  scanText: {
    color: '#E9D5FF',
    marginTop: hp('2%'),
    fontSize: moderateScale(14),
  },

  row: {
    flexDirection: 'row',
    marginTop: hp('2.5%'),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  smallBtn: {
    borderWidth: 1,
    borderColor: '#8B5CF6',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 20,
    marginHorizontal: wp('2%'),
    marginVertical: hp('0.6%'),
  },

  smallText: {
    color: '#fff',
    fontSize: moderateScale(13),
  },

  text: {
    marginTop: hp('4%'),
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },

  infoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(14),
  },

  infoSubText: {
    color: '#D8B4FE',
    marginTop: 6,
    textAlign: 'center',
    fontSize: moderateScale(12),
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionText: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
});