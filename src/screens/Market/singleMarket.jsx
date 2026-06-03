// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LineChart } from 'react-native-chart-kit';
// import Header from '../components/header';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function CoinDetailsScreen({
//   route,
// }) {
//   const { coin } = route.params;

//   const isNegative =
//     coin.priceChangePercentage24h < 0;

//   const graphData = [
//     coin.price + coin.price * 0.15,
//     coin.price + coin.price * 0.1,
//     coin.price + coin.price * 0.05,
//     coin.price,
//     coin.price - coin.price * 0.03,
//     coin.price + coin.price * 0.02,
//     coin.price - coin.price * 0.04,
//     coin.price,
//   ];

//   return (
//     <SafeAreaView
//       style={styles.container}
//       edges={['top', 'bottom']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={
//           styles.scrollContent
//         }>
//         <Header />

//         <View style={styles.marketCard}>
//           <View
//             style={
//               styles.marketHeader
//             }>
//             <View
//               style={
//                 styles.marketCoinRow
//               }>
//               <Image
//                 source={{
//                   uri:
//                     coin.image ||
//                     'https://via.placeholder.com/60',
//                 }}
//                 style={
//                   styles.marketCoinImage
//                 }
//               />

//               <View
//                 style={
//                   styles.coinInfo
//                 }>
//                 <Text
//                   style={
//                     styles.marketCoinName
//                   }
//                   numberOfLines={1}>
//                   {coin.name}
//                 </Text>

//                 <Text
//                   style={
//                     styles.marketCoinSymbol
//                   }>
//                   {coin.symbol?.toUpperCase()}
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={[
//                 styles.marketBadge,
//                 {
//                   backgroundColor:
//                     isNegative
//                       ? '#FFE5EA'
//                       : '#E7FFF1',
//                 },
//               ]}>
//               <Text
//                 style={[
//                   styles.badgeText,
//                   {
//                     color:
//                       isNegative
//                         ? '#FF4D6D'
//                         : '#00C853',
//                   },
//                 ]}>
//                 {isNegative
//                   ? 'Bearish'
//                   : 'Bullish'}
//               </Text>
//             </View>
//           </View>

//           <View
//             style={
//               styles.priceSection
//             }>
//             <Text
//               style={
//                 styles.marketPrice
//               }>
//               $
//               {coin?.price?.toLocaleString()}
//             </Text>

//             <Text
//               style={[
//                 styles.marketChange,
//                 {
//                   color:
//                     isNegative
//                       ? '#FF4D6D'
//                       : '#00C853',
//                 },
//               ]}>
//               {isNegative
//                 ? '▼'
//                 : '▲'}{' '}
//               {Math.abs(
//                 coin.priceChangePercentage24h,
//               ).toFixed(2)}
//               %
//             </Text>
//           </View>

//           <LineChart
//             data={{
//               datasets: [
//                 {
//                   data: graphData,
//                 },
//               ],
//             }}
//             width={wp('77%')}
//             height={hp('28%')}
//             withDots={false}
//             withInnerLines={false}
//             withOuterLines={false}
//             withHorizontalLabels={false}
//             withVerticalLabels={false}
//             withShadow={false}
//             transparent
//             bezier
//             chartConfig={{
//               backgroundGradientFrom:
//                 '#fff',
//               backgroundGradientTo:
//                 '#fff',
//               decimalPlaces: 6,
//               color: () =>
//                 isNegative
//                   ? '#FF4D6D'
//                   : '#00C853',
//               strokeWidth: 3,
//               propsForBackgroundLines:
//                 {
//                   stroke:
//                     'transparent',
//                 },
//             }}
//             style={
//               styles.chart
//             }
//           />

//           <View style={styles.statsBox}>
//             <View
//               style={
//                 styles.statItem
//               }>
//               <Text
//                 style={
//                   styles.statLabel
//                 }>
//                 Market Cap
//               </Text>

//               <Text
//                 style={
//                   styles.statValue
//                 }
//                 numberOfLines={1}>
//                 $
//                 {coin?.marketCap?.toLocaleString() ||
//                   'N/A'}
//               </Text>
//             </View>

//             <View
//               style={
//                 styles.statItem
//               }>
//               <Text
//                 style={
//                   styles.statLabel
//                 }>
//                 24h High
//               </Text>

//               <Text
//                 style={
//                   styles.statValue
//                 }>
//                 $
//                 {coin?.high24h?.toLocaleString()}
//               </Text>
//             </View>

//             <View
//               style={
//                 styles.statItem
//               }>
//               <Text
//                 style={
//                   styles.statLabel
//                 }>
//                 24h Low
//               </Text>

//               <Text
//                 style={
//                   styles.statValue
//                 }>
//                 $
//                 {coin?.low24h?.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles =
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor:
//         '#3B0A6B',
//     },

//     scrollContent: {
//       paddingHorizontal:
//         wp('4.5%'),
//       paddingBottom:
//         hp('4%'),
//       flexGrow: 1,
//     },

//     marketCard: {
//       backgroundColor:
//         '#cecdfa',
//       borderRadius:
//         moderateScale(28),
//       padding: wp('5%'),
//       marginTop: hp('2%'),
//       marginBottom: hp('4%'),
//     },

//     marketHeader: {
//       flexDirection:
//         'row',
//       justifyContent:
//         'space-between',
//       alignItems:
//         'flex-start',
//     },

//     marketCoinRow: {
//       flexDirection:
//         'row',
//       alignItems:
//         'center',
//       flex: 1,
//       paddingRight:
//         wp('3%'),
//     },

//     coinInfo: {
//       flex: 1,
//     },

//     marketCoinImage: {
//       width: wp('15%'),
//       height: wp('15%'),
//       borderRadius:
//         wp('7.5%'),
//       marginRight:
//         wp('4%'),
//     },

//     marketCoinName: {
//       fontSize:
//         moderateScale(
//           22,
//         ),
//       fontWeight:
//         '700',
//       color: '#111',
//     },

//     marketCoinSymbol: {
//       fontSize:
//         moderateScale(
//           14,
//         ),
//       color: '#777',
//       marginTop:
//         hp('0.5%'),
//     },

//     marketBadge: {
//       paddingHorizontal:
//         wp('4%'),
//       paddingVertical:
//         hp('1%'),
//       borderRadius:
//         moderateScale(
//           24,
//         ),
//     },

//     badgeText: {
//       fontWeight: '700',
//       fontSize:
//         moderateScale(
//           12,
//         ),
//     },

//     priceSection: {
//       marginTop:
//         hp('3.5%'),
//     },

//     marketPrice: {
//       fontSize:
//         moderateScale(
//           28,
//         ),
//       fontWeight:
//         '800',
//       color: '#000',
//     },

//     marketChange: {
//       marginTop:
//         hp('1%'),
//       fontSize:
//         moderateScale(
//           18,
//         ),
//       fontWeight:
//         '700',
//     },

//     chart: {
//       marginTop:
//         hp('3%'),
//       borderRadius:
//         moderateScale(
//           20,
//         ),
//       alignSelf:
//         'center',
//     },

//     statsBox: {
//       marginTop:
//         hp('4%'),
//       backgroundColor:
//         '#F7F8FA',
//       borderRadius:
//         moderateScale(
//           20,
//         ),
//       padding: wp('5%'),
//     },

//     statItem: {
//       marginBottom:
//         hp('2.2%'),
//     },

//     statLabel: {
//       fontSize:
//         moderateScale(
//           13,
//         ),
//       color: '#888',
//       marginBottom:
//         hp('0.6%'),
//     },

//     statValue: {
//       fontSize:
//         moderateScale(
//           17,
//         ),
//       fontWeight:
//         '700',
//       color: '#111',
//     },
//   });
// CryptoDetailsScreen.js

// CryptoDetailsScreen.js

// TradingScreen.js

// TradingScreen.js

// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import {
//   LineChart,
//   BarChart,
// } from 'react-native-gifted-charts';

// const { width } = Dimensions.get('window');

// export default function TradingScreen() {
//   const [chartType, setChartType] =
//     useState('line');

//   const [selectedTab, setSelectedTab] =
//     useState('1 day');

//   const lineData = [
//     { value: 74900 },
//     { value: 75020 },
//     { value: 74850 },
//     { value: 75120 },
//     { value: 75200 },
//     { value: 75100 },
//     { value: 75300 },
//     { value: 75220 },
//     { value: 75150 },
//     { value: 75082 },
//     { value: 75160 },
//     { value: 75220 },
//     { value: 75090 },
//     { value: 75087 },
//   ];

//   const candleData = [
//     {
//       value: 40,
//       frontColor: '#00C087',
//     },
//     {
//       value: 70,
//       frontColor: '#FF4D6D',
//     },
//     {
//       value: 55,
//       frontColor: '#00C087',
//     },
//     {
//       value: 85,
//       frontColor: '#FF4D6D',
//     },
//     {
//       value: 65,
//       frontColor: '#00C087',
//     },
//     {
//       value: 75,
//       frontColor: '#FF4D6D',
//     },
//     {
//       value: 90,
//       frontColor: '#00C087',
//     },
//     {
//       value: 50,
//       frontColor: '#FF4D6D',
//     },
//     {
//       value: 72,
//       frontColor: '#00C087',
//     },
//     {
//       value: 68,
//       frontColor: '#FF4D6D',
//     },
//     {
//       value: 78,
//       frontColor: '#00C087',
//     },
//     {
//       value: 52,
//       frontColor: '#FF4D6D',
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#0B1220', '#111827']}
//         style={styles.container}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingBottom: 60,
//           }}
//         >
//           {/* HEADER */}

//           <View style={styles.header}>
//             <TouchableOpacity>
//               <Icon
//                 name="menu"
//                 size={28}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <View style={styles.logoRow}>
//               <View style={styles.coinIcon}>
//                 <FontAwesome5
//                   name="bitcoin"
//                   size={18}
//                   color="#fff"
//                 />
//               </View>

//               <Text style={styles.logoText}>
//                 BTC/USDT
//               </Text>
//             </View>

//             <TouchableOpacity>
//               <Icon
//                 name="search"
//                 size={24}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* PRICE */}

//           <View style={styles.priceSection}>
//             <View>
//               <Text style={styles.price}>
//                 76,717.27
//               </Text>

//               <View style={styles.row}>
//                 <Text style={styles.subPrice}>
//                   INR
//                 </Text>

//                 <Text style={styles.loss}>
//                   {' '}
//                   -118.75
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.startBtn}
//             >
//               <Text style={styles.startText}>
//                 Get started
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* FULL CHART */}

//           <TouchableOpacity
//             style={styles.fullChartBtn}
//           >
//             <Icon
//               name="maximize-2"
//               size={20}
//               color="#fff"
//             />

//             <Text style={styles.fullChartText}>
//               Full chart
//             </Text>
//           </TouchableOpacity>

//           {/* GRAPH */}

//           <View style={styles.graphContainer}>
//             {chartType === 'candle' ? (
//               <BarChart
//                 data={candleData}
//                 width={width - 50}
//                 height={420}
//                 spacing={18}
//                 barWidth={14}
//                 roundedTop
//                 hideRules={false}
//                 hideYAxisText={false}
//                 yAxisColor="#374151"
//                 xAxisColor="#374151"
//                 rulesColor="#1F2937"
//                 xAxisLabelTextStyle={{
//                   color: '#8E98A7',
//                 }}
//                 yAxisTextStyle={{
//                   color: '#8E98A7',
//                 }}
//                 noOfSections={5}
//               />
//             ) : (
//               <LineChart
//                 areaChart
//                 curved
//                 data={lineData}
//                 height={420}
//                 width={width - 40}
//                 color="#FF4D6D"
//                 startFillColor="#FF4D6D"
//                 endFillColor="#FF4D6D"
//                 startOpacity={0.35}
//                 endOpacity={0.05}
//                 spacing={24}
//                 thickness={3}
//                 hideDataPoints={false}
//                 dataPointsColor="#FF4D6D"
//                 yAxisColor="#374151"
//                 xAxisColor="#374151"
//                 color1="#FF4D6D"
//                 textColor="#9CA3AF"
//                 hideRules={false}
//                 rulesColor="#1F2937"
//                 noOfSections={5}
//               />
//             )}
//           </View>

//           {/* SWITCH */}

//           <View style={styles.switchRow}>
//             <TouchableOpacity
//               style={[
//                 styles.switchBtn,
//                 chartType === 'line' &&
//                   styles.activeSwitch,
//               ]}
//               onPress={() =>
//                 setChartType('line')
//               }
//             >
//               <Icon
//                 name="trending-up"
//                 size={18}
//                 color={
//                   chartType === 'line'
//                     ? '#fff'
//                     : '#8E98A7'
//                 }
//               />

//               <Text
//                 style={[
//                   styles.switchText,
//                   chartType === 'line' &&
//                     styles.activeSwitchText,
//                 ]}
//               >
//                 Line
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.switchBtn,
//                 chartType === 'candle' &&
//                   styles.activeSwitch,
//               ]}
//               onPress={() =>
//                 setChartType('candle')
//               }
//             >
//               <Icon
//                 name="bar-chart-2"
//                 size={18}
//                 color={
//                   chartType === 'candle'
//                     ? '#fff'
//                     : '#8E98A7'
//                 }
//               />

//               <Text
//                 style={[
//                   styles.switchText,
//                   chartType === 'candle' &&
//                     styles.activeSwitchText,
//                 ]}
//               >
//                 Candle
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* TIME TABS */}

//           <View style={styles.tabs}>
//             {[
//               '1 day',
//               '5 days',
//               '1 month',
//               '6 months',
//             ].map(item => (
//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.tabBtn,
//                   selectedTab === item &&
//                     styles.activeTab,
//                 ]}
//                 onPress={() =>
//                   setSelectedTab(item)
//                 }
//               >
//                 <Text
//                   style={[
//                     styles.tabTitle,
//                     selectedTab === item &&
//                       styles.activeTabText,
//                   ]}
//                 >
//                   {item}
//                 </Text>

//                 <Text style={styles.tabPercent}>
//                   -0.12%
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* ABOUT */}

//           <View style={styles.aboutSection}>
//             <Text style={styles.aboutTitle}>
//               About Bitcoin
//             </Text>

//             <Text style={styles.aboutText}>
//               Bitcoin is a decentralized digital
//               currency that enables secure
//               peer-to-peer transactions without
//               banks or central authorities.
//             </Text>

//             <Text style={styles.aboutText}>
//               BTC prices move based on trading
//               activity, investor sentiment,
//               worldwide economic events, and
//               cryptocurrency market demand.
//             </Text>

//             <Text style={styles.aboutText}>
//               Bitcoin is widely used for trading,
//               investment, digital payments, and
//               blockchain innovation globally.
//             </Text>
//           </View>

//           {/* KEY DATA */}

//           <View style={styles.keyData}>
//             <Text style={styles.aboutTitle}>
//               Key data points
//             </Text>

//             <View style={styles.dataRow}>
//               <Text style={styles.dataLabel}>
//                 Volume
//               </Text>

//               <Text style={styles.dataValue}>
//                 8.61 M
//               </Text>
//             </View>

//             <View style={styles.dataRow}>
//               <Text style={styles.dataLabel}>
//                 Previous close
//               </Text>

//               <Text style={styles.dataValue}>
//                 75,200.85
//               </Text>
//             </View>

//             <View style={styles.dataRow}>
//               <Text style={styles.dataLabel}>
//                 Open
//               </Text>

//               <Text style={styles.dataValue}>
//                 74,806.49
//               </Text>
//             </View>

//             <View style={styles.dataRow}>
//               <Text style={styles.dataLabel}>
//                 Day range
//               </Text>

//               <Text style={styles.dataValue}>
//                 74,529 - 75,244
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B1220',
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingTop: 16,
//   },

//   logoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   coinIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: '#F7931A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },

//   logoText: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '700',
//   },

//   priceSection: {
//     paddingHorizontal: 18,
//     marginTop: 28,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   price: {
//     color: '#00C087',
//     fontSize: 48,
//     fontWeight: '800',
//   },

//   row: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },

//   subPrice: {
//     color: '#fff',
//     fontSize: 18,
//   },

//   loss: {
//     color: '#FF4D6D',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   startBtn: {
//     paddingHorizontal: 22,
//     paddingVertical: 14,
//     borderRadius: 16,
//     backgroundColor: '#4F46E5',
//   },

//   startText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },

//   fullChartBtn: {
//     marginTop: 30,
//     marginLeft: 18,
//     width: 160,
//     height: 52,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#374151',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   fullChartText: {
//     color: '#fff',
//     fontSize: 18,
//     marginLeft: 10,
//   },

//   graphContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },

//   switchRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 22,
//   },

//   switchBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 22,
//     paddingVertical: 12,
//     borderRadius: 14,
//     backgroundColor: '#111827',
//     marginHorizontal: 8,
//   },

//   activeSwitch: {
//     backgroundColor: '#2563EB',
//   },

//   switchText: {
//     color: '#8E98A7',
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   activeSwitchText: {
//     color: '#fff',
//   },

//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 32,
//     paddingHorizontal: 12,
//   },

//   tabBtn: {
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderRadius: 16,
//     backgroundColor: '#111827',
//     alignItems: 'center',
//   },

//   activeTab: {
//     backgroundColor: '#1F2937',
//   },

//   tabTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//   },

//   activeTabText: {
//     color: '#fff',
//   },

//   tabPercent: {
//     color: '#FF4D6D',
//     marginTop: 6,
//     fontSize: 15,
//     fontWeight: '600',
//   },

//   aboutSection: {
//     marginTop: 40,
//     paddingHorizontal: 18,
//   },

//   aboutTitle: {
//     color: '#fff',
//     fontSize: 34,
//     fontWeight: '800',
//     marginBottom: 18,
//   },

//   aboutText: {
//     color: '#D1D5DB',
//     fontSize: 18,
//     lineHeight: 30,
//     marginBottom: 18,
//   },

//   keyData: {
//     marginTop: 20,
//     paddingHorizontal: 18,
//     paddingBottom: 50,
//   },

//   dataRow: {
//     marginBottom: 28,
//   },

//   dataLabel: {
//     color: '#8E98A7',
//     fontSize: 16,
//   },

//   dataValue: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '700',
//     marginTop: 8,
//   },
// });
// TradingScreen.js

// TradingScreen.js

// TradingScreen.js

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Feather';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  LineChart,
  BarChart,
} from 'react-native-gifted-charts';

const {width} = Dimensions.get('window');

export default function TradingScreen({navigation}) {
  const [chartType, setChartType] =
    useState('candle');

  const [selectedTab, setSelectedTab] =
    useState('1D');

  const [btcPrice, setBtcPrice] =
    useState('0');

  const [time, setTime] =
    useState('');

  // LIVE IST TIME

  useEffect(() => {
    const interval = setInterval(() => {
      const ist =
        new Date().toLocaleTimeString(
          'en-IN',
          {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          },
        );

      setTime(ist);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // LIVE BTC PRICE

  useEffect(() => {
    fetchBTC();

    const interval = setInterval(() => {
      fetchBTC();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchBTC = async () => {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',
      );

      setBtcPrice(response.data.price);
    } catch (e) {
      console.log(e);
    }
  };

  // CANDLE DATA

  const candleData = [
    {value: 45, frontColor: '#00C087'},
    {value: 70, frontColor: '#FF4D6D'},
    {value: 58, frontColor: '#00C087'},
    {value: 82, frontColor: '#00C087'},
    {value: 63, frontColor: '#FF4D6D'},
    {value: 91, frontColor: '#00C087'},
    {value: 74, frontColor: '#00C087'},
    {value: 48, frontColor: '#FF4D6D'},
    {value: 86, frontColor: '#00C087'},
    {value: 66, frontColor: '#FF4D6D'},
    {value: 95, frontColor: '#00C087'},
    {value: 72, frontColor: '#00C087'},
    {value: 59, frontColor: '#FF4D6D'},
    {value: 88, frontColor: '#00C087'},
    {value: 76, frontColor: '#00C087'},
    {value: 69, frontColor: '#FF4D6D'},
    {value: 97, frontColor: '#00C087'},
    {value: 81, frontColor: '#00C087'},
  ];

  // LINE DATA

  const lineData = [
    {value: 74900},
    {value: 75100},
    {value: 74850},
    {value: 75300},
    {value: 75550},
    {value: 75220},
    {value: 75620},
    {value: 75100},
    {value: 75700},
    {value: 75450},
    {value: 75950},
    {value: 75520},
    {value: 76000},
    {value: 75800},
    {value: 76200},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#07111F', '#08131F']}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}>

          {/* HEADER */}

          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.coinIcon}>
                <FontAwesome5
                  name="bitcoin"
                  size={14}
                  color="#fff"
                />
              </View>

              <Text style={styles.logoText}>
                BTC/USDT
              </Text>
            </View>

            <Text style={styles.time}>
              IST {time}
            </Text>
          </View>

          {/* PRICE */}

          <View style={styles.priceSection}>
            <Text style={styles.price}>
              {Number(btcPrice).toFixed(2)}
            </Text>

            <View style={styles.row}>
              <Text style={styles.subPrice}>
                INR
              </Text>

              <Text style={styles.loss}>
                {' '}
                -118.75
              </Text>
            </View>
          </View>

          {/* FULL CHART */}

          <TouchableOpacity
            style={styles.fullChartBtn}
            activeOpacity={0.8}
            onPress={() =>
              console.log('Full Chart')
            }>
            <Icon
              name="maximize-2"
              size={16}
              color="#fff"
            />

            <Text style={styles.fullChartText}>
              Full chart
            </Text>
          </TouchableOpacity>

          {/* GRAPH */}

          <View style={styles.graphContainer}>
            {chartType === 'candle' ? (
              <BarChart
                data={candleData}
                width={width - 30}
                height={320}
                spacing={6}
                barWidth={6}
                roundedTop
                hideRules={false}
                hideYAxisText={false}
                yAxisColor="#1F2937"
                xAxisColor="#1F2937"
                rulesColor="#1F2937"
                noOfSections={5}
                initialSpacing={10}
                yAxisTextStyle={{
                  color: '#6B7280',
                  fontSize: 9,
                }}
                xAxisLabelTextStyle={{
                  color: '#6B7280',
                  fontSize: 9,
                }}
                showGradient
              />
            ) : (
              <LineChart
                areaChart
                curved
                data={lineData}
                height={320}
                width={width - 30}
                color="#00C087"
                startFillColor="#00C087"
                endFillColor="#00C087"
                startOpacity={0.25}
                endOpacity={0.02}
                spacing={20}
                thickness={3}
                hideDataPoints={false}
                dataPointsColor="#00C087"
                yAxisColor="#1F2937"
                xAxisColor="#1F2937"
                textColor="#6B7280"
                hideRules={false}
                rulesColor="#1F2937"
                noOfSections={5}
                yAxisTextStyle={{
                  color: '#6B7280',
                  fontSize: 9,
                }}
                animateOnDataChange
                animationDuration={500}
              />
            )}
          </View>

          {/* SWITCH BUTTON */}

          <View style={styles.switchRow}>
            <TouchableOpacity
              style={[
                styles.switchBtn,
                chartType === 'line' &&
                  styles.activeSwitch,
              ]}
              onPress={() =>
                setChartType('line')
              }>
              <Icon
                name="trending-up"
                size={14}
                color={
                  chartType === 'line'
                    ? '#fff'
                    : '#8E98A7'
                }
              />

              <Text
                style={[
                  styles.switchText,
                  chartType === 'line' &&
                    styles.activeSwitchText,
                ]}>
                Line
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switchBtn,
                chartType === 'candle' &&
                  styles.activeSwitch,
              ]}
              onPress={() =>
                setChartType('candle')
              }>
              <Icon
                name="bar-chart-2"
                size={14}
                color={
                  chartType === 'candle'
                    ? '#fff'
                    : '#8E98A7'
                }
              />

              <Text
                style={[
                  styles.switchText,
                  chartType === 'candle' &&
                    styles.activeSwitchText,
                ]}>
                Candle
              </Text>
            </TouchableOpacity>
          </View>

          {/* TIME TABS */}

          <View style={styles.tabs}>
            {['1H', '4H', '1D', '1W', '1M'].map(
              item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.tabBtn,
                    selectedTab === item &&
                      styles.activeTab,
                  ]}
                  onPress={() =>
                    setSelectedTab(item)
                  }>
                  <Text
                    style={[
                      styles.tabTitle,
                      selectedTab === item &&
                        styles.activeTabText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          {/* LIVE MARKET DATA */}

          <View style={styles.liveCard}>
            <Text style={styles.liveTitle}>
              Live Market Data
            </Text>

            <View style={styles.liveRow}>
              <Text style={styles.liveLabel}>
                Market Cap
              </Text>

              <Text style={styles.liveValue}>
                $1.52T
              </Text>
            </View>

            <View style={styles.liveRow}>
              <Text style={styles.liveLabel}>
                24h Volume
              </Text>

              <Text style={styles.liveValue}>
                $48.6B
              </Text>
            </View>

            <View style={styles.liveRow}>
              <Text style={styles.liveLabel}>
                Buy Orders
              </Text>

              <Text
                style={[
                  styles.liveValue,
                  {color: '#00C087'},
                ]}>
                68%
              </Text>
            </View>

            <View style={styles.liveRow}>
              <Text style={styles.liveLabel}>
                Sell Orders
              </Text>

              <Text
                style={[
                  styles.liveValue,
                  {color: '#FF4D6D'},
                ]}>
                32%
              </Text>
            </View>

            <View style={styles.liveRow}>
              <Text style={styles.liveLabel}>
                Holders
              </Text>

              <Text style={styles.liveValue}>
                54 Million+
              </Text>
            </View>
          </View>

          {/* ABOUT */}

          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>
              About Bitcoin
            </Text>

            <Text style={styles.aboutText}>
              Bitcoin is a decentralized digital
              currency that enables secure
              peer-to-peer transactions without
              banks or central authorities.
            </Text>

            <Text style={styles.aboutText}>
              Bitcoin was introduced in 2009 by
              Satoshi Nakamoto and became the
              first successful cryptocurrency.
            </Text>

            <Text style={styles.aboutText}>
              BTC prices change based on market
              demand, investor activity,
              trading volume, and global
              financial news.
            </Text>

            <Text style={styles.aboutText}>
              Bitcoin is widely used for
              trading, investing, and digital
              payments worldwide.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111F',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F7931A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  time: {
    color: '#8E98A7',
    fontSize: 12,
  },

  priceSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },

  price: {
    color: '#00C087',
    fontSize: 42,
    fontWeight: '800',
  },

  row: {
    flexDirection: 'row',
    marginTop: 6,
  },

  subPrice: {
    color: '#fff',
    fontSize: 16,
  },

  loss: {
    color: '#FF4D6D',
    fontSize: 16,
    fontWeight: '700',
  },

  fullChartBtn: {
    marginTop: 20,
    marginLeft: 16,
    width: 130,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullChartText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },

  graphContainer: {
    marginTop: 16,
    alignItems: 'center',
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },

  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#111827',
    marginHorizontal: 8,
  },

  activeSwitch: {
    backgroundColor: '#2563EB',
  },

  switchText: {
    color: '#8E98A7',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },

  activeSwitchText: {
    color: '#fff',
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 10,
  },

  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#111827',
  },

  activeTab: {
    backgroundColor: '#1F2937',
  },

  tabTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  activeTabText: {
    color: '#fff',
  },

  liveCard: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 16,
    padding: 16,
  },

  liveTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 18,
  },

  liveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  liveLabel: {
    color: '#8E98A7',
    fontSize: 14,
  },

  liveValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  aboutSection: {
    marginTop: 28,
    paddingHorizontal: 16,
  },

  aboutTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 18,
  },

  aboutText: {
    color: '#D1D5DB',
    fontSize: 15,
    lineHeight: 28,
    marginBottom: 16,
  },
});


