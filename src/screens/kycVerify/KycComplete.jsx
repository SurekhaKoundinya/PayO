import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import styles from '../kycVerify/KycCompleteStyles';

export default function KycComplete({
  navigation,
}) {
  return (
    <SafeAreaView
      style={styles.safeArea}>
      <StatusBar
        backgroundColor="#120022"
        barStyle="light-content"
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }>
            <Icon
              name="chevron-left"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Success Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.successCircle}>
            <Icon
              name="check"
              size={70}
              color="#444"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          KYC Completed
        </Text>

        {/* Subtitle */}
        <Text style={styles.subTitle}>
          Thanks for submitting
          your document we'll
          verify it and complete
          your KYC as soon as
          possible
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() =>
            navigation.navigate(
              'Main',
            )
          }>
          <Text
            style={
              styles.homeBtnText
            }>
            Go Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            navigation.navigate(
              'KYCVerification',
            )
          }>
          <Text
            style={
              styles.backBtnText
            }>
            Back to Start
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}