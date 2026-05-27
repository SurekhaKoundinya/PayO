import React, { useEffect } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import PayoLogo from './PayoLogo';

export default function AnimationScreen({
  navigation,
}) {

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };

  }, [navigation]);

  return (
    <View style={styles.container}>
      <PayoLogo />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#5A00D1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },

});