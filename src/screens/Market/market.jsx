import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/header';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../api/axios';

const MarketScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

   useFocusEffect(
     useCallback(() => {
       fetchExpertCoins();
     }, []),
   );

  const fetchExpertCoins = async () => {
  try {
    setLoading(true);

    const res = await api.get('/api/market/overview');

    console.log(res.data, 'data');

    setCoins(res?.data?.data?.slice(0, 50));
    setLoading(false);
  } catch (error) {
    console.log('Expert picks error:', error);
    setLoading(false);
  }
};

  const renderItem = ({ item }) => {
    const isLong =
      item?.priceChangePercentage24h >= 0;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            'CoinDetailsScreen',
            {
              coin: item,
            },
          )
        }>
        <View style={styles.topRow}>
          <View style={styles.coinInfo}>
            <Image
              source={{
                uri:
                  item?.image ||
                  'https://cdn-icons-png.flaticon.com/512/825/825508.png',
              }}
              style={styles.coinImage}
            />

            <Text style={styles.symbol}>
              {item.symbol?.toUpperCase()}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              isLong
                ? styles.longBadge
                : styles.shortBadge,
            ]}>
            <Text style={styles.badgeText}>
              {isLong
                ? 'Long 5x'
                : 'Short 5x'}
            </Text>
          </View>
        </View>

        <Text style={styles.label}>
          Entry Price
        </Text>

        <Text style={styles.price}>
          ${item.price?.toLocaleString()}
        </Text>

        <View style={styles.actionRow}>
          <View style={styles.profitBox}>
            <Text style={styles.profitText}>
              {/* {Math.abs(
                item.priceChangePercentage24h ||
                  0,
              ).toFixed(2)} */}

                     {(
  item.priceChangePercentage24h || 0
).toFixed(2)}
              % Expected profit
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.actionButton,
              isLong
                ? styles.buyButton
                : styles.sellButton,
            ]}>
            <Text style={styles.actionText}>
              {isLong
                ? 'Buy / Long'
                : 'Sell / Short'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <Header />

      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.canGoBack() &&
            navigation.goBack()
          }>
          <Icon
            name="chevron-left"
            size={moderateScale(28)}
            color="#ffffff"
          />
        </TouchableOpacity>

        <Text style={styles.header}>
          Market
        </Text>
      </View>

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: hp('2%'),
          paddingBottom: hp('18%'),
        }}
      />
    </SafeAreaView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A6B',
    paddingHorizontal: wp('4.5%'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },

  header: {
    color: '#FFF',
    fontSize: moderateScale(21),
    fontWeight: '700',
    marginLeft: wp('3%'),
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B0A6B',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(18),
    padding: wp('4%'),
    marginBottom: hp('1.8%'),
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('2%'),
  },

  coinImage: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    marginRight: wp('3%'),
  },

  symbol: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#111',
  },

  badge: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
    borderRadius: moderateScale(12),
  },

  longBadge: {
    backgroundColor: '#DCFCE7',
  },

  shortBadge: {
    backgroundColor: '#FEE2E2',
  },

  badgeText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#111',
  },

  label: {
    marginTop: hp('1.4%'),
    color: '#777',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  price: {
    marginTop: hp('0.5%'),
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1.8%'),
    flexWrap: 'wrap',
  },

  profitBox: {
    backgroundColor: '#ECFDF5',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3.5%'),
    borderRadius: moderateScale(12),
    marginRight: wp('2%'),
    flex: 1,
    minWidth: wp('42%'),
  },

  profitText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: moderateScale(12),
  },

  actionButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp('32%'),
  },

  buyButton: {
    backgroundColor: '#16A34A',
  },

  sellButton: {
    backgroundColor: '#EF4444',
  },

  actionText: {
    color: '#FFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
  },
});