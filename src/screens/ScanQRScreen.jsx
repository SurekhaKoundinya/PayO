import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import api from '../api/axios';

const { width } = Dimensions.get('window');

export default function ScanQRScreen({ navigation, setSelectedUser, setActiveTab }) {
  const route = useRoute();
  const device = useCameraDevice('back');

  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [torch, setTorch] = useState('off');
  const [isProcessingScan, setIsProcessingScan] = useState(false);
 

  const scanLine = useRef(new Animated.Value(0)).current;

  // 🔥 Animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(scanLine, {
        toValue: 230,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // 🔐 Camera Permission
  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };
    getPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScannedData(null);

      return () => { };
    }, [])
  );



  const handleQR = async (value) => {
    // Prevent multiple API hits
    if (scannedData || isProcessingScan) return;
 
    setIsProcessingScan(true);
 
    try {
      const res = await api.post('api/wallet/scan-qr', { qrData: value });
 
      const user = {
        name: res?.data?.name,
        address: res?.data?.walletAddress,
      };
 
      setScannedData(user);
 
      // Navigate to amount screen
      setSelectedUser(user);
      setActiveTab('amount');
 
    } catch (err) {
      Alert.alert(
        'Invalid QR',
        'The scanned QR code is invalid.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Resume scanner only after user clicks OK
              setIsProcessingScan(false);
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }
 
    // Keep scanner blocked after successful scan
  };
 

  // 🔍 Scanner
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !scannedData) {
        handleQR(codes[0].value);
      }
    },
  });

  // ❌ No Permission
  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No Camera Permission</Text>
      </View>
    );
  }

  console.log(scannedData, "999")

  return (

    <SafeAreaView style={styles.container}>
      
      <View style={styles.scanWrapper}>
        {!scannedData && (
          <Camera
            style={styles.camera}
            device={device}
            isActive={!scannedData}
            torch={torch}
            codeScanner={codeScanner}
          />
        )}


        {!scannedData && (
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLine }] },
            ]}
          />
        )}


        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />

        {/* ✅ Preview */}
        {scannedData && (
          <View style={styles.preview}>
            <Text style={{ fontWeight: '600' }}>
              {scannedData.name}
            </Text>
          </View>
        )}
      </View>

      {!scannedData ? (
        <Text style={styles.scanText}>Scanning QR code...</Text>
      ) : (
        <>
          <Text style={styles.success}>
            QR detected. Enter amount to proceed
          </Text>

        </>
      )}


      {!scannedData && (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={async () => {
              const res = await launchImageLibrary({ mediaType: 'photo' });
              if (res.assets?.length) {
                handleQR('uploaded-image');
              }
            }}
          >
            <Text style={styles.smallText}>Upload QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() =>
              setTorch(torch === 'off' ? 'on' : 'off')
            }
          >
            <Text style={styles.smallText}>
              {torch === 'off' ? 'Torch' : 'Torch Off'}
            </Text>
          </TouchableOpacity>
        </View>
      )}


      {!scannedData && (
        <View style={styles.text}>
          <Text style={{ fontWeight: '400', color: "white", fontSize: 14, paddingBottom: 5,textAlign:"center" }}>
            Point your camera at a QR code to continue.   </Text>
          <Text style={{ fontWeight: '400', color: "white", fontSize: 14, textAlign:"center" }}>Hold steady for faster scanning
          </Text>
        </View>
      )}



      {/* {!scannedData && (
        <TouchableOpacity
          style={styles.simulate}
          onPress={() => handleQR('test-wallet-address')}

        >
          <Text style={{ color: '#fff' }}>Simulate Scan</Text>
        </TouchableOpacity>
      )} */}
    </SafeAreaView>

  );
}


/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },

  title: { color: '#fff', marginBottom: 20 },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#6A00F4',
    borderRadius: 12,
    padding: 5,
    width: '90%',
    marginBottom: 20,
  },
  

  tab: { flex: 1, alignItems: 'center', padding: 8 },

  activeTab: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },

  tabText: { color: '#fff' },
  activeText: { color: '#6A00F4', fontWeight: '600' },

  scanWrapper: {
    width: 225,
    height: 225,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: { width: '100%', height: '100%' },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'lime',
  },

  preview: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },

  scanText: { color: '#ccc', marginTop: 10 },
  success: { color: '#00FFAA', marginTop: 15 },

  continueBtn: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
  },

  continueText: { color: '#fff', fontWeight: '600' },

  row: { flexDirection: 'row', marginTop: 20 },

  smallBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  text: { color: '#fff', padding: 25 },
  smallText: { color: '#fff' },

  simulate: {
    backgroundColor: '#8A2BE2',
    padding: 12,
    borderRadius: 10,
    width: width * 0.7,
    alignItems: 'center',
    marginTop: 8,
  },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});