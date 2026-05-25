import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function Recents({
  navigation,
  setSelectedUser,
  setActiveTab,
}) {
  const [recents, setRecents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecents = async () => {
    try {
      setLoading(true);
      const res = await api.get('api/wallet/recents-page');

      let data = res.data || [];

      const uniqueMap = new Map();

      data.forEach((item) => {
        uniqueMap.set(item.walletAddress, item);
      });

      let uniqueList = Array.from(uniqueMap.values());

      uniqueList.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt),
      );

      const finalList =
        uniqueList.slice(0, 5);

      setRecents(finalList);
    } catch (err) {
      console.log(
        'Recents error:',
        err.response?.data ||
          err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecents();
    }, []),
  );

  const formatTime = (
    timestamp,
  ) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff =
      (now - date) /
      (1000 * 60 * 60);

    if (diff < 1)
      return 'Just now';
    if (diff < 24)
      return `${Math.floor(
        diff,
      )} hours ago`;
    if (diff < 48)
      return 'Yesterday';

    return date.toLocaleDateString();
  };

  const renderItem = ({
    item,
  }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        setSelectedUser({
          name: item.receiverName,
          address:
            item.walletAddress,
        });

        setActiveTab('amount');
      }}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Icon
            name="arrow-up-right"
            size={moderateScale(18)}
            color="black"
          />
        </View>

        <View style={styles.userInfo}>
          <Text
            style={styles.name}
            numberOfLines={1}>
            {item.receiverName}
          </Text>

          <Text
            style={styles.address}
            numberOfLines={1}>
            {item.walletAddress}
          </Text>
        </View>
      </View>

      <Text
        style={styles.time}
        numberOfLines={1}>
        {formatTime(
          item.createdAt,
        )}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.section}>
        Recent Contacts
      </Text>

      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : recents.length === 0 ? (
        <Text style={styles.empty}>
          No recent contacts
        </Text>
      ) : (
        <FlatList
          data={recents}
          keyExtractor={(item) =>
            item._id
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom:
              hp('18%'),
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('1.5%'),
    paddingHorizontal: wp('1%'),
  },

  section: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginBottom: hp('1.5%'),
    fontWeight: '600',
  },

  empty: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: hp('3%'),
    fontSize: moderateScale(13),
  },

  card: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    backgroundColor: '#6A35C1',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius:
      moderateScale(12),
    marginBottom: hp('1.2%'),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('3%'),
  },

  icon: {
    backgroundColor: '#fff',
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
    minWidth: 34,
    minHeight: 34,
  },

  userInfo: {
    flex: 1,
  },

  name: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  address: {
    color: '#ccc',
    fontSize: moderateScale(11),
    marginTop: hp('0.3%'),
  },

  time: {
    color: '#fff',
    fontSize: moderateScale(11),
    maxWidth: wp('24%'),
    textAlign: 'right',
  },
});