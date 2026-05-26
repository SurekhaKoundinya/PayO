import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KycFailStyles';

export default function KycFail({
  navigation,
}) {
  return (
    <SafeAreaView
      style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F3F3F3"
        barStyle="dark-content"
      />

      <View style={styles.container}>

        {/* Warning Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.warningBox}>
            <Icon
              name="alert-triangle"
              size={70}
              color="#000"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Oops! Verification Didn’t Go Through
        </Text>

        {/* Subtitle */}
        <Text style={styles.subTitle}>
          Your verification was unsuccessful.
        </Text>

        {/* Instructions */}
        <Text style={styles.instructions}>
          Please ensure:{'\n'}
          • Aadhaar & PAN details match exactly{'\n'}
          • Images are clear and not cropped
        </Text>

        {/* Retry Button */}
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() =>
            navigation.navigate(
              'KYCVerification',
            )
          }>
          <Text
            style={
              styles.retryBtnText
            }>
            Retry
          </Text>
        </TouchableOpacity>

        {/* Support Button */}
        <TouchableOpacity
          style={styles.supportBtn}>
          <Text
            style={
              styles.supportBtnText
            }>
            Contact Support
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}