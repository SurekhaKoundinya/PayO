import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import Header from './header';
import LinearGradient from 'react-native-linear-gradient';
import EnterAmountScreen from '../HomeScreen/EnterAmountScreen';
import Recents from '../HomeScreen/Recents';
import Icon from 'react-native-vector-icons/Feather';
import SendTabs from './SendTabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function SendScreen({
  navigation,
  route,
}) {
  const [activeTab, setActiveTab] =
    useState('scan');

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

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
        return (
          <EnterAddressScreen
            navigation={navigation}
          />
        );

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
      colors={['#6A00F4', '#120022']}
      style={styles.gradient}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}>
        <Header />

        {activeTab !== 'amount' && (
          <>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.goBack()
                }>
                <Icon
                  name="chevron-left"
                  size={moderateScale(28)}
                  color="#ffffff"
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>
                {getHeaderTitle()}
              </Text>
            </View>

            <SendTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        )}

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : 'height'
          }>
          <View style={styles.content}>
            {renderContent()}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('1%'),
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(17),
    fontWeight: '500',
    marginLeft: wp('3%'),
    flex: 1,
  },
});