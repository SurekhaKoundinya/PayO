import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../HomeScreen/HomeScreen';
import styles from '../HomeScreen/homeStyling';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import MarketScreen from '../Market/market';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  const labels = {
    Home: 'Home',
    Wallets: 'Wallets',
    Transactions: 'Transactions',
    MarketScreen: 'Market',
  };

  return (
    <View
      style={[
        styles.bottomNav,
        {
          paddingBottom:
            insets.bottom > 0
              ? insets.bottom + moderateScale(8)
              : moderateScale(12),

          minHeight:
            insets.bottom > 0
              ? moderateScale(72) + insets.bottom
              : moderateScale(78),
        },
      ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let icon = '';

        if (route.name === 'Home') icon = 'home';
        if (route.name === 'Wallets') icon = 'credit-card';
        if (route.name === 'Transactions') icon = 'repeat';
        if (route.name === 'MarketScreen') icon = 'trending-up';

        if (route.name === 'Send') {
          return (
            <TouchableOpacity
              key={route.name}
              style={[
                styles.centerIcon,
                {
                  bottom:
                    insets.bottom > 0
                      ? moderateScale(22)
                      : moderateScale(18),
                },
              ]}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Send', {
                  tab: 'scan',
                })
              }>
              <Icon
                name="maximize"
                size={moderateScale(24)}
                color="#fff"
              />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(route.name)
            }>
            <Icon
              name={icon}
              size={moderateScale(20)}
              color={isFocused ? '#F472B6' : '#aaa'}
            />

            <Text
              style={[
                styles.navLabel,
                isFocused
                  ? styles.navActive
                  : styles.navInactive,
              ]}>
              {labels[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <CustomTabBar {...props} />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Wallets"
        component={WalletScreen}
      />

      <Tab.Screen
        name="Send"
        component={SendScreen}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionHistory}
      />

      <Tab.Screen
        name="MarketScreen"
        component={MarketScreen}
      />
    </Tab.Navigator>
  );
}