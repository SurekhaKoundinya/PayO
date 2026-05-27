import React, {
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  LineChart,
} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../api/axios';

import Header from '../../components/common/Header';

import styles from './Styles/HomeStyles';

const screenWidth =
  Dimensions.get(
    'window',
  ).width;

export default function HomeScreen({
  navigation,
}) {

  const [
    balanceVisible,
    setBalanceVisible,
  ] = useState(false);

  const [
    transactionsList,
    setTransactionsList,
  ] = useState([]);

  const [
    showAll,
  ] = useState(false);

  const [
    visibleCount,
  ] = useState(10);

  const [
    currentPage,
  ] = useState(1);

  const [
    avaliable,
    setAvaliable,
  ] = useState('');

  const [
    totalBalance,
    setTotalBalance,
  ] = useState('');

  const [
    expertCoins,
    setExpertCoins,
  ] = useState([]);

  const itemsPerPage = 5;

  const displayedTransactions =
    showAll
      ? transactionsList.slice(
          0,
          visibleCount,
        )
      : transactionsList.slice(
          (
            currentPage - 1
          ) * itemsPerPage,

          currentPage *
            itemsPerPage,
        );

  const totalPages =
    Math.ceil(
      transactionsList.length /
        itemsPerPage,
    );

  const getVisiblePages =
    () => {

      let pages = [];

      const visibleCountPages = 5;

      let startPage =
        currentPage - 2;

      let endPage =
        currentPage + 2;

      if (
        startPage < 1
      ) {

        startPage = 1;

        endPage =
          visibleCountPages;
      }

      if (
        endPage >
        totalPages
      ) {

        endPage =
          totalPages;

        startPage =
          totalPages -
          visibleCountPages +
          1;

        if (
          startPage < 1
        ) {
          startPage = 1;
        }
      }

      for (
        let i = startPage;
        i <= endPage;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    };

  const fetchTotalBalance =
    async () => {

      try {

        const res =
          await api.get(
            '/api/wallet/income-outcome',
          );

        setTotalBalance(
          res?.data || [],
        );

      } catch (err) {

        console.log(
          err.message,
        );
      }
    };

  const fetchTransactions =
    async () => {

      try {

        const res =
          await api.get(
            '/api/wallet/transaction-list',
          );

        const transactions =
          res?.data
            ?.transactions ||
          [];

        const filteredTransactions =
          transactions.filter(
            item =>
              !(
                item?.status ===
                  'failed' &&
                item?.type ===
                  'received'
              ),
          );

        setTransactionsList(
          filteredTransactions,
        );

      } catch (err) {

        console.log(
          err.message,
        );
      }
    };

  const fetchBalance =
    async () => {

      try {

        const response =
          await api.get(
            '/api/wallet/balance',
          );

        setAvaliable(
          response?.data
            ?.balance || '0',
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchExpertCoins =
    async () => {

      try {

        const res =
          await fetch(
            'http://payo-app.duckdns.org:3001/api/market/overview',
          );

        const result =
          await res.json();

        setExpertCoins(
          result?.data?.slice(
            0,
            50,
          ) || [],
        );

      } catch (error) {

        console.log(error);
      }
    };

  useFocusEffect(
    useCallback(() => {

      fetchBalance();

      fetchTransactions();

      fetchTotalBalance();

      fetchExpertCoins();

    }, []),
  );

  return (
    <SafeAreaView
      style={styles.container}>

      <StatusBar
        backgroundColor="#3B0A6B"
        barStyle="light-content"
      />

      <Header type="default" />

      {/* REMAINING UI SAME */}

    </SafeAreaView>
  );
}