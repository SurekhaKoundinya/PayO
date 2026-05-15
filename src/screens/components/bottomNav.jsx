import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';


export default function BottomNav({ navigation, currentRoute }) {
  const insets = useSafeAreaInsets();

//   const goToTab = (screen) => {

//     // ⭐ Scan Button
//     console.log(screen,"screen1")
//     if (screen === 'ScanButton') {
//       navigation.navigate('SendScreen', { tab: 'scan' });
//       return;
//     }

   
//     if (screen === 'UserProfile') {
//       navigation.navigate('UserProfile');
//       return;
//     }

//     //  if (screen === 'Wallets') {
//     //   navigation.navigate('WalletScreen');
//     //   return;
//     // }

    
//     //  if (screen === 'Transactions') {
//     //   navigation.navigate('TransactionHistory');
//     //   return;
//     // }


     
//     //  if (screen === 'Home') {
//     //   navigation.navigate('Main');
//     //   return;
//     // }

// // const goToTab = (screen) => {
//     navigation.navigate('Main', { screen });
//   // };





//     navigation.navigate(screen);
//   };

const goToTab = (screen) => {

  console.log(screen, "screen1");

  // ⭐ Scan Button
  if (screen === 'ScanButton') {
    navigation.navigate('Main', { screen: 'Send', params: { tab: 'scan' } });
    return;
  }

  // ⭐ Navigate to tabs inside BottomTabs
  navigation.navigate('Main', { screen });
};
  const getColor = (route) =>
    currentRoute === route ? '#FF7FD8' : '#ccc';

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 10 }]}>

      {/* HOME */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Main')}>
        <Icon name="home" size={22} color={getColor('Home')} />
        <Text style={[
          styles.navLabel,
          currentRoute === 'Home' ? styles.navActive : styles.navInactive
        ]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* WALLETS */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Wallets')}>
        <Icon name="credit-card" size={22} color={getColor('Wallets')} />
        <Text style={[
          styles.navLabel,
          currentRoute === 'Wallets' ? styles.navActive : styles.navInactive
        ]}>
          Wallets
        </Text>
      </TouchableOpacity>

      {/* CENTER SCAN BUTTON */}
      <TouchableOpacity
        style={styles.centerIcon}
        onPress={() => goToTab('ScanButton')}
      >
        <Icon name="maximize" size={26} color="#fff" />
      </TouchableOpacity>

      {/* TRANSACTIONS */}
      <TouchableOpacity style={styles.navItem} onPress={() => goToTab('Transactions')}>
        <Icon name="repeat" size={22} color={getColor('Transactions')} />
        <Text style={[
          styles.navLabel,
          currentRoute === 'Transactions' ? styles.navActive : styles.navInactive
        ]}>
          Transactions
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}
    {/* <TouchableOpacity style={styles.navItem} onPress={() => goToTab('UserProfile')}>
  <Icon name="settings" size={22} color={getColor('Profile')} />
  <Text style={[
    styles.navLabel,
    currentRoute === 'Profile' ? styles.navActive : styles.navInactive
  ]}>
    Profile
  </Text>
</TouchableOpacity> */}

 <TouchableOpacity style={styles.navItem} onPress={() => goToTab('MarketScreen')}>
  <Icon name="trending-up" size={22} color={getColor('Market')} />
  <Text style={[
    styles.navLabel,
    currentRoute === 'Market' ? styles.navActive : styles.navInactive
  ]}>
    Market
  </Text>
</TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    height: 75,
    backgroundColor: '#2E1065',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    zIndex: 999,
    elevation: 15,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 20,
  },

  navLabel: {
    fontSize: 10,
    marginTop: 3,
  },

  navActive: {
    color: '#F472B6',
  },

  navInactive: {
    color: '#aaa',
  },

  centerIcon: {
    position: 'absolute',
    top: -30,

    width: 65,
    height: 65,
    borderRadius: 35,

    backgroundColor: '#7C3AED',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 20,
    zIndex: 1000,
  },
});
