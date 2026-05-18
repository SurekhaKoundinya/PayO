import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { AppThemeBackground } from "../../styles/main";
import styles from './TransactionHistoryStyles';
import api from '../../api/axios';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function TransactionHistory({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  /* 🔥 FETCH */
 const fetchTransactions = async () => {
  setLoading(true);

  try {
    const res = await api.get('/api/wallet/transaction-list');
    setTransactions(res?.data?.transactions || []);
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};
 

  useFocusEffect(
  useCallback(() => {
    fetchTransactions();
  }, [])
);

  /* 🔥 DROPDOWN DATA */
  const dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'week' },
  ];

  const statusOptions = [
    { label: 'Sent', value: 'sent' },
    { label: 'Received', value: 'received' },
    
  ];

  /* 🔥 FILTER LOGIC */
const filteredData = transactions.filter((item) => {

  // ❌ hide failed received transactions
  if (item.status === 'failed' && item.type === 'received') return false;

  // STATUS FILTER
  if (statusFilter === 'sent' && item.type !== 'sent') return false;
  if (statusFilter === 'received' && item.type !== 'received') return false;
  if (statusFilter === 'processing' && item.status !== 'processing') return false;

  // DATE FILTER
  const itemDate = new Date(item.createdAt).toDateString();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (dateFilter === 'today' && itemDate !== today) return false;
  if (dateFilter === 'yesterday' && itemDate !== yesterday) return false;

  return true;
});

  /* 🔥 SORT */
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  /* 🔥 GROUP */
  const groupByDate = (data) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const groups = { today: [], yesterday: [], week: [] };

    data.forEach((item) => {
      const d = new Date(item.createdAt).toDateString();

      if (d === today) groups.today.push(item);
      else if (d === yesterday) groups.yesterday.push(item);
      else groups.week.push(item);
    });

    return groups;
  };

  const grouped = groupByDate(sortedData);

  /* 🔥 FORMAT */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const getTitle = (type, data) => {
    if (!data.length) return '';
    const d = formatDate(data[0].createdAt);

    if (type === 'today') return `Today, ${d}`;
    if (type === 'yesterday') return `Yesterday, ${d}`;
    return `This week, ${d}`;
  };

  return (
    <LinearGradient
  colors={AppThemeBackground.gradientColors}
  start={AppThemeBackground.gradientStart}
  end={AppThemeBackground.gradientEnd}
  style={{
    flex: 1,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
  }}
>
      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity 
  onPress={() => navigation.canGoBack() && navigation.goBack()}          >
            <Text style={styles.back}>
<Icon name="chevron-left" size={28} color="#ffffff" />            </Text>
          </TouchableOpacity>
          <Text style={styles.header}>Transaction History</Text>
        </View>

        {/* FILTERS */}
        <View style={styles.filterRow}>

          <TouchableOpacity onPress={() => {
            setDateFilter(null);
            setStatusFilter(null);
          }}>
            <Text style={styles.activeFilter}>All</Text>
          </TouchableOpacity>

          {/* DATE */}
          <Dropdown
            style={styles.dropdown}
            data={dateOptions}
            labelField="label"
            valueField="value"
            placeholder="Date"
            value={dateFilter}
            onChange={item => setDateFilter(item.value)}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
          />

          {/* STATUS */}
          <Dropdown
            style={styles.dropdown}
            data={statusOptions}
            labelField="label"
            valueField="value"
            placeholder="Status"
            value={statusFilter}
            onChange={item => setStatusFilter(item.value)}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
          />

        </View>

        {/* CONTENT */}
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>

              {sortedData.length === 0 ? (
              <View style={{ alignItems: 'center', marginTop: 120 }}>
                <Icon name="file-text" size={60} color="#c4b5fd" />
 
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '600',
                    marginTop: 15,
                  }}
                >
                  No Transactions Found
                </Text>
 
                <Text
                  style={{
                    color: '#d1d5db',
                    fontSize: 14,
                    marginTop: 6,
                  }}
                >
                  Your transaction history will appear here
                </Text>
              </View>
            ) : (
              <>
              </>
            )}
 

            {grouped.today.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getTitle('today', grouped.today)}
                </Text>
                {grouped.today.map((item, i) => (
                  <Item
                    key={i}
                    item={item}
                    formatTime={formatTime}
                    navigation={navigation}
                  />
                ))}
              </>
            )}

            {grouped.yesterday.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getTitle('yesterday', grouped.yesterday)}
                </Text>
                {grouped.yesterday.map((item, i) => (
                  <Item
                    key={i}
                    item={item}
                    formatTime={formatTime}
                    navigation={navigation}
                  />
                ))}
              </>
            )}

            {grouped.week.length > 0 && (
              <>
                <Text style={styles.section}>
                  {getTitle('week', grouped.week)}
                </Text>
                {grouped.week.map((item, i) => (
                  <Item
                    key={i}
                    item={item}
                    formatTime={formatTime}
                    navigation={navigation}
                  />
                ))}
              </>
            )}

          </ScrollView>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}

/* 🔥 ITEM */
export const Item = ({ item, formatTime, navigation }) => {

  const isReceived = item.type === "received";
  const isFailed = item.status === "failed";

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("TransactionDetailScreen", {
          transaction_id: item?.id,
        })
      }
      activeOpacity={0.7}
    >

      <View style={styles.left}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: isFailed
                ? "#e5e7eb"
                : isReceived
                ? "#e5e7eb"
                : "#e5e7eb",
            },
          ]}
        >
          <Icon
            name={
              isFailed
                ? "x"
                : isReceived
                ? "arrow-down-left"
                : "arrow-up-right"
            }
            size={18}
            color={isFailed ? '#ef4444' :  isReceived ? "#000" : "#000"}
          />
        </View>

        <View>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.time}>
            {isFailed
              ? "Failed"
              : isReceived
              ? "Received"
              : "Sent"}{" "}
            · {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            {
              color: isFailed
                ? "#ef4444"
                : isReceived
                ? "#22c55e"
                : "#ef4444",
            },
          ]}
        >
          {isReceived
            ? `+${Number(item.amount).toFixed(2)}`
            : Number(item.amount).toFixed(2)}
        </Text>

        <Text
          style={[
            styles.status,
            { color: isFailed ? "#ef4444" : "#9ca3af" },
          ]}
        >
          {isFailed
            ? "failed"
            : isReceived
            ? "received"
            : "sent"}
        </Text>
      </View>

    </TouchableOpacity>
  );
};