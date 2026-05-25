// TnsHistorySingleUser.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import styles from './TransactionHistoryStyles';
import api from '../../api/axios';

export default function TnsHistorySingleUser({
  navigation,
}) {
  const route = useRoute();
  const id = route?.params?.id;
  const name = route?.params?.name;

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [dateFilter, setDateFilter] =
    useState(null);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState(null);

  const fetchTransactions =
    async () => {
      try {
        const res = await api.get(
          `/api/wallet/transactions/user/${id}`,
        );

        setTransactions(
          res?.data?.transactions || [],
        );
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const dateOptions = [
    {
      label: 'Today',
      value: 'today',
    },
    {
      label: 'Yesterday',
      value: 'yesterday',
    },
    {
      label: 'This Week',
      value: 'week',
    },
  ];

  const statusOptions = [
    {
      label: 'Sent',
      value: 'sent',
    },
    {
      label: 'Received',
      value: 'received',
    },
  ];

  const filteredData =
    transactions.filter((item) => {
      const amount = Number(
        item.amount,
      );

      if (
        statusFilter === 'sent' &&
        amount >= 0
      )
        return false;

      if (
        statusFilter ===
          'received' &&
        amount <= 0
      )
        return false;

      const itemDate =
        new Date(
          item.date,
        ).toDateString();

      const today =
        new Date().toDateString();

      const yesterday =
        new Date(
          Date.now() - 86400000,
        ).toDateString();

      if (
        dateFilter === 'today' &&
        itemDate !== today
      )
        return false;

      if (
        dateFilter ===
          'yesterday' &&
        itemDate !== yesterday
      )
        return false;

      return true;
    });

  const sortedData = [
    ...filteredData,
  ].sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date),
  );

  const groupByDate = (data) => {
    const today =
      new Date().toDateString();

    const yesterday =
      new Date(
        Date.now() - 86400000,
      ).toDateString();

    const groups = {
      today: [],
      yesterday: [],
      week: [],
    };

    data.forEach((item) => {
      const d = new Date(
        item.date,
      ).toDateString();

      if (d === today)
        groups.today.push(item);
      else if (d === yesterday)
        groups.yesterday.push(item);
      else groups.week.push(item);
    });

    return groups;
  };

  const grouped =
    groupByDate(sortedData);

  const formatDate = (date) =>
    new Date(
      date,
    ).toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const getTitle = (
    type,
    data,
  ) => {
    if (!data.length) return '';

    const d = formatDate(
      data[0].date,
    );

    if (type === 'today')
      return `Today, ${d}`;

    if (type === 'yesterday')
      return `Yesterday, ${d}`;

    return `This week, ${d}`;
  };

  return (
    <LinearGradient
      colors={['#6A00F4', '#1A0033']}
      style={{ flex: 1 }}>
      <SafeAreaView
        style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }>
            <Icon
              name="chevron-left"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.header}>
            Transaction History
          </Text>
        </View>

        <View
          style={[
            styles.filterRow,
            {
              flexWrap: 'wrap',
              gap: wp('2%'),
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              setDateFilter(null);
              setStatusFilter(null);
            }}>
            <Text
              style={
                styles.activeFilter
              }>
              All
            </Text>
          </TouchableOpacity>

          <Dropdown
            style={[
              styles.dropdown,
              {
                minWidth: wp('28%'),
              },
            ]}
            data={dateOptions}
            labelField="label"
            valueField="value"
            placeholder="Date"
            value={dateFilter}
            onChange={(item) =>
              setDateFilter(
                item.value,
              )
            }
            placeholderStyle={
              styles.dropdownText
            }
            selectedTextStyle={
              styles.dropdownText
            }
          />

          <Dropdown
            style={[
              styles.dropdown,
              {
                minWidth: wp('28%'),
              },
            ]}
            data={statusOptions}
            labelField="label"
            valueField="value"
            placeholder="Status"
            value={statusFilter}
            onChange={(item) =>
              setStatusFilter(
                item.value,
              )
            }
            placeholderStyle={
              styles.dropdownText
            }
            selectedTextStyle={
              styles.dropdownText
            }
          />
        </View>        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              color="#fff"
              size="large"
            />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30,
            }}>
            {grouped?.today?.length >
              0 && (
              <>
                <Text
                  style={
                    styles.section
                  }>
                  {getTitle(
                    'today',
                    grouped.today,
                  )}
                </Text>

                {grouped.today.map(
                  (item, i) => (
                    <Item
                      key={i}
                      item={item}
                      navigation={
                        navigation
                      }
                      name={name}
                    />
                  ),
                )}
              </>
            )}

            {grouped?.yesterday
              ?.length > 0 && (
              <>
                <Text
                  style={
                    styles.section
                  }>
                  {getTitle(
                    'yesterday',
                    grouped.yesterday,
                  )}
                </Text>

                {grouped.yesterday.map(
                  (item, i) => (
                    <Item
                      key={i}
                      item={item}
                      navigation={
                        navigation
                      }
                      name={name}
                    />
                  ),
                )}
              </>
            )}

            {grouped?.week?.length >
              0 && (
              <>
                <Text
                  style={
                    styles.section
                  }>
                  {getTitle(
                    'week',
                    grouped.week,
                  )}
                </Text>

                {grouped.week.map(
                  (item, i) => (
                    <Item
                      key={i}
                      item={item}
                      navigation={
                        navigation
                      }
                      name={name}
                    />
                  ),
                )}
              </>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const Item = ({
  item,
  navigation,
  name,
}) => {
  const isReceived =
    Number(item.amount) > 0;

  const formatDateTime = (
    date,
  ) => {
    const now = new Date();
    const itemDate =
      new Date(date);

    const diff = now - itemDate;
    const hours = Math.floor(
      diff / (1000 * 60 * 60),
    );

    if (hours < 24) {
      return `${hours} hours ago`;
    }

    return itemDate.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.historyCard}
      onPress={() =>
        navigation.navigate(
          'TransactionDetailScreen',
          {
            transaction_id:
              item?.id,
          },
        )
      }>
      <View
        style={styles.historyLeft}>
        <View
          style={
            styles.historyIconBox
          }>
          <Icon
            name={
              isReceived
                ? 'arrow-down-left'
                : 'arrow-up-right'
            }
            size={20}
            color="#111"
          />
        </View>

        <View
          style={
            styles.historyUserInfo
          }>
          <Text
            style={
              styles.historyTypeText
            }>
            {isReceived
              ? 'Received from'
              : 'Paid to'}
          </Text>

          <Text
            style={
              styles.historyUserName
            }
            numberOfLines={1}>
            {name || 'User'}
          </Text>

          <Text
            style={
              styles.historyDateText
            }>
            {formatDateTime(
              item.date,
            )}
          </Text>
        </View>
      </View>

      <View
        style={
          styles.historyAmountContainer
        }>
        <Text
          style={[
            styles.historyAmountText,
            {
              color: isReceived
                ? '#16a34a'
                : '#dc2626',
            },
          ]}
          numberOfLines={1}>
          {isReceived
            ? '+'
            : '-'}{' '}
          ₹
          {Math.abs(
            Number(item.amount),
          ).toLocaleString()}
        </Text>

        <Text
          style={
            styles.historyStatusText
          }>
          {isReceived
            ? 'Credited to'
            : 'Debited from'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};