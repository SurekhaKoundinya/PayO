





import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import styles from '../HomeScreen/homeStyling';
import Header from './header';
import BottomNav from './bottomNav';
import LinearGradient from 'react-native-linear-gradient';
import EnterAmountScreen from '../HomeScreen/EnterAmountScreen';
import Recents from '../HomeScreen/Recents';
import Icon from 'react-native-vector-icons/Feather';
import { AppThemeBackground } from '../../styles/main';

export default function SendScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [selectedUser, setSelectedUser] = useState(null);

  // const [activeTab, setActiveTab] = useState('scan');
  // const [selectedUser, setSelectedUser] = useState(null);
console.log(route,"99")
useEffect(() => {
  if (route?.params?.tab) {
    setActiveTab(route.params.tab);
  }
}, [route]);

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'scan':
        return 'Scan QR send tokens instantly';

      case 'address':
        return 'Enter address and send tokens';

      case 'recents':
        return 'Send tokens to recent contacts';

      case 'amount':
        return 'Enter Payo Tokens';

      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <ScanQRScreen
            setSelectedUser={setSelectedUser}
            setActiveTab={setActiveTab}
          />
        );

      case 'address':
        return <EnterAddressScreen navigation={navigation} />;

      case 'amount':
        return (
          <EnterAmountScreen
            name={selectedUser?.name}
            address={selectedUser?.address}
            setActiveTab={setActiveTab}
            navigation={navigation}
          />
        );

      case 'recents':
        return (
          <Recents
            navigation={navigation}
            setSelectedUser={setSelectedUser}
            setActiveTab={setActiveTab}
          />
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
    colors={AppThemeBackground.gradientColors}
    start={AppThemeBackground.gradientStart}
    end={AppThemeBackground.gradientEnd}
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === 'android'
            ? StatusBar.currentHeight
            : 0,
      }}
    >
      <Header />

      {activeTab !== 'amount' && (
        <>
          {/* Header Title + Back Button */}
          <View style={localStyles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={localStyles.backButton}
            >
              <Icon
                name="chevron-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>
              {getHeaderTitle()}
            </Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => setActiveTab('scan')}
            >
              <Text
                style={
                  activeTab === 'scan'
                    ? styles.activeTab
                    : styles.tab
                }
              >
                Scan QR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('address')}
            >
              <Text
                style={
                  activeTab === 'address'
                    ? styles.activeTab
                    : styles.tab
                }
              >
                Enter Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('recents')}
            >
              <Text
                style={
                  activeTab === 'recents'
                    ? styles.activeTab
                    : styles.tab
                }
              >
                Recents
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.content}>
        {renderContent()}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <View style={{ flex: 1 }}>
          <BottomNav
            navigation={navigation}
            currentRoute="Scan"
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  backButton: {
    marginRight: 10,
    padding: 4,
  },
});