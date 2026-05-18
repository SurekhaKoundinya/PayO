import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import styles from './BankAccInitStyles';
import Icon from "react-native-vector-icons/Feather";

export default function BankAccInit({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Text style={styles.back}>
            <Icon name="chevron-left" size={28} color="#000000" />     
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Add Bank Account</Text>

      </View>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Securely link your bank account{"\n"}
        to send and receive money
      </Text>

      {/* ICON */}
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>🏦</Text>
      </View>

      {/* FEATURES */}
      <View style={styles.featureContainer}>

        <View style={styles.featureRow}>
          <View style={styles.circle}>
            <Text style={styles.circleIcon}>✔</Text>
          </View>
          <View>
            <Text style={styles.featureTitle}>100% Secure</Text>
            <Text style={styles.featureDesc}>
              Your data is safe with us
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.circle}>
            <Text style={styles.circleIcon}>⚡</Text>
          </View>
          <View>
            <Text style={styles.featureTitle}>Instant Verification</Text>
            <Text style={styles.featureDesc}>
              Quick account verification
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.circle}>
            <Text style={styles.circleIcon}>💸</Text>
          </View>
          <View>
            <Text style={styles.featureTitle}>Easy Payments</Text>
            <Text style={styles.featureDesc}>
              Send & receive money instantly
            </Text>
          </View>
        </View>

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddBankDetails')}
      >
        <Text style={styles.buttonText}>
          Add New Bank Account
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}