import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function BottomNav({
  navigation,
  currentRoute,
}) {
  const insets = useSafeAreaInsets();

  const goToTab = (screen) => {
    if (screen === 'ScanButton') {
      navigation.navigate('Main', {
        screen: 'Send',
        params: {
          tab: 'scan',
        },
      });
      return;
    }

    if (screen === 'Main') {
      navigation.navigate('Main', {
        screen: 'Home',
      });
      return;
    }

    navigation.navigate('Main', {
      screen,
    });
  };

  const getColor = (route) =>
    currentRoute === route ? '#FF7FD8' : '#ccc';

  return (
    <View
      style={[
        styles.bottomNav,
        {
          paddingBottom:
            insets.bottom > 0
              ? insets.bottom + moderateScale(6)
              : moderateScale(10),

          minHeight:
            insets.bottom > 0
              ? moderateScale(72) + insets.bottom
              : moderateScale(78),
        },
      ]}>
      {/* HOME */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() => goToTab('Main')}>
        <Icon
          name="home"
          size={moderateScale(20)}
          color={getColor('Home')}
        />

        <Text
          style={[
            styles.navLabel,
            currentRoute === 'Home'
              ? styles.navActive
              : styles.navInactive,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* WALLETS */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() => goToTab('Wallets')}>
        <Icon
          name="credit-card"
          size={moderateScale(20)}
          color={getColor('Wallets')}
        />

        <Text
          style={[
            styles.navLabel,
            currentRoute === 'Wallets'
              ? styles.navActive
              : styles.navInactive,
          ]}>
          Wallets
        </Text>
      </TouchableOpacity>

      {/* CENTER SCANNER */}
      <TouchableOpacity
        style={styles.centerIcon}
        activeOpacity={0.85}
        onPress={() => goToTab('ScanButton')}>
        <Icon
          name="maximize"
          size={moderateScale(24)}
          color="#fff"
        />
      </TouchableOpacity>

      {/* TRANSACTIONS */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() =>
          goToTab('Transactions')
        }>
        <Icon
          name="repeat"
          size={moderateScale(20)}
          color={getColor('Transactions')}
        />

        <Text
          style={[
            styles.navLabel,
            currentRoute === 'Transactions'
              ? styles.navActive
              : styles.navInactive,
          ]}>
          Transactions
        </Text>
      </TouchableOpacity>

      {/* MARKET */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() =>
          goToTab('MarketScreen')
        }>
        <Icon
          name="trending-up"
          size={moderateScale(20)}
          color={getColor('MarketScreen')}
        />

        <Text
          style={[
            styles.navLabel,
            currentRoute === 'MarketScreen'
              ? styles.navActive
              : styles.navInactive,
          ]}>
          Market
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#2E1065',

    borderTopLeftRadius: moderateScale(22),
    borderTopRightRadius: moderateScale(22),

    zIndex: 999,
    elevation: 15,

    paddingHorizontal: wp('2%'),
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: hp('1%'),
  },

  navLabel: {
    fontSize: moderateScale(9),
    marginTop: hp('0.4%'),
    fontWeight: '500',
  },

  navActive: {
    color: '#F472B6',
  },

  navInactive: {
    color: '#aaa',
  },

  centerIcon: {
    position: 'absolute',
    alignSelf: 'center',

    top: -28,

    width: moderateScale(62),
    height: moderateScale(62),
    borderRadius: moderateScale(31),

    backgroundColor: '#7C3AED',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 20,
    zIndex: 1000,
  },
});