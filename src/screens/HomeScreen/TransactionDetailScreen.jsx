import React, { useEffect, useState, useRef } from "react";

import {

    View,

    Text,

    TouchableOpacity,

    ActivityIndicator,

    Alert,
    ToastAndroid,

} from "react-native";

import { useRoute } from "@react-navigation/native";

import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/Feather";

import api from "../../api/axios";

import styles from "./TransactionDetailStyles";

import { Share } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

// ✅ NEW IMPORTS

import ViewShot from "react-native-view-shot";

import RNFS from "react-native-fs";
import Header from '../components/header'

export default function TransactionDetailScreen({ navigation }) {

    const route = useRoute();

    const { transaction_id } = route.params || {};

    const [transaction, setTransaction] = useState(null);

    const [loading, setLoading] = useState(true);

    // ✅ REF FOR SCREENSHOT

    const viewShotRef = useRef();

    useEffect(() => {

        const fetchTransaction = async () => {

            try {

                const res = await api.get(

                    `/api/wallet/transactionById/${transaction_id}`

                );

                setTransaction(res.data);

            } catch (err) {

                console.log("Transaction API error:", err?.response || err.message);

            } finally {

                setLoading(false);

            }

        };

        if (transaction_id) {

            fetchTransaction();

        }

    }, [transaction_id]);

    const handleSendAgain = () => {

        if (!transaction) return;

        navigation.navigate("EnterAmount", {
            name: transaction.name,
            address: transaction.wallet,
            amount: transaction.amount,
            show:true


        });

    };

    const handleHistory = (id,name) => {

       navigation.navigate("TnsHistorySingleUser", {
            id: id,
            name:name,


        });

    };

    // ✅ DOWNLOAD RECEIPT

    const handleDownload = async () => {

        try {

            const uri = await viewShotRef.current.capture();

            const path = `${RNFS.DownloadDirectoryPath}/transaction_${Date.now()}.png`;

            await RNFS.copyFile(uri, path); // ✅ safer than moveFile

            Alert.alert("Success", "Receipt downloaded successfully!");

            console.log("Saved at:", path);

        } catch (error) {

            console.log("Download error:", error);

            Alert.alert("Error", "Download failed");

        }

    };

    // ✅ SHARE RECEIPT TEXT

    const handleShare = async () => {

        try {

            await Share.share({

                message: `Transaction Receipt
 
To: ${transaction?.name}
Amount: ${transaction?.amount} PAYO
Date: ${formatISTTime(transaction?.timestamp)}
Transaction ID: ${transaction?._id || transaction?.id}`,

            });

        } catch (err) {

            console.log(err);

        }

    };

    const formatISTTime = (utcTime) => {
  const date = new Date(utcTime);

  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const time = new Intl.DateTimeFormat("en-IN", options).format(date);

  const day = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
  }).format(date);

  const month = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
  }).format(date);

  const year = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).format(date);

  return `${time} on ${day} ${month} ${year}`;
};

const handleCopyWallet = (walletId) => {
  const walletAddress = walletId;

  if (!walletAddress) return;

  Clipboard.setString(walletAddress);

  if (Platform.OS === "android") {
    ToastAndroid.show("Wallet Address copied", ToastAndroid.SHORT);
  }
};



const handleCopyTransactionID = (Id) => {
  const walletAddress = Id;

  if (!walletAddress) return;

  Clipboard.setString(walletAddress);

  if (Platform.OS === "android") {
    ToastAndroid.show("Transaction ID copied", ToastAndroid.SHORT);
  }
};

    if (loading) {

        return (
            <LinearGradient colors={["#5B0FD1", "#14002B"]} style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>

        );

    }

    return (
        <LinearGradient colors={["#5B0FD1", "#14002B"]} style={styles.container}>

              <View style={styles.headerRow}>
                      <TouchableOpacity 
              onPress={() => navigation.canGoBack() && navigation.goBack()}          >
                        <Text style={styles.back}>
            <Icon name="chevron-left" size={28} color="#ffffff" />            </Text>
                      </TouchableOpacity>
                      <Text style={styles.header}>Transaction Details</Text>
                    </View>

            {/* ✅ RECEIPT CAPTURE AREA */}
           <ViewShot
  ref={viewShotRef}
  options={{ format: "png", quality: 1 }}
>
  <View>

                    {/* PAID TO */}
                 <View style={styles.section}>
  <Text style={styles.smallLabel}>
{transaction?.status === "failed"
  ? "Payment Failed"
  : transaction?.type === "sent"
  ? "Paid to"
  : transaction?.type === "received"
  ? "Received from"
  : ""}    </Text>

  <View style={styles.row}>
    <View style={styles.userRow}>
    <View style={styles.iconBox}>
  {transaction?.status === "failed" ? (
    <Icon name="x" size={16} color="red" />
  ) : transaction?.type === "sent" ? (
    <Icon name="arrow-up-right" size={14} color="#000" />
  ) : transaction?.type === "received" ? (
    <Icon name="arrow-down-left" size={14} color="#000" />
  ) : null}
</View>

      <View>
        <Text style={styles.name}>
          {transaction?.name || "User"}
        </Text>

        <Text style={styles.timeText}>
          {formatISTTime(transaction?.timestamp)}
        </Text>
      </View>
    </View>

    <Text style={styles.amount}>
      {transaction?.amount} <Text style={styles.payo}>PAYO</Text>
    </Text>
  </View>
</View>

                    <View style={styles.divider} />

                    {/* PAYMENT DETAILS */}
                    <View style={styles.section}>
                        <View style={styles.paymentHeader}>
                            <Icon name="file-text" size={16} color="#ddd" />
                            <Text style={styles.paymentTitle}>Payment Details</Text>
                        </View>

                        <Text style={styles.label}>Paid Via</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>

                                Wallet: {transaction?.wallet}
                            </Text>
                            <Icon name="copy" size={16} color="#ccc"  onPress={()=>handleCopyWallet(transaction?.wallet)}/>
                        </View>

                        <Text style={styles.label}>Transaction ID</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>

                                {transaction?._id || transaction?.id}
                            </Text>
                            <Icon name="copy" size={16} color="#ccc" onPress={()=>handleCopyTransactionID(transaction?._id || transaction?.id)}/>
                        </View>


                   
                    </View>

                </View>
            </ViewShot>

            {/* ACTION BUTTONS */}
            <View style={styles.actionsRow}>
                <TouchableOpacity

                    style={styles.actionItem}

                    onPress={handleSendAgain}
                >
                    <View style={styles.circle}>
                        <Icon name="arrow-up-right" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Send again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
                    <View style={styles.circle}>
                        <Icon name="share-2" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={()=>handleHistory(transaction?.wallet,transaction?.name)}>
                    <View style={styles.circle}>
                        <Icon name="clock" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleDownload}>
                    <View style={styles.circle}>
                        <Icon name="download" size={18} color="#000" />
                    </View>
                    <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>

    );

}
