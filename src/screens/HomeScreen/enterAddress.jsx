
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";

import styles from "./enterAddressStyling";
import { useRoute } from "@react-navigation/native";
import api from "../../api/axios";

export default function EnterAddressScreen({ navigation }) {
  const route = useRoute();

  const [activeTab, setActiveTab] = useState("address");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverData, setReceiverData] = useState(null);
  const [loading, setLoading] = useState(false);
   const[avaliable,setAvaliable] =useState("");
   const[message,setMessage]=useState("");

  useEffect(() => {
    if (route.params?.address) setAddress(route.params.address);
    if (route.params?.tab) setActiveTab(route.params.tab);
  }, [route.params]);

  // 🔥 FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      if (!address || address.length < 5) {
        setReceiverData(null);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/api/wallet/user/${address}`);
        setReceiverData(res.data);
      } catch {
        setReceiverData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [address]);

 


  // 🔥 PREVIEW TRANSFER
const handleNext = async () => {
  if (!address || !receiverData?.walletAddress) {
    alert("Enter valid wallet address");
    return;
  }

  try {
    const res = await api.post("/api/wallet/transfer/preview", {
      toAddress: address,
      amount: amount,
    });

    console.log("PREVIEW RESPONSE 👉", res.data);

   navigation.navigate("review", {
  receiver: res?.data?.receiver,
  address: res?.data?.address,
  amount: res?.data?.amount,
  sender: res?.data?.sender,
  isRecent:res?.data?.isRecent
  
});

  } catch (err) {
    console.log( err?.response?.data);
    setMessage(err?.response?.data?.message)
   
  }
};


   useEffect(() => {
  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance'); // ✅ await هنا

      

      // adjust based on API
      setAvaliable(response?.data?.balance || "0");

    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  fetchBalance();
}, []);

  return (
    // <LinearGradient
    //   colors={["#6A00F4", "#1A0033"]}
    //   style={{ flex: 1 }}
    // >
      <SafeAreaView style={styles.container}>

        {/* ADDRESS */}
        <Text style={styles.label}>Recipient Wallet Address</Text>
        <TextInput
          placeholder="PXY21209E..."
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        {/* USER NAME */}
        {loading ? (
          <Text style={styles.infoText}>Checking...</Text>
        ) : receiverData ? (
          <Text>
             <Text style={{color:"white"}}>UserName :</Text>  <Text style={styles.successText}> {receiverData.name}</Text>
          </Text>
       
        ) : address.length > 5 ? (
          <Text style={styles.errorText}>User not found</Text>
        ) : null}

        {/* TOKENS */}
        <Text style={styles.label}>Tokens</Text>
        <View style={styles.amountRow}>
   <TextInput
  placeholder="0"
  placeholderTextColor="#aaa"
  value={amount}
  onChangeText={(text) => {

    // remove all characters except numbers and dot
    let cleaned = text.replace(/[^0-9.]/g, "");

    const parts = cleaned.split(".");
    const integerPart = parts[0];

    // ❌ If integer part already 6 digits → block decimal
    if (integerPart.length > 6) return;

    if (integerPart.length === 6 && cleaned.includes(".")) {
      cleaned = integerPart; // remove decimal
    }

    // allow max 2 digits after decimal
    const regex = /^\d{0,6}(\.\d{0,2})?$/;

    if (regex.test(cleaned)) {
      setAmount(cleaned);
      setMessage("");
    }

  }}
  style={styles.amountInput}
  keyboardType="numeric"
/>
          <Text style={styles.token}>PAYO</Text>
        </View>

        {message ? <Text style={{color:"#ff0000"}}>{message}</Text>:""}

        {/* QUICK BUTTONS */}
        <View style={styles.quickRow}>
          {[100, 300, 500, 700].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.quickBtn}
              onPress={() => setAmount(val.toString())}
            >
              <Text style={styles.quickText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BALANCE */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>Available balance</Text>
          <Text style={styles.balanceAmount}>{avaliable} PAYO</Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Review and send</Text>
        </TouchableOpacity>

      </SafeAreaView>
    // </LinearGradient>
  );
}
