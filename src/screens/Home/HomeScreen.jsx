import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  LineChart,
} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Feather';

import Header from '../../components/common/Header';

import styles from './Styles/HomeStyles';

const screenWidth =
  Dimensions.get('window').width;

export default function HomeScreen({
  navigation,
}) {

  const [
    balanceVisible,
    setBalanceVisible,
  ] = useState(true);

  const transactionsList = [
    {
      coin_name: 'Bitcoin',
      amount: 2500,
    },

    {
      coin_name: 'Ethereum',
      amount: 1800,
    },

    {
      coin_name: 'USDT',
      amount: 1200,
    },
  ];

  return (

    <SafeAreaView
      style={styles.container}>

      <StatusBar
        backgroundColor="#5A00D1"
        barStyle="light-content"
      />

      <Header type="default" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* BALANCE CARD */}

        <View
          style={styles.balanceCard}>

          <Text
            style={styles.balanceLabel}>

            Total Balance

          </Text>

          <View
            style={styles.balanceRow}>

            <Text
              style={styles.balanceAmount}>

              {balanceVisible
                ? '₹ 25,000'
                : '₹ ******'}

            </Text>

            <TouchableOpacity
              onPress={() =>
                setBalanceVisible(
                  !balanceVisible,
                )
              }>

              <Icon
                name={
                  balanceVisible
                    ? 'eye'
                    : 'eye-off'
                }
                size={22}
                color="#fff"
                style={{
                  marginLeft: 15,
                }}
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* QUICK ACTIONS */}

        <View style={styles.section}>

          <Text
            style={styles.sectionTitle}>

            Quick Actions

          </Text>

          <View
            style={styles.actionsRow}>

            <TouchableOpacity
              style={styles.actionBtn}>

              <Icon
                name="send"
                size={22}
                color="#fff"
              />

              <Text
                style={styles.actionText}>

                Send

              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}>

              <Icon
                name="download"
                size={22}
                color="#fff"
              />

              <Text
                style={styles.actionText}>

                Receive

              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}>

              <Icon
                name="credit-card"
                size={22}
                color="#fff"
              />

              <Text
                style={styles.actionText}>

                Wallet

              </Text>

            </TouchableOpacity>

          </View>

        </View>

        {/* CHART */}

        <View style={styles.section}>

          <Text
            style={styles.sectionTitle}>

            Market Overview

          </Text>

          <LineChart
            data={{
              labels: [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
              ],

              datasets: [
                {
                  data: [
                    20,
                    45,
                    28,
                    80,
                    99,
                  ],
                },
              ],
            }}

            width={screenWidth - 30}

            height={220}

            chartConfig={{
              backgroundColor:
                '#5A00D1',

              backgroundGradientFrom:
                '#5A00D1',

              backgroundGradientTo:
                '#7B2FF7',

              decimalPlaces: 0,

              color: opacity =>
                `rgba(255,255,255,${opacity})`,

              labelColor: opacity =>
                `rgba(255,255,255,${opacity})`,
            }}

            bezier

            style={{
              borderRadius: 16,
              marginTop: 10,
            }}
          />

        </View>

        {/* TRANSACTIONS */}

        <View style={styles.section}>

          <Text
            style={styles.sectionTitle}>

            Recent Transactions

          </Text>

          {transactionsList.map(
            (item, index) => (

              <View
                key={index}
                style={
                  styles.transactionCard
                }>

                <Text
                  style={
                    styles.transactionText
                  }>

                  {item.coin_name}

                </Text>

                <Text
                  style={
                    styles.transactionAmount
                  }>

                  ₹ {item.amount}

                </Text>

              </View>
            ),
          )}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}