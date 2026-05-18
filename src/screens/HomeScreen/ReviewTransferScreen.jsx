import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Switch,
  Platform,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import api from "../../api/axios";
import { AppThemeBackground } from '../../styles/main';
import Icon from 'react-native-vector-icons/Feather';
export default function ReviewTransferScreen({ route, navigation }) {
  const { receiver, amount, address, sender ,show,isRecent} = route.params;
  console.log(isRecent,"00")
 
  const [save, setSave] = useState(false);
  const [selfUser, setSelfUser] = useState("");
 
  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await api.get("api/wallet/generate-address");
        const data = res.data;
 
        console.log("API RESPONSE:", data);
        setSelfUser(data || "No Address");
      } catch (err) {
        console.log("QR ERROR:", err.response?.data || err.message);
        setSelfUser("");
      }
    };
 
    fetchQr();
  }, []);
 
  // ✅ ADDED: handle confirm with save logic
  const handleConfirm = async () => {
    try {
      if (save) {
        await api.post("/api/wallet/recent-toggle-add", {
          receiverName: receiver?.name,
          walletAddress: address,
        });
      }
 
      navigation.navigate("SendPin", {
        amount,
        name: receiver?.name,
        address,
        sender
      });
    } catch (error) {
      console.log("Save recent error:", error.response?.data || error.message);
    }
  };
 
  return (
    <LinearGradient
    colors={AppThemeBackground.gradientColors}
    start={AppThemeBackground.gradientStart}
    end={AppThemeBackground.gradientEnd}
    style={styles.container}
  >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
 
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => navigation.goBack()}>
          
            <Icon name="chevron-left" size={28} color="#ffffff" /> 

          </TouchableOpacity>
 
          <Text style={styles.headerTitle}>
            Review your Detail Transfer
          </Text>
        </View>
 
        {/* AVATAR */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {receiver?.name?.[0] || "U"}
          </Text>
        </View>
 
        {/* AMOUNT */}
        <Text style={styles.labelCenter}>Total Tokens</Text>
        <Text style={styles.amount}>
          {amount} <Text style={styles.payo}>PAYO</Text>
        </Text>
 
        {/* FROM */}
        <View style={styles.section}>
          <Text style={styles.small}>From</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{sender?.name}</Text>
            <Text style={styles.wallet}>{sender?.wallet}</Text>
          </View>
        </View>
 
        <View style={styles.divider} />
 
        {/* TO */}
        <View style={styles.section}>
          <Text style={styles.small}>To</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{receiver?.name}</Text>
            <Text style={styles.wallet}>{address}</Text>
          </View>
        </View>
 
        <View style={styles.divider} />
 
        {/* SAVE TO RECENTS */}
      <View style={[styles.rowBetween, isRecent && { opacity: 0.5 }]}>
  <Text style={styles.saveText}>Save to Recents</Text>
  <Switch
    value={save}
    onValueChange={setSave}
    disabled={isRecent}   // disables switch when isRecent is true
    trackColor={{ false: "#999", true: "#fff" }}
    thumbColor={save ? "#6A00F4" : "#fff"}
  />
</View>
 
        <View style={styles.divider} />
 
        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleConfirm}  // ✅ UPDATED
        >
          <Text style={styles.buttonText}>Confirm and send</Text>
        </TouchableOpacity>
 
      </SafeAreaView>
    </LinearGradient>
  );
}
 
/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
 
  header: {
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
 
  cancelContainer: {
    position: "absolute",
    left: 0,
    top: 0,
  },
 
  cancel: {
    color: "#fff",
    fontSize: 16,
  },
 
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    marginLeft:"10%"
  },
 
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ddd",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
 
  avatarText: {
    fontSize: 22,
    fontWeight: "600",
  },
 
  labelCenter: {
    color: "#ccc",
    textAlign: "center",
  },
 
  amount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },
 
  payo: {
    color: "#00FFAA",
    fontSize: 16,
  },
 
  section: {
    marginBottom: 10,
  },
 
  small: {
    color: "#aaa",
    marginBottom: 5,
  },
 
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
 
  name: {
    color: "#fff",
    fontSize: 16,
    textTransform:"capitalize",
    width:"40%"
  },
 
  wallet: {
    color: "#ccc",
  },
 
  divider: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 15,
  },
 
  saveText: {
    color: "#fff",
    fontSize: 15,
  },
 
  button: {
    backgroundColor: "#0B8A2A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
 
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
 