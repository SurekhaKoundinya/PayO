import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import api from "../../api/axios"; // ✅ your existing axios instance
import Icon from "react-native-vector-icons/Feather";
import { AppThemeBackground } from '../../styles/main';
export default function NotificationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Today");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchNotifications();
  }, []);
 
  // ✅ API CALL HERE (using your axios instance)
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications/notifications");
      setData(res.data);
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const filterData = () => {
    const now = new Date();
 
    return data.filter((item) => {
      const itemDate = new Date(item.date);
 
      if (activeTab === "Today") {
        return itemDate.toDateString() === now.toDateString();
      }
 
      if (activeTab === "This Week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      }
 
      if (activeTab === "Earlier") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate < weekAgo;
      }
 
      return true;
    });
  };
 
  // ✅ REMOVE NOTIFICATION (UI ONLY)
  const removeItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
 
  // ✅ RENDER CARD
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
 
        {/* LEFT SIDE */}
        <View style={styles.left}>
          <View style={styles.dot} />
 
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.message}</Text>
          </View>
        </View>
 
        {/* RIGHT SIDE */}
        <View style={styles.right}>
          <Text style={styles.time}>{item.time}</Text>
 
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.close}>×</Text>
          </TouchableOpacity>
        </View>
 
      </View>
    </View>
  );
 
  return (
  <LinearGradient
    colors={AppThemeBackground.gradientColors}
    start={AppThemeBackground.gradientStart}
    end={AppThemeBackground.gradientEnd}
    style={{ flex: 1 }}
  >
      <SafeAreaView style={styles.container}>
 
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>

<Icon name="chevron-left" size={28} color="#ffffff" />            </Text>
          </TouchableOpacity>
 
          <Text style={styles.headerTitle}>Notifications</Text>
 
          <TouchableOpacity>
            <Text style={styles.mark}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
 
        {/* TABS */}
        <View style={styles.tabs}>
          {["Today", "This Week", "Earlier"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && { color: "#000" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
 
        {/* LIST */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filterData()}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 15 }}
            showsVerticalScrollIndicator={false}
          />
        )}
 
      </SafeAreaView>
    </LinearGradient>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
 
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
 
  back: {
    color: "#fff",
    fontSize: 18,
  },
 
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
 
  mark: {
    color: "#ccc",
    fontSize: 12,
  },
 
  tabs: {
    flexDirection: "row",
    backgroundColor: "#4c1d95",
    borderRadius: 10,
    marginTop: 15,
  },
 
  tabBtn: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
 
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
 
  tabText: {
    color: "#fff",
    fontSize: 12,
  },
 
  card: {
    backgroundColor: "#7b2ff7",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
  },
 
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
 
  left: {
    flexDirection: "row",
    flex: 1,
  },
 
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
 
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    marginTop: 6,
  },
 
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
 
  subtitle: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 2,
  },
 
  time: {
    color: "#ccc",
    fontSize: 10,
  },
 
  close: {
    color: "#fff",
    fontSize: 16,
  },
});