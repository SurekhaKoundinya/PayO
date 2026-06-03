
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import styles from './HelpCenterStyles';

export default function HelpCenterScreen({ navigation }) {

  const [selectedCategory, setSelectedCategory] =
    useState('');

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Help Center
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.sectionTitle}>
          Select Issue Category
        </Text>

        {[
          'Bank Related Issues',
          'Money Transfer Issues',
          'Wallet Related Issues',
          'Market Related Queries',
          'Profile Related Queries',
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryCard,
              selectedCategory === item &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setSelectedCategory(item)
            }
          >
            <Text style={styles.categoryText}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>
          Issue Title
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter issue title"
          placeholderTextColor="#999"
        />

        <Text style={styles.sectionTitle}>
          Describe Your Issue
        </Text>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={5}
          placeholder="Explain your issue in detail..."
          placeholderTextColor="#999"
        />

        <Text style={styles.sectionTitle}>
          Upload Evidence
        </Text>

        <TouchableOpacity
          style={styles.uploadButton}
        >
          <Icon
            name="paperclip"
            size={18}
            color="#fff"
          />

          <Text style={styles.uploadText}>
            Attach Image / PDF
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Additional Notes
        </Text>

        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          placeholder="Enter additional notes..."
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>
            Submit Query
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}