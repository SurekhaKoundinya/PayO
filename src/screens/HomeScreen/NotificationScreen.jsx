import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
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

export default function NotificationScreen({
  navigation,
}) {
  const [activeTab, setActiveTab] =
    useState('Today');

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await api.get(
            '/api/notifications/notifications',
          );

        setData(res.data);
      } catch (err) {
        console.log(
          'API ERROR:',
          err,
        );
      } finally {
        setLoading(false);
      }
    };

  const filterData = () => {
    const now = new Date();

    return data.filter((item) => {
      const itemDate =
        new Date(item.date);

      if (activeTab === 'Today') {
        return (
          itemDate.toDateString() ===
          now.toDateString()
        );
      }

      if (
        activeTab === 'This Week'
      ) {
        const weekAgo =
          new Date();

        weekAgo.setDate(
          now.getDate() - 7,
        );

        return itemDate >= weekAgo;
      }

      if (
        activeTab === 'Earlier'
      ) {
        const weekAgo =
          new Date();

        weekAgo.setDate(
          now.getDate() - 7,
        );

        return itemDate < weekAgo;
      }

      return true;
    });
  };

  const removeItem = (id) => {
    setData((prev) =>
      prev.filter(
        (item) =>
          item.id !== id,
      ),
    );
  };

  const renderItem = ({
    item,
  }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.dot} />

          <View
            style={
              styles.textBlock
            }>
            <Text
              style={
                styles.title
              }
              numberOfLines={
                2
              }>
              {item.title}
            </Text>

            <Text
              style={
                styles.subtitle
              }
              numberOfLines={
                3
              }>
              {item.message}
            </Text>
          </View>
        </View>

        <View
          style={
            styles.right
          }>
          <Text
            style={
              styles.time
            }>
            {item.time}
          </Text>

          <TouchableOpacity
            onPress={() =>
              removeItem(
                item.id,
              )
            }>
            <Text
              style={
                styles.close
              }>
              ×
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[
        '#6a11cb',
        '#3a0ca3',
      ]}
      style={styles.gradient}>
      <SafeAreaView
        style={
          styles.container
        }
        edges={[
          'top',
          'bottom',
        ]}>
        <View
          style={styles.header}>
          <TouchableOpacity
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
            Notifications
          </Text>

          <TouchableOpacity>
            <Text
              style={
                styles.mark
              }>
              Mark all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          {[
            'Today',
            'This Week',
            'Earlier',
          ].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab ===
                  tab &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setActiveTab(
                  tab,
                )
              }>
              <Text
                style={[
                  styles.tabText,
                  activeTab ===
                    tab &&
                    styles.activeText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{
              marginTop:
                hp('3%'),
            }}
          />
        ) : (
          <FlatList
            data={filterData()}
            keyExtractor={(
              item,
            ) =>
              item?.id?.toString()
            }
            renderItem={
              renderItem
            }
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingTop:
                hp('2%'),
              paddingBottom:
                hp('4%'),
            }}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles =
  StyleSheet.create({
    gradient: {
      flex: 1,
    },

    container: {
      flex: 1,
      paddingHorizontal:
        wp('4%'),
    },

    header: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      minHeight:
        hp('7%'),
    },

    headerTitle: {
      color: '#fff',
      fontSize:
        moderateScale(
          18,
        ),
      fontWeight:
        'bold',
      flex: 1,
      textAlign:
        'center',
      marginHorizontal:
        wp('2%'),
    },

    mark: {
      color: '#ccc',
      fontSize:
        moderateScale(
          11,
        ),
    },

    tabs: {
      flexDirection:
        'row',
      backgroundColor:
        '#4c1d95',
      borderRadius:
        moderateScale(
          10,
        ),
      marginTop:
        hp('2%'),
      overflow:
        'hidden',
    },

    tabBtn: {
      flex: 1,
      paddingVertical:
        hp('1.5%'),
      alignItems:
        'center',
    },

    activeTab: {
      backgroundColor:
        '#fff',
    },

    tabText: {
      color: '#fff',
      fontSize:
        moderateScale(
          11,
        ),
      textAlign:
        'center',
    },

    activeText: {
      color: '#000',
      fontWeight:
        '600',
    },

    card: {
      backgroundColor:
        '#7b2ff7',
      padding:
        wp('4%'),
      borderRadius:
        moderateScale(
          14,
        ),
      marginBottom:
        hp('1.5%'),
    },

    row: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
    },

    left: {
      flexDirection:
        'row',
      flex: 1,
      paddingRight:
        wp('3%'),
    },

    textBlock: {
      flex: 1,
    },

    right: {
      alignItems:
        'flex-end',
      justifyContent:
        'space-between',
      minWidth:
        wp('12%'),
    },

    dot: {
      width:
        moderateScale(
          8,
        ),
      height:
        moderateScale(
          8,
        ),
      backgroundColor:
        '#fff',
      borderRadius:
        moderateScale(
          4,
        ),
      marginRight:
        wp('3%'),
      marginTop:
        hp('0.7%'),
    },

    title: {
      color: '#fff',
      fontWeight:
        'bold',
      fontSize:
        moderateScale(
          14,
        ),
    },

    subtitle: {
      color: '#ddd',
      fontSize:
        moderateScale(
          12,
        ),
      marginTop:
        hp('0.3%'),
    },

    time: {
      color: '#ccc',
      fontSize:
        moderateScale(
          10,
        ),
    },

    close: {
      color: '#fff',
      fontSize:
        moderateScale(
          18,
        ),
    },
  });