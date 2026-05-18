


import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import LinearGradient from "react-native-linear-gradient";
import { AppThemeBackground } from "../../styles/main";
import Header from '../components/header';
import BottomNav from '../components/bottomNav';

const screenWidth = Dimensions.get('window').width;

export default function CoinDetailsScreen({ route }) {

  const { coin } = route.params;

  const isNegative = coin.priceChangePercentage24h < 0;

  // Fake graph data based on current price
  const graphData = [
    coin.price + coin.price * 0.15,
    coin.price + coin.price * 0.1,
    coin.price + coin.price * 0.05,
    coin.price,
    coin.price - coin.price * 0.03,
    coin.price + coin.price * 0.02,
    coin.price - coin.price * 0.04,
    coin.price,
  ];

  return (

  <LinearGradient
    colors={AppThemeBackground.gradientColors}
    start={AppThemeBackground.gradientStart}
    end={AppThemeBackground.gradientEnd}
    style={{ flex: 1 }}
  >

    <ScrollView
      style={[
        styles.container,
        { backgroundColor: "transparent" }
      ]}
      showsVerticalScrollIndicator={false}
    >

      <Header />

      <View style={styles.marketCard}>

        {/* HEADER */}

        <View style={styles.marketHeader}>

          <View style={styles.marketCoinRow}>

            <Image
              source={{
                uri: coin.image || "https://via.placeholder.com/60"
              }}
              style={styles.marketCoinImage}
            />

            <View>

              <Text style={styles.marketCoinName}>
                {coin.name}
              </Text>

              <Text style={styles.marketCoinSymbol}>
                {coin.symbol?.toUpperCase()}
              </Text>

            </View>

          </View>

          <View
            style={[
              styles.marketBadge,
              {
                backgroundColor:
                  isNegative
                    ? '#FFE5EA'
                    : '#E7FFF1',
              },
            ]}
          >

            <Text
              style={{
                color:
                  isNegative
                    ? '#FF4D6D'
                    : '#00C853',
                fontWeight: '700',
              }}
            >
              {isNegative
                ? 'Bearish'
                : 'Bullish'}
            </Text>

          </View>

        </View>

        {/* PRICE */}

        <View style={styles.priceSection}>

          <Text style={styles.marketPrice}>
            ${coin?.price?.toLocaleString()}
          </Text>

          <Text
            style={[
              styles.marketChange,
              {
                color:
                  isNegative
                    ? '#FF4D6D'
                    : '#00C853',
              },
            ]}
          >
            {isNegative ? '▼' : '▲'}{" "}
            {Math.abs(
              coin.priceChangePercentage24h
            ).toFixed(2)}
            %
          </Text>

        </View>

        {/* GRAPH */}

        <LineChart
          data={{
            datasets: [
              {
                data: graphData,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withShadow={false}
          transparent
          bezier
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 6,
            color: () =>
              isNegative
                ? '#FF4D6D'
                : '#00C853',
            strokeWidth: 3,
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
          }}
          style={{
            marginTop: 25,
            borderRadius: 20,
          }}
        />

        {/* EXTRA DETAILS */}

        <View style={styles.statsBox}>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              Market Cap
            </Text>

            <Text style={styles.statValue}>
              ${coin?.marketCap?.toLocaleString() || "N/A"}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              24h High
            </Text>

            <Text style={styles.statValue}>
              ${coin?.high24h?.toLocaleString()}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              24h Low
            </Text>

            <Text style={styles.statValue}>
              ${coin?.low24h?.toLocaleString()}
            </Text>
          </View>

        </View>

      </View>

      {/* <BottomNav/> */}

        </ScrollView>

  </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
  },

  marketCard: {
    backgroundColor: '#cecdfa',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },

  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  marketCoinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  marketCoinImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  marketCoinName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  marketCoinSymbol: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },

  marketBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
  },

  priceSection: {
    marginTop: 30,
  },

  marketPrice: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
  },

  marketChange: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },

  statsBox: {
    marginTop: 35,
    backgroundColor: '#F7F8FA',
    borderRadius: 20,
    padding: 20,
  },

  statItem: {
    marginBottom: 18,
  },

  statLabel: {
    fontSize: 15,
    color: '#888',
    marginBottom: 6,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

});