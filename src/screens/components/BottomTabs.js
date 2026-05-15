import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../HomeScreen/HomeScreen';
import styles from '../HomeScreen/homeStyling';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import UserProfile from '../UserProfile/UserProfile';
import MarketScreen from '../Market/market';


const Tab = createBottomTabNavigator();

// 🔥 Custom Bottom Tab Bar
function CustomTabBar({ state, navigation }) {

 const labels = {
  Home: "Home",
  Wallets: "Wallets",
  Transactions: "Transactions",
  UserProfile: "Profile",
  MarketScreen: "Market"
};

  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        let icon;

        if (route.name === "Home") icon = "home";
        if (route.name === "Wallets") icon = "credit-card";
        if (route.name === "Transactions") icon = "repeat";
        if (route.name === "UserProfile") icon = "settings";
          if (route.name === "MarketScreen") icon = "trending-up";

        // ⭐ Center Button
        if (route.name === "Send") {
  return (
    <TouchableOpacity
      key={route.name}
      style={styles.centerIcon}
      onPress={() =>
        navigation.navigate("Send", { tab: "scan" }) // ✅ force scan tab
      }
    >
      <Icon name="maximize" size={24} color="#fff" />
    </TouchableOpacity>
  );
}
        return (
          <TouchableOpacity
            key={route.name}
            style={styles.navItem}
            onPress={onPress}
          >
            <Icon
              name={icon}
              size={20}
              color={isFocused ? '#FF7FD8' : '#ccc'}
            />

            <Text
              style={[
                styles.navLabel,
                isFocused ? styles.navActive : styles.navInactive,
              ]}
            >
              {labels[route.name] || route.name}
            </Text>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}


// 🔥 Main Bottom Tabs
export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallets" component={WalletScreen} />
      <Tab.Screen name="Send" component={SendScreen} />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
      <Tab.Screen name="MarketScreen"
       component={MarketScreen}
        />
    </Tab.Navigator>
  );
}