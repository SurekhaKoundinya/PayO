import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default function ReviewTransferScreen({
  route,
  navigation,
}) {
  const {
    receiver,
    amount,
    address,
    sender,
    show,
    isRecent,
  } = route.params;

  const [save, setSave] =
    useState(false);

  const [selfUser, setSelfUser] =
    useState('');

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await api.get(
          'api/wallet/generate-address',
        );

        const data = res.data;

        setSelfUser(
          data || 'No Address',
        );
      } catch (err) {
        console.log(
          'QR ERROR:',
          err.response?.data ||
            err.message,
        );

        setSelfUser('');
      }
    };

    fetchQr();
  }, []);

  const handleConfirm =
    async () => {
      try {
        if (save) {
          await api.post(
            '/api/wallet/recent-toggle-add',
            {
              receiverName:
                receiver?.name,
              walletAddress:
                address,
            },
          );
        }

        navigation.navigate(
          'SendPin',
          {
            amount,
            name:
              receiver?.name,
            address,
            sender,
          },
        );
      } catch (error) {
        console.log(
          'Save recent error:',
          error.response
            ?.data ||
            error.message,
        );
      }
    };

  return (
    <LinearGradient
      colors={[
        '#6A00F4',
        '#1A0033',
      ]}
      style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scrollContent
          }>
          {/* HEADER */}
          <View
            style={
              styles.header
            }>
            <TouchableOpacity
              style={
                styles.cancelContainer
              }
              onPress={() =>
                navigation.goBack()
              }>
              <Icon
                name="chevron-left"
                size={moderateScale(
                  28,
                )}
                color="#ffffff"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.headerTitle
              }>
              Review your Detail
              Transfer
            </Text>
          </View>

          {/* AVATAR */}
          <View
            style={
              styles.avatar
            }>
            <Text
              style={
                styles.avatarText
              }>
              {receiver?.name?.[0] ||
                'U'}
            </Text>
          </View>

          {/* AMOUNT */}
          <Text
            style={
              styles.labelCenter
            }>
            Total Tokens
          </Text>

          <Text
            style={
              styles.amount
            }>
            {amount}{' '}
            <Text
              style={
                styles.payo
              }>
              PAYO
            </Text>
          </Text>

          {/* FROM */}
          <View
            style={
              styles.section
            }>
            <Text
              style={
                styles.small
              }>
              From
            </Text>

            <View
              style={
                styles.rowBetween
              }>
              <Text
                style={
                  styles.name
                }
                numberOfLines={
                  1
                }>
                {sender?.name}
              </Text>

              <Text
                style={
                  styles.wallet
                }
                numberOfLines={
                  2
                }>
                {sender?.wallet}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.divider
            }
          />

          {/* TO */}
          <View
            style={
              styles.section
            }>
            <Text
              style={
                styles.small
              }>
              To
            </Text>

            <View
              style={
                styles.rowBetween
              }>
              <Text
                style={
                  styles.name
                }
                numberOfLines={
                  1
                }>
                {receiver?.name}
              </Text>

              <Text
                style={
                  styles.wallet
                }
                numberOfLines={
                  2
                }>
                {address}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.divider
            }
          />

          {/* SAVE */}
          <View
            style={[
              styles.rowBetween,
              isRecent && {
                opacity: 0.5,
              },
            ]}>
            <Text
              style={
                styles.saveText
              }>
              Save to Recents
            </Text>

            <Switch
              value={save}
              onValueChange={
                setSave
              }
              disabled={
                isRecent
              }
              trackColor={{
                false:
                  '#999',
                true:
                  '#fff',
              }}
              thumbColor={
                save
                  ? '#6A00F4'
                  : '#fff'
              }
            />
          </View>

          <View
            style={
              styles.divider
            }
          />

          {/* BUTTON */}
          <TouchableOpacity
            style={
              styles.button
            }
            onPress={
              handleConfirm
            }>
            <Text
              style={
                styles.buttonText
              }>
              Confirm and send
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
    },

    safeArea: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
      paddingHorizontal:
        wp('5%'),
      paddingBottom:
        hp('5%'),
    },

    header: {
      marginTop:
        hp('1%'),
      marginBottom:
        hp('4%'),
      justifyContent:
        'center',
      alignItems:
        'center',
      minHeight:
        hp('6%'),
      position:
        'relative',
    },

    cancelContainer: {
      position:
        'absolute',
      left: 0,
    },

    headerTitle: {
      color: '#fff',
      fontWeight: '700',
      fontSize:
        moderateScale(
          18,
        ),
      textAlign:
        'center',
      maxWidth: '75%',
    },

    avatar: {
      width:
        moderateScale(
          90,
        ),
      height:
        moderateScale(
          90,
        ),
      borderRadius:
        moderateScale(
          45,
        ),
      backgroundColor:
        '#ddd',
      alignSelf:
        'center',
      justifyContent:
        'center',
      alignItems:
        'center',
      marginBottom:
        hp('2.5%'),
      elevation: 5,
    },

    avatarText: {
      fontSize:
        moderateScale(
          22,
        ),
      fontWeight:
        '600',
    },

    labelCenter: {
      color: '#ccc',
      textAlign:
        'center',
      fontSize:
        moderateScale(
          13,
        ),
    },

    amount: {
      color: '#fff',
      fontSize:
        moderateScale(
          30,
        ),
      fontWeight:
        '700',
      textAlign:
        'center',
      marginBottom:
        hp('3%'),
    },

    payo: {
      color: '#00FFAA',
      fontSize:
        moderateScale(
          16,
        ),
    },

    section: {
      marginBottom:
        hp('1%'),
    },

    small: {
      color: '#aaa',
      marginBottom:
        hp('0.7%'),
      fontSize:
        moderateScale(
          12,
        ),
    },

    rowBetween: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'flex-start',
    },

    name: {
      color: '#fff',
      fontSize:
        moderateScale(
          16,
        ),
      textTransform:
        'capitalize',
      width: '40%',
    },

    wallet: {
      color: '#ccc',
      width: '55%',
      textAlign:
        'right',
      fontSize:
        moderateScale(
          12,
        ),
    },

    divider: {
      height: 1,
      backgroundColor:
        '#555',
      marginVertical:
        hp('2%'),
    },

    saveText: {
      color: '#fff',
      fontSize:
        moderateScale(
          15,
        ),
    },

    button: {
      backgroundColor:
        '#0B8A2A',
      paddingVertical:
        hp('2%'),
      borderRadius:
        moderateScale(
          12,
        ),
      alignItems:
        'center',
      marginTop:
        hp('3%'),
    },

    buttonText: {
      color: '#fff',
      fontWeight:
        '600',
      fontSize:
        moderateScale(
          16,
        ),
    },
  });