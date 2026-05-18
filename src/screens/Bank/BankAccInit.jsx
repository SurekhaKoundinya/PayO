import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './BankAccInitStyles';

export default function BankAccInit({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>navigation.navigate('UserProfile')}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Add Bank Account</Text>
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
        onPress={() => navigation.navigate('AddBankDetails')}   // ✅ FIXED HERE
      >
        <Text style={styles.buttonText}>
          Add New Bank Account
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}