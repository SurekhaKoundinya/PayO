

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  PanResponder,
  Animated,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line as SvgLine } from 'react-native-svg';
import {
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
import api from '../../api/axios';

const { width: screenWidth } = Dimensions.get('window');

export default function CoinDetailsScreen({ route }) {
  // State
  const [selectedTF, setSelectedTF] = useState("1D");
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [candleData, setCandleData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipValue, setTooltipValue] = useState(null);
  
  // Zoom and Pan states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);
  
  const scale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const lastTranslateX = useRef(0);
  const maxTranslateX = useRef(0);
  const minTranslateX = useRef(0);

  const symbol = `${route?.params?.coin?.symbol?.toUpperCase()}USDT`;
  
  // Responsive chart size
  const chartHeight = hp('34%');
  const chartWidth = wp('78%');

  useEffect(() => {
    fetchCoinData();
    fetchMarketData();
  }, [symbol]);

  useEffect(() => {
    if (coinData && selectedTF) {
      updateChartData();
      generateCandleData();
    }
  }, [selectedTF, coinData]);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/trading/market/${symbol}`);
      const result = response.data;
      if (result.success) {
        setCoinData(result.data);
        updateChartData(result.data, selectedTF);
        generateCandleData(result.data, selectedTF);
      }
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await api.get(`/api/trading/coin/${symbol}`);
      const result = response.data;
      if (result.success) {
        setMarketData(result?.data);
      }
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  const updateChartData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    let actualTimeframe = timeframe.toLowerCase();
    
    if (timeframe === "1D") {
      actualTimeframe = "1h";
    } else if (timeframe === "1W" || timeframe === "1M") {
      actualTimeframe = "1d";
    }

    const timeframeData = data.timeframes[actualTimeframe];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    
    const formattedData = ma7Data?.map((item) => ({
      timestamp: item.time,
      value: item.value,
      date: new Date(item.time),
    }));

    setChartData(formattedData);
    
    // Reset zoom and pan when timeframe changes
    resetZoomAndPan();
  };

  const generateCandleData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    let actualTimeframe = timeframe.toLowerCase();
    
    if (timeframe === "1D") {
      actualTimeframe = "1h";
    } else if (timeframe === "1W" || timeframe === "1M") {
      actualTimeframe = "1d";
    }

    const timeframeData = data.timeframes[actualTimeframe];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    const high = timeframeData.high;
    const low = timeframeData.low;
    
    const candles = [];
    for (let i = 0; i < ma7Data.length; i++) {
      const currentClose = ma7Data[i].value;
      const prevClose = i > 0 ? ma7Data[i - 1].value : currentClose * 0.998;
      
      const open = prevClose;
      const close = currentClose;
      const volatility = (high - low) * 0.15;
      const highPrice = Math.max(open, close) + (Math.random() * volatility);
      const lowPrice = Math.min(open, close) - (Math.random() * volatility);
      
      candles.push({
        timestamp: ma7Data[i].time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(Math.min(highPrice, high).toFixed(2)),
        low: parseFloat(Math.max(lowPrice, low).toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
    }
    
    setCandleData(candles);
    resetZoomAndPan();
  };

  const resetZoomAndPan = () => {
    scale.setValue(1);
    translateX.setValue(0);
    lastScale.current = 1;
    lastTranslateX.current = 0;
    setZoomLevel(1);
    setPanOffset(0);
  };

  const handleChartTouch = (event, index, point) => {
    const { locationX, locationY } = event.nativeEvent;
    setTooltipVisible(true);
    setTooltipPosition({ x: locationX, y: locationY - hp('5%') });
    setTooltipValue(point);
    setSelectedPoint(index);
    
    setTimeout(() => {
      setTooltipVisible(false);
      setSelectedPoint(null);
    }, 3000);
  };

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newScale = lastScale.current * event.nativeEvent.scale;
      
      if (newScale < 1) {
        newScale = 1;
      }
      if (newScale > 4) {
        newScale = 4;
      }
      
      lastScale.current = newScale;
      scale.setValue(lastScale.current);
      setZoomLevel(lastScale.current);
      
      // Update max translate constraints based on zoom level
      const maxPan = (chartWidth * (lastScale.current - 1)) / 2;
      maxTranslateX.current = maxPan;
      minTranslateX.current = -maxPan;
      
      // Clamp current translation
      if (lastTranslateX.current > maxTranslateX.current) {
        lastTranslateX.current = maxTranslateX.current;
        translateX.setValue(lastTranslateX.current);
      } else if (lastTranslateX.current < minTranslateX.current) {
        lastTranslateX.current = minTranslateX.current;
        translateX.setValue(lastTranslateX.current);
      }
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => zoomLevel > 1,
    
    onPanResponderGrant: () => {
      translateX.setOffset(lastTranslateX.current);
      translateX.setValue(0);
    },
    
    onPanResponderMove: (evt, gestureState) => {
      if (zoomLevel > 1) {
        let newTranslateX = gestureState.dx;
        
        // Apply constraints
        if (newTranslateX > maxTranslateX.current) {
          newTranslateX = maxTranslateX.current;
        } else if (newTranslateX < minTranslateX.current) {
          newTranslateX = minTranslateX.current;
        }
        
        translateX.setValue(newTranslateX);
      }
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      translateX.flattenOffset();
      lastTranslateX.current += gestureState.dx;
      
      // Clamp final position
      if (lastTranslateX.current > maxTranslateX.current) {
        lastTranslateX.current = maxTranslateX.current;
        translateX.setValue(lastTranslateX.current);
      } else if (lastTranslateX.current < minTranslateX.current) {
        lastTranslateX.current = minTranslateX.current;
        translateX.setValue(lastTranslateX.current);
      }
      
      setPanOffset(lastTranslateX.current);
    },
  });

  const getCubicBezierPath = (points, minValue, maxValue, graphHeight, graphWidth) => {
    if (points.length < 2) return '';
    
    const valueRange = maxValue - minValue;
    
    const getX = (index) => {
      return (index / (points.length - 1)) * graphWidth;
    };
    
    const getY = (value) => {
      return graphHeight - ((value - minValue) / valueRange) * graphHeight;
    };
    
    let path = `M ${getX(0)} ${getY(points[0].value)}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      const x0 = getX(i - 1);
      const y0 = getY(prev.value);
      const x1 = getX(i);
      const y1 = getY(curr.value);
      
      const cp1x = x0 + (x1 - x0) * 0.4;
      const cp1y = y0;
      const cp2x = x1 - (x1 - x0) * 0.4;
      const cp2y = y1;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
    }
    
    return path;
  };

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);

    if (selectedTF === "1H") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    if (selectedTF === "4H") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });
    }

    if (selectedTF === "1D") {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      
      if (minutes === 0) {
        return `${hour12}${ampm}`;
      }
      return `${hour12}:${minutes?.toString()?.padStart(2, '0')}${ampm}`;
    }

    if (selectedTF === "1W") {
      return date.getDate().toString();
    }

    if (selectedTF === "1M") {
      const dayOfMonth = date.getDate();
      if (dayOfMonth <= 3 || dayOfMonth >= 28) {
        return date?.toLocaleString("en-US", { month: "short" });
      }
      return dayOfMonth.toString();
    }

    return "";
  };

  const getXAxisLabels = () => {
    if (!chartData.length) return [];

    if (selectedTF === "1D") {
      const labels = [];
      const dataLength = chartData.length;
      const indices = [
        0,
        Math.floor(dataLength * 0.2),
        Math.floor(dataLength * 0.4),
        Math.floor(dataLength * 0.6),
        Math.floor(dataLength * 0.8),
        dataLength - 1
      ];
      
      indices.forEach((index) => {
        if (index < dataLength && chartData[index]) {
          labels.push(chartData[index]);
        }
      });
      
      return labels;
    }
    
    if (selectedTF === "1W") {
      const labels = [];
      const dataLength = chartData.length;
      const daysToShow = Math.min(7, dataLength);
      
      for (let i = 0; i < daysToShow; i++) {
        const index = dataLength - daysToShow + i;
        if (index >= 0 && chartData[index]) {
          labels.push(chartData[index]);
        }
      }
      return labels;
    }
    
    if (selectedTF === "1M") {
      const labels = [];
      const dataLength = chartData.length;
      const step = Math.max(1, Math.floor(dataLength / 7));
      
      for (let i = 0; i < Math.min(8, dataLength); i++) {
        const index = Math.min(dataLength - 1 - (i * step), dataLength - 1);
        if (index >= 0 && chartData[index]) {
          labels.unshift(chartData[index]);
        }
      }
      return labels.slice(0, 8);
    }
    
    const labels = [];
    const dataLength = chartData.length;
    const targetCount = selectedTF === "1H" ? 6 : 5;
    const step = Math.max(1, Math.floor(dataLength / (targetCount - 1)));
    
    for (let i = 0; i < targetCount; i++) {
      const index = Math.min(i * step, dataLength - 1);
      if (chartData[index]) {
        labels.push(chartData[index]);
      }
    }
    return labels;
  };

  const renderSmoothLineChart = () => {
    if (!chartData.length) return null;

    const graphHeight = chartHeight - hp('2.5%');
    const graphWidth = chartWidth * zoomLevel;
    const visibleWidth = chartWidth;

    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const isProfit = chartData[chartData.length - 1].value > chartData[0].value;
    const lineColor = isProfit ? "#00C853" : "#FF4D6D";

    const smoothPath = getCubicBezierPath(chartData, minValue, maxValue, graphHeight, graphWidth);
    const firstX = 0;
    const lastX = graphWidth;
    const bottomY = graphHeight;
    const fillPath = `${smoothPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = getXAxisLabels();

    return (
      <View style={{ marginTop: hp('1.5%') }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'space-between', height: chartHeight, marginRight: wp('2%'), width: wp('12%') }}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={{ color: "#6B7280", fontSize: moderateScale(10), textAlign: 'right' }}>
                ${price}
              </Text>
            ))}
          </View>

          <View style={{ flex: 1, overflow: 'hidden' }}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View
                {...(zoomLevel > 1 ? panResponder.panHandlers : {})}
                style={{
                  transform: [
                    { scale: scale },
                    { translateX: translateX },
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    if (zoomLevel === 1) {
                      const touchX = e.nativeEvent.locationX;
                      const pointIndex = Math.floor((touchX / visibleWidth) * chartData.length);
                      if (pointIndex >= 0 && pointIndex < chartData.length) {
                        handleChartTouch(e, pointIndex, chartData[pointIndex]);
                      }
                    }
                  }}
                >
                  <Defs>
                    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                      <Stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
                    </LinearGradient>
                  </Defs>

                  {yAxisValues.map((_, index) => {
                    const y = (index / 4) * graphHeight;
                    return (
                      <SvgLine
                        key={`grid-${index}`}
                        x1={0}
                        y1={y}
                        x2={graphWidth}
                        y2={y}
                        stroke="#1F2937"
                        strokeWidth={1}
                        strokeDasharray="5,5"
                      />
                    );
                  })}

                  <Path d={fillPath} fill="url(#gradient)" />
                  <Path
                    d={smoothPath}
                    stroke={lineColor}
                    strokeWidth={moderateScale(3)}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {chartData.map((point, index) => {
                    if (selectedPoint === index && tooltipVisible && zoomLevel === 1) {
                      const valueRange = maxValue - minValue;
                      const x = (index / (chartData.length - 1)) * visibleWidth;
                      const y = graphHeight - ((point.value - minValue) / valueRange) * graphHeight;
                      
                      return (
                        <Circle
                          key={`point-${index}`}
                          cx={x}
                          cy={y}
                          r={moderateScale(6)}
                          fill="#FCD535"
                          stroke={lineColor}
                          strokeWidth="2"
                        />
                      );
                    }
                    return null;
                  })}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {tooltipVisible && tooltipValue && zoomLevel === 1 && (
              <View
                style={[
                  styles.tooltip,
                  {
                    position: 'absolute',
                    left: Math.max(10, Math.min(tooltipPosition.x - 50, visibleWidth - 110)),
                    top: tooltipPosition.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  ${tooltipValue?.value?.toLocaleString()}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(tooltipValue.timestamp)}
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}

            {/* Zoom indicator */}
            {zoomLevel > 1 && (
              <View style={styles.zoomIndicator}>
                <Text style={styles.zoomIndicatorText}>
                  Zoom: {zoomLevel.toFixed(1)}x
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ marginLeft: wp('10%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', paddingRight: 0 }}>
          {xAxisLabels.map((item, index) => {
            const labelText = formatXAxis(item.timestamp);
            const isMonthName = selectedTF === "1M" && (labelText.length <= 3);
            
            return (
              <Text
                key={index}
                style={[
                  isMonthName ? styles.xAxisLabelMonth : styles.xAxisLabel,
                  {
                    fontSize: selectedTF === "1D" ? moderateScale(10) : moderateScale(11),
                    fontWeight: isMonthName ? '600' : '400',
                    textAlign: 'center',
                    flex: 1,
                  }
                ]}
                numberOfLines={1}
              >
                {labelText}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCandlestickChart = () => {
    if (!candleData.length) return null;

    const graphHeight = chartHeight - hp('2.5%');
    const graphWidth = chartWidth * zoomLevel;
    const visibleWidth = chartWidth;

    const allValues = candleData.flatMap(d => [d.high, d.low]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue;

    const getYCoordinate = (value) => {
      return graphHeight - ((value - minValue) / valueRange) * graphHeight;
    };

    const getXCoordinate = (index, totalWidth) => {
      const candleWidth = (totalWidth / candleData.length) * 0.7;
      const candleSpacing = (totalWidth / candleData.length) * 0.3;
      return (index * (candleWidth + candleSpacing)) + (candleSpacing / 2);
    };

    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = getXAxisLabels();

    return (
      <View style={{ marginTop: hp('1.5%') }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'space-between', height: chartHeight, marginRight: wp('2%'), width: wp('12%') }}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={{ color: "#6B7280", fontSize: moderateScale(10), textAlign: 'right' }}>
                ${price}
              </Text>
            ))}
          </View>

          <View style={{ flex: 1, overflow: 'hidden' }}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View
                {...(zoomLevel > 1 ? panResponder.panHandlers : {})}
                style={{
                  transform: [
                    { scale: scale },
                    { translateX: translateX },
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    if (zoomLevel === 1) {
                      const touchX = e.nativeEvent.locationX;
                      const candleIndex = Math.floor((touchX / visibleWidth) * candleData.length);
                      if (candleIndex >= 0 && candleIndex < candleData.length) {
                        handleChartTouch(e, candleIndex, candleData[candleIndex]);
                      }
                    }
                  }}
                >
                  {yAxisValues.map((_, index) => {
                    const y = (index / 4) * graphHeight;
                    return (
                      <SvgLine
                        key={`grid-${index}`}
                        x1={0}
                        y1={y}
                        x2={graphWidth}
                        y2={y}
                        stroke="#1F2937"
                        strokeWidth={1}
                        strokeDasharray="5,5"
                      />
                    );
                  })}

                  {candleData?.map((candle, index) => {
                    const x = getXCoordinate(index, graphWidth);
                    const yHigh = getYCoordinate(candle.high);
                    const yLow = getYCoordinate(candle.low);
                    const yOpen = getYCoordinate(candle.open);
                    const yClose = getYCoordinate(candle.close);

                    const isPositive = candle.close >= candle.open;
                    const bodyTop = isPositive ? yClose : yOpen;
                    const bodyHeight = Math.abs(yClose - yOpen);
                    const color = isPositive ? "#00C853" : "#FF4D6D";

                    return (
                      <React.Fragment key={`candle-${index}`}>
                        <SvgLine
                          x1={x + (graphWidth / candleData.length) * 0.35}
                          y1={yHigh}
                          x2={x + (graphWidth / candleData.length) * 0.35}
                          y2={yLow}
                          stroke={color}
                          strokeWidth={1.5}
                        />
                        <SvgLine
                          x1={x}
                          y1={bodyTop}
                          x2={x + (graphWidth / candleData.length) * 0.7}
                          y2={bodyTop}
                          stroke={color}
                          strokeWidth={bodyHeight}
                        />
                      </React.Fragment>
                    );
                  })}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {tooltipVisible && tooltipValue && zoomLevel === 1 && (
              <View
                style={[
                  styles.tooltip,
                  {
                    position: 'absolute',
                    left: Math.max(10, Math.min(tooltipPosition.x - 60, visibleWidth - 130)),
                    top: tooltipPosition.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  Open: ${tooltipValue.open}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  Close: ${tooltipValue.close}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(tooltipValue.timestamp)}
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}

            {/* Zoom indicator */}
            {zoomLevel > 1 && (
              <View style={styles.zoomIndicator}>
                <Text style={styles.zoomIndicatorText}>
                  Zoom: {zoomLevel.toFixed(1)}x
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ marginLeft: wp('10%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', paddingRight: 0 }}>
          {xAxisLabels.map((item, index) => {
            const labelText = formatXAxis(item.timestamp);
            const isMonthName = selectedTF === "1M" && (labelText.length <= 3);
            
            return (
              <Text
                key={index}
                style={[
                  isMonthName ? styles.xAxisLabelMonth : styles.xAxisLabel,
                  {
                    fontSize: selectedTF === "1D" ? moderateScale(10) : moderateScale(11),
                    fontWeight: isMonthName ? '600' : '400',
                    textAlign: 'center',
                    flex: 1,
                  }
                ]}
                numberOfLines={1}
              >
                {labelText}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  const getCurrentPrice = () => {
    if (!coinData) return 0;
    return coinData.currentPrice;
  };

  const getPriceChange = () => {
    if (!coinData) return 0;
    return coinData.priceChangePercent24h;
  };

  const getHigh24h = () => {
    if (!coinData) return 0;
    return coinData.high24h;
  };

  const getLow24h = () => {
    if (!coinData) return 0;
    return coinData.low24h;
  };

  const getVolume = () => {
    if (!coinData) return '0';
    const volume = coinData.volume24h;
    if (volume > 1000000) {
      return `${(volume / 1000000).toFixed(2)}M`;
    }
    if (volume > 1000) {
      return `${(volume / 1000).toFixed(2)}K`;
    }
    return volume.toString();
  };

  const getOpenPrice = () => {
    if (!coinData) return '0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData && timeframeData.movingAverages?.MA7?.length > 0) {
      return timeframeData.movingAverages.MA7[0].value.toFixed(2);
    }
    return '0';
  };

  const getPrevClose = () => {
    if (!coinData) return '0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData && timeframeData.movingAverages?.MA7?.length > 1) {
      return timeframeData.movingAverages.MA7[
        timeframeData.movingAverages.MA7.length - 2
      ].value.toFixed(2);
    }
    return '0';
  };

  const getDayRange = () => {
    if (!coinData) return '0 - 0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData) {
      return `${timeframeData.low.toFixed(2)} - ${timeframeData.high.toFixed(2)}`;
    }
    return '0 - 0';
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FCD535" />
      </SafeAreaView>
    );
  }

  if (!coinData) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.coinRow}>
            <Image
              source={{ uri: route?.params?.coin?.image || `https://assets.coingecko.com/coins/images/1/large/bitcoin.png` }}
              style={styles.coinImage}
            />
            <View>
              <Text style={styles.coinSymbol}>{coinData.symbol}/USDT</Text>
              <Text style={styles.coinName}>{coinData.symbol}</Text>
            </View>
          </View>

          <View style={styles.tradeButtons}>
            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.tradeText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sellBtn}>
              <Text style={styles.tradeText}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.price}>
          ${getCurrentPrice()?.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.change,
            { color: getPriceChange() < 0 ? "#FF4D6D" : "#00C853" },
          ]}
        >
          {getPriceChange() > 0 ? '+' : ''}{getPriceChange().toFixed(2)}%
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>24h High</Text>
            <Text style={styles.statValue}>${getHigh24h()?.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>24h Low</Text>
            <Text style={styles.statValue}>${getLow24h()?.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{getVolume()}</Text>
          </View>
        </View>

        <View style={styles.timeframeContainer}>
          {["1D", "1W", "1M"]?.map((tf) => (
            <TouchableOpacity
              key={tf}
              onPress={() => {
                setSelectedTF(tf);
                setTooltipVisible(false);
                setSelectedPoint(null);
              }}
              style={[
                styles.timeframeButton,
                selectedTF === tf && styles.timeframeButtonActive
              ]}
            >
              <Text style={[
                styles.timeframeText,
                selectedTF === tf && styles.timeframeTextActive
              ]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

       

        {chartType === "line" ? renderSmoothLineChart() : renderCandlestickChart()}

         <View style={styles.chartTypeContainer}>
          <TouchableOpacity onPress={() => setChartType("line")}>
            <Text style={[styles.chartTypeText, chartType === "line" && styles.chartTypeTextActive]}>Line Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChartType("candle")}>
            <Text style={[styles.chartTypeText, chartType === "candle" && styles.chartTypeTextActive]}>Candlestick</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Key Data Points</Text>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Previous Close</Text>
            <Text style={styles.dataValue}>${getPrevClose()}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Open</Text>
            <Text style={styles.dataValue}>${getOpenPrice()}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Day Range</Text>
            <Text style={styles.dataValue}>${getDayRange()}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Volume</Text>
            <Text style={styles.dataValue}>{getVolume()} BTC</Text>
          </View>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.dataTitle}>Trading History</Text>

          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.25 BTC</Text>
            <Text style={styles.historyPrice}>${getCurrentPrice()?.toLocaleString()}</Text>
          </View>

          <View style={styles.historyRow}>
            <Text style={[styles.historyType, { color: "#FF4D6D" }]}>SELL</Text>
            <Text style={styles.historyAmount}>0.10 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.95)?.toLocaleString()}</Text>
          </View>

          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.30 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.92)?.toLocaleString()}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.dataTitleDescription}>About {coinData.symbol}</Text>
          <Text style={styles.descriptionText}>
            {marketData?.description
              ? marketData.description
              : `${coinData.symbol} is a cryptocurrency that operates on blockchain technology, enabling secure, decentralized, and fast digital transactions across the world.`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
    paddingHorizontal: wp('4%'),
     paddingBottom: hp('4%'),
      paddingTop: hp('4%'),
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4D6D',
    fontSize: moderateScale(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('3%'),
    borderRadius: wp('5%'),
  },
  coinSymbol: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  coinName: {
    color: '#6B7280',
    fontSize: moderateScale(14),
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  buyBtn: {
    backgroundColor: '#00C853',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: moderateScale(8),
  },
  sellBtn: {
    backgroundColor: '#FF4D6D',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: moderateScale(8),
  },
  tradeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  price: {
    color: '#fff',
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  change: {
    fontSize: moderateScale(16),
    marginTop: hp('0.5%'),
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2.5%'),
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1F2937',
  },
  statLabel: {
    color: '#6B7280',
    fontSize: moderateScale(12),
    marginBottom: hp('0.5%'),
  },
  statValue: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  timeframeContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  timeframeButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#1F2937',
    borderRadius: moderateScale(8),
  },
  timeframeButtonActive: {
    backgroundColor: '#FCD535',
  },
  timeframeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  timeframeTextActive: {
    color: '#000',
  },
chartTypeContainer: {
  flexDirection: 'row',
  marginTop: hp('2%'),
  gap: wp('4%'),
  justifyContent: 'center',
  alignItems: 'center',
},
  chartTypeText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
  chartTypeTextActive: {
    color: '#FCD535',
    fontWeight: '600',
  },
  xAxisLabel: {
    color: '#9CA3AF',
    fontSize: moderateScale(11),
  },
  xAxisLabelMonth: {
    color: '#FCD535',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  tooltip: {
    backgroundColor: '#1A1F2E',
    borderRadius: moderateScale(8),
    padding: wp('2%'),
    minWidth: wp('25%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD535',
  },
  tooltipText: {
    color: '#FCD535',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  tooltipSubtext: {
    color: '#6B7280',
    fontSize: moderateScale(10),
    marginTop: hp('0.3%'),
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FCD535',
  },
  zoomIndicator: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('2%'),
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(4),
  },
  zoomIndicatorText: {
    color: '#FCD535',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  dataCard: {
    marginTop: hp('3%'),
    padding: wp('4%'),
    backgroundColor: '#1A1F2E',
    borderRadius: moderateScale(12),
  },
  dataTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  dataTitleDescription: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  dataLabel: {
    color: '#6B7280',
    fontSize: moderateScale(14),
  },
  dataValue: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  historyCard: {
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    padding: wp('4%'),
    backgroundColor: '#1A1F2E',
    borderRadius: moderateScale(12),
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  historyType: {
    color: '#00C853',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  historyAmount: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  historyPrice: {
    color: '#6B7280',
    fontSize: moderateScale(14),
  },
  descriptionText: {
    color: "#D1D5DB",
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
});
