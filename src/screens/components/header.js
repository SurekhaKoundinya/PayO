// Header.js

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import styles from '../HomeScreen/homeStyling';

export default function Header({
  type = 'default',
  title,
  id,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {type === 'wallet' ? (
        <View style={localStyles.walletBlock}>
          <Text style={localStyles.walletTitle}>
            {title || 'Wallet'}
          </Text>

          <Text style={styles.walletNumber}>
            {id}
          </Text>
        </View>
      ) : (
        <View style={localStyles.emptyLeft} />
      )}

      <View style={styles.headerRight}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={localStyles.notificationBtn}
          onPress={() =>
            navigation.navigate('Notifications')
          }>
          <Icon
            name="bell"
            size={moderateScale(20)}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.profileIcon}
          onPress={() =>
            navigation.navigate('UserProfile')
          }>
          <Icon
            name="user"
            size={moderateScale(16)}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = {
  walletBlock: {
    justifyContent: 'center',
  },

  walletTitle: {
    color: '#fff',
    fontSize: moderateScale(17),
    fontWeight: '700',
    marginBottom: hp('0.3%'),
  },

  notificationBtn: {
    padding: wp('1.2%'),
  },

  emptyLeft: {
    width: wp('15%'),
  },
};