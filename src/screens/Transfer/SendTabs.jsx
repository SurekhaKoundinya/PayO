import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function SendTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab === 'scan' &&
            styles.activeTab,
        ]}
        onPress={() =>
          setActiveTab('scan')
        }>
        <Text
          style={
            activeTab === 'scan'
              ? styles.activeText
              : styles.text
          }>
          Scan QR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab ===
            'address' &&
            styles.activeTab,
        ]}
        onPress={() =>
          setActiveTab(
            'address',
          )
        }>
        <Text
          style={
            activeTab ===
            'address'
              ? styles.activeText
              : styles.text
          }>
          Enter Address
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab ===
            'recents' &&
            styles.activeTab,
        ]}
        onPress={() =>
          setActiveTab(
            'recents',
          )
        }>
        <Text
          style={
            activeTab ===
            'recents'
              ? styles.activeText
              : styles.text
          }>
          Recents
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor:
        'rgba(255,255,255,0.12)',
      borderRadius:
        moderateScale(16),
      padding: wp('1%'),
      marginHorizontal:
        wp('5%'),
      marginBottom:
        hp('2%'),
      borderWidth: 1,
      borderColor:
        'rgba(255,255,255,0.12)',
    },

    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent:
        'center',
      paddingVertical:
        hp('1.6%'),
      paddingHorizontal:
        wp('2%'),
      borderRadius:
        moderateScale(14),
    },

    activeTab: {
      backgroundColor: '#fff',
      elevation: 3,
    },

    text: {
      color: '#E9D5FF',
      fontSize:
        moderateScale(11),
      fontWeight: '600',
      textAlign: 'center',
    },

    activeText: {
      color: '#111827',
      fontWeight: '700',
      fontSize:
        moderateScale(11),
      textAlign: 'center',
    },
  });