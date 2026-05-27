import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  Dropdown,
} from 'react-native-element-dropdown';

import Icon from 'react-native-vector-icons/Feather';

import {
  useRoute,
} from '@react-navigation/native';

import api from '../../api/axios';

import styles from './Styles/TnsSingleuser';

export default function TnsHistorySingleUser({
  navigation,
}) {

  const route =
    useRoute();

  const id =
    route?.params?.id;

  const name =
    route?.params?.name;

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    dateFilter,
    setDateFilter,
  ] = useState(null);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState(null);

  const fetchTransactions =
    async () => {

      try {

        const res =
          await api.get(
            `/api/wallet/transactions/user/${id}`,
          );

        setTransactions(
          res?.data
            ?.transactions || [],
        );

      } catch (err) {

        console.log(
          err.message,
        );

      } finally {

        setLoading(false);
      }
    };
/* eslint-disable react-hooks/exhaustive-deps */
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
    transactions.filter(
      item => {

        const amount =
          Number(
            item.amount,
          );

        if (
          statusFilter ===
            'sent' &&
          amount >= 0
        ) {
          return false;
        }

        if (
          statusFilter ===
            'received' &&
          amount <= 0
        ) {
          return false;
        }

        const itemDate =
          new Date(
            item.date,
          ).toDateString();

        const today =
          new Date().toDateString();

        const yesterday =
          new Date(
            Date.now() -
              86400000,
          ).toDateString();

        if (
          dateFilter ===
            'today' &&
          itemDate !== today
        ) {
          return false;
        }

        if (
          dateFilter ===
            'yesterday' &&
          itemDate !==
            yesterday
        ) {
          return false;
        }

        return true;
      },
    );

  const sortedData = [
    ...filteredData,
  ].sort(
    (a, b) =>
      new Date(
        b.date,
      ) -
      new Date(a.date),
  );

  const groupByDate =
    data => {

      const today =
        new Date().toDateString();

      const yesterday =
        new Date(
          Date.now() -
            86400000,
        ).toDateString();

      const groups = {
        today: [],
        yesterday: [],
        week: [],
      };

      data.forEach(
        item => {

          const d =
            new Date(
              item.date,
            ).toDateString();

          if (d === today) {

            groups.today.push(
              item,
            );

          } else if (
            d ===
            yesterday
          ) {

            groups.yesterday.push(
              item,
            );

          } else {

            groups.week.push(
              item,
            );
          }
        },
      );

      return groups;
    };

  const grouped =
    groupByDate(
      sortedData,
    );

  const formatDate =
    date =>
      new Date(
        date,
      ).toLocaleDateString(
        'en-IN',
        {
          timeZone:
            'Asia/Kolkata',

          day: 'numeric',

          month: 'long',

          year: 'numeric',
        },
      );

  const getTitle = (
    type,
    data,
  ) => {

    if (!data.length)
      return '';

    const d =
      formatDate(
        data[0].date,
      );

    if (
      type === 'today'
    ) {
      return `Today, ${d}`;
    }

    if (
      type ===
      'yesterday'
    ) {
      return `Yesterday, ${d}`;
    }

    return `This week, ${d}`;
  };

  return (
    <LinearGradient
      colors={[
        '#6A00F4',
        '#1A0033',
      ]}
      style={styles.gradient}>

      <SafeAreaView
        style={styles.container}>

        <View
          style={
            styles.headerRow
          }>

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

          <Text
            style={
              styles.header
            }>

            Transaction History

          </Text>

        </View>

        {/* REMAINING UI SAME */}

      </SafeAreaView>

    </LinearGradient>
  );
}