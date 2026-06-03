import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import styles from './HelpCenterStyles';

const helpTopics = [
  {
    title: 'Bank Related Queries',
    icon: 'credit-card',
  },
  {
    title: 'Money Transfer Issues',
    icon: 'send',
  },
  {
    title: 'Wallet Related Issues',
    icon: 'briefcase',
  },
  {
    title: 'Market Related Queries',
    icon: 'trending-up',
  },
  {
    title: 'Profile Related Queries',
    icon: 'user',
  },
];

const HelpCenterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* HEADER */}

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

        {/* VIEW TICKETS */}

        <TouchableOpacity style={styles.ticketCard}>
          <View style={styles.ticketLeft}>
            <Icon
              name="file-text"
              size={22}
              color="#fff"
            />

            <Text style={styles.ticketText}>
              View All Tickets
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {/* RECENT ISSUE */}

        <Text style={styles.sectionTitle}>
          Need help with a recent transaction?
        </Text>

        <TouchableOpacity
          style={styles.transactionCard}
        >
          <Text style={styles.transactionName}>
            Money Transfer Failed
          </Text>

          <Text style={styles.transactionDate}>
            29 June 2026
          </Text>

          <Text style={styles.transactionAmount}>
            ₹1,000
          </Text>
        </TouchableOpacity>

        {/* HELP TOPICS */}

        <Text style={styles.sectionTitle}>
          Help Topics
        </Text>

        {helpTopics.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topicRow}
          >
            <View style={styles.topicLeft}>

              <Icon
                name={item.icon}
                size={20}
                color="#fff"
              />

              <Text style={styles.topicText}>
                {item.title}
              </Text>

            </View>

            <Icon
              name="chevron-right"
              size={18}
              color="#ccc"
            />
          </TouchableOpacity>
        ))}

        {/* CONTACT SUPPORT */}

        <View style={styles.supportContainer}>

          <Text style={styles.supportTitle}>
            Need further assistance?
          </Text>

          <Text style={styles.supportSubtitle}>
            We are here to help you.
          </Text>

          <TouchableOpacity
            style={styles.contactButton}
          >
            <Text style={styles.contactButtonText}>
              Contact Support
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
};

export default HelpCenterScreen;