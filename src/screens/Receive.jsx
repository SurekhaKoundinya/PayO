


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
} from "react-native";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-clipboard/clipboard";
import api from "../api/axios";
import { AppThemeBack } from '../../styles/main';
import BottomNav from "./components/bottomNav";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native";
import { AppThemeBackground } from "../styles/main";

const Receive = ({ navigation }) => {
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState("");
  const [timer, setTimer] = useState(900);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  // ================= FETCH QR =================
  const fetchQr = async () => {
    try {
      setLoading(true);

      const res = await api.get("api/wallet/generate-address");
      const data = res.data;

      const qrImage = data.qr?.startsWith("data:image")
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address || "No Address");

      setTimer(900);
      setLoading(false);
    } catch (err) {
      console.log("QR ERROR:", err.response?.data || err.message);
      setQr(null);
      setAddress("");
      setTimer(0);
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchQr();
  }, []);

  // ================= TIMER =================
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // ================= AUTO REFRESH =================
  useEffect(() => {
    if (timer === 0 && !loading) {
      fetchQr();
    }
  }, [timer]);

  // ================= COPY =================
  const handleCopy = () => {
    Clipboard.setString(address);

    if (Platform.OS === "android") {
      ToastAndroid.show("Address copied", ToastAndroid.SHORT);
    } else {
      Alert.alert("Copied", "Address copied");
    }
  };

  // ================= SHARE =================
  const handleShare = async () => {
    try {
      if (!qr) return;

      const base64Data = qr.replace(/^data:image\/png;base64,/, "");
      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(filePath, base64Data, "base64");

      await Share.open({
        url: "file://" + filePath,
        message: `Send PAYO to this address:\n${address}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  // ================= TIMER FORMAT =================
  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

 return (
  <LinearGradient
    colors={AppThemeBackground.gradientColors}
    start={AppThemeBackground.gradientStart}
    end={AppThemeBackground.gradientEnd}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
<Icon name="chevron-left" size={28} color="#ffffff" />          </TouchableOpacity>

          <Text style={styles.header}>Receive</Text>
        </View>

        {/* QR */}
        <View style={styles.qrContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#6A0DAD" />
          ) : qr ? (
            <Image source={{ uri: qr }} style={styles.qrImage} />
          ) : (
            <Text style={styles.errorText}>Failed to load QR</Text>
          )}
        </View>

        {/* ADDRESS CARD */}
        <View style={styles.addressCard}>
          <Text style={styles.label}>WALLET ADDRESS</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy}>
            <Icon name="copy" size={18} color="#fff" />
            <Text style={styles.actionText}> Copy address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Icon name="share-2" size={18} color="#fff" />
            <Text style={styles.actionText}> Share address</Text>
          </TouchableOpacity>
        </View>

        {/* TIMER */}
        <Text style={styles.timer}>QR expires in {formatTime()} sec</Text>

        {/* REGENERATE */}
        <TouchableOpacity onPress={fetchQr}>
          <Text style={styles.regenerate}>Regenerate</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  </LinearGradient>
);
};

export default Receive;

const styles = StyleSheet.create({

container:{
flexGrow:1,
alignItems:"center",
// paddingTop:20,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

paddingBottom:130
},

headerRow:{
width:"100%",
height:60,
justifyContent:"center",
alignItems:"center",
position:"relative"
},

backBtn:{
position:"absolute",
left:20
},

header:{
fontSize:20,
fontWeight:"600",
color:"#fff"
},

qrContainer:{
backgroundColor:"#F2F2F2",
padding:18,
borderRadius:26,
width:260,
height:260,
justifyContent:"center",
alignItems:"center",
marginTop:40,
marginBottom:30
},

qrImage:{
width:220,
height:220
},

addressCard:{
width:"86%",
backgroundColor:"#7C3AED",
padding:18,
borderRadius:14,
borderWidth:1,
borderColor:"#C4B5FD",
borderStyle:"dashed",
marginBottom:25
},

label:{
fontSize:12,
color:"#E9D5FF",
marginBottom:6
},

address:{
fontSize:14,
fontWeight:"600",
color:"#fff"
},

buttonRow:{
flexDirection:"row",
justifyContent:"space-between",
width:"86%",
marginBottom:30
},

actionBtn:{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
backgroundColor:"#8B5CF6",
paddingVertical:12,
paddingHorizontal:20,
borderRadius:12,
flex:1,
marginHorizontal:6
},

actionText:{
color:"#fff",
fontSize:14,
fontWeight:"500"
},

timer:{
color:"#E9D5FF",
fontSize:14,
marginBottom:12
},

regenerate:{
color:"#E9D5FF",
fontSize:14,
textDecorationLine:"underline"
},

errorText:{
color:"#ccc"
}

});