// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   BackHandler,
//   ScrollView,
//   ToastAndroid,
//   Platform,
// } from 'react-native';
// import * as Keychain from 'react-native-keychain'; // ✅ added
// import styles from './UserProfileStyling';
// import api from '../../api/axios';
// import Clipboard from "@react-native-clipboard/clipboard";
// import Share from "react-native-share";
// import RNFS from "react-native-fs";
// import Icon from "react-native-vector-icons/Feather";

// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';
// import BottomNav from '../components/bottomNav';

// export default function UserProfile({ navigation }) {
//   const [profiledata, setProfileData] = useState({});
//   const[bankData,setBankData]=useState(null);
//   const [address, setAddress] = useState("");
//   const [qr, setQr] = useState(null);

//   useEffect(() => {
//     const backAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack(); // go to previous screen dynamically
//       }
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     return () => backHandler.remove();
//   }, [navigation]);

//   const fetchQr = async () => {
//     try {
//       const res = await api.get("api/wallet/generate-address");

//       const data = res.data;

//       const qrImage = data.qr?.startsWith("data:image")
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address);

//       return { qrImage, address: data.address };

//     } catch (err) {
//       console.log("QR ERROR:", err.message);
//       return null;
//     }
//   };

 
//     const fetchProfileData = async () => {
//       try {
//         const res = await api.get('/api/wallet/profile');
//         setProfileData(res?.data?.data);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

    
//     const fetchBankDetails = async () => {
//       try {
//         const res = await api.get('/api/bank/all-banks');
//         console.log(res.data.data, "9898")
//         setBankData(res?.data?.data);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };
   

//   useFocusEffect(
//     useCallback(() => {
//       fetchProfileData();
//       fetchBankDetails();
//     }, [])
//   );


//   // ✅ SECURE LOGOUT (FIXED)

//   const handleCopy = () => {
//     const walletAddress = profiledata?.walletAddress;

//     if (!walletAddress) return;

//     Clipboard.setString(walletAddress);

//     if (Platform.OS === "android") {
//       ToastAndroid.show("WalletID copied", ToastAndroid.SHORT);
//     }
//   };

//   const handleShare = async () => {
//     try {

//       // fetch QR first
//       const result = await fetchQr();

//       if (!result) return;

//       const { qrImage, address } = result;

//       const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");

//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, "base64");

//       await Share.open({
//         url: "file://" + filePath,
//         message: `Send PAYO to this WalletID:\n${address}`,
//       });

//     } catch (error) {
//       console.log("Share error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await Keychain.resetGenericPassword(); // clear token

//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }], // keep your route name
//       });

//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>

//       <View style={styles.container}>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.canGoBack() && navigation.goBack()}
//           >
//             <Text style={styles.back}>
//               <Icon name="chevron-left" size={28} color="#ffffff" /> 

//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.title}>Profile</Text>

//           <View style={{ width: 20 }} />
//         </View>

//         {/* PROFILE SECTION */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileCircle}>
//             <Text style={styles.profileText}>👤</Text>
//           </View>

//           <Text style={styles.phone}>+91 {profiledata?.mobile}</Text>
//           <Text style={styles.verified}>• KYC VERIFIED</Text>
//         </View>

//         {/* BALANCE CARD */}

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         >
//           <View style={styles.balanceCard}>
//             <View style={{ marginLeft: 8 }}>
//               <Text style={styles.label}>Balance</Text>
//               <Text style={styles.balance}>
//                 {profiledata?.balance} <Text style={styles.token}>PAYO</Text>
//               </Text>
//             </View>

//             <View style={styles.divider} />
//             <View style={styles.transactionRow}>
//               <Icon name="arrow-up" size={30} color="#E25C5C" />


//               <View style={{ marginLeft: 8 }}>
//                 <Text style={styles.label}>Transactions</Text>
//                 <Text style={styles.transactions}>
//                   {profiledata?.transactionCount}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* REFERRAL BOX */}
//           <View style={styles.referralBox}>
//             <Text style={styles.refLabel}>Your Referral code</Text>
//             <Text style={styles.refCode}>{profiledata?.referralCode}</Text>
//           </View>

//           {/* BUTTONS */}
//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.btn} onPress={handleCopy}>
//               <Text style={styles.btnText}>Copy WalletID</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.btn} onPress={handleShare}>
//               <Text style={styles.btnText}>Share WalletID</Text>
//             </TouchableOpacity>
//           </View>

//                     {/* ADD BANK ACCOUNT BUTTON */}
//           <TouchableOpacity
//             style={styles.addBankBtn}
//             onPress={() => navigation.navigate('AddBankHome')}
//           >
//             <Icon name="plus-circle" size={20} color="#fff" />
            
//             <Text style={styles.addBankText}>
//               Add Bank Account
//             </Text>

//             <Icon name="chevron-right" size={20} color="#fff" />
//           </TouchableOpacity>

//           {/* ACCOUNT SECTION */}
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <View style={styles.card}>

//             {/* 
//             <View style={styles.row}>
//               <Text style={styles.item}>Personal Information</Text>
//               <Text style={styles.arrow}>›</Text>
//             </View> */}

//             <View>


//               <View style={styles.row}>
//                 <Text style={styles.labelItem}>Name</Text>
//                 <Text style={styles.value}>
//                   {profiledata?.name || "N/A"}
//                 </Text>
//               </View>

//               <View style={styles.row}>
//                 <Text style={styles.labelItem}>Email</Text>
//                 <Text style={styles.value}>
//                   {profiledata?.email || "N/A"}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Linked Mobile</Text>
//               <Text style={styles.value}>+91 {profiledata?.mobile}</Text>
//             </View>

//           </View>

//           <Text style={styles.sectionTitle}>Account</Text>

//           <View style={styles.card}>
//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Wallet Address</Text>
//               <Text style={styles.value}>{profiledata?.walletAddress}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Wallet ID</Text>
//               <Text style={styles.value}>{profiledata?.walletId}</Text>
//             </View>
//           </View>

//            <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>







//           {/* SECURITY SECTION */}
//           {/* <Text style={styles.sectionTitle}>Security</Text>

//           <View style={styles.card}>
//             <View style={styles.row}>
//               <Text style={styles.item}>KYC Verification</Text>
//               <Text style={styles.green}>Approved ›</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.item}>Linked Mobile</Text>
//               <Text style={styles.value}>+91 {profiledata?.mobile}</Text>
//             </View>
//           </View> */}

//           {/* ✅ LOGOUT BUTTON */}
//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//         <BottomNav
//                   navigation={navigation}
//                   currentRoute="Scan"
//                 />

//     </SafeAreaView>
//   );
// }



import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  ScrollView,
  ToastAndroid,
  Platform,
  Image
} from 'react-native';

import * as Keychain from 'react-native-keychain';
import styles from './UserProfileStyling';
import api from '../../api/axios';
import Clipboard from "@react-native-clipboard/clipboard";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import Icon from "react-native-vector-icons/Feather";
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from '../components/bottomNav';

export default function UserProfile({ navigation }) {

  const [profiledata, setProfileData] = useState({});
  const [bankData, setBankData] = useState([]);
  const [address, setAddress] = useState("");
  const [qr, setQr] = useState(null);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, [navigation]);

  const fetchQr = async () => {
    try {
      const res = await api.get("api/wallet/generate-address");

      const data = res.data;

      const qrImage = data.qr?.startsWith("data:image")
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address);

      return { qrImage, address: data.address };

    } catch (err) {
      console.log("QR ERROR:", err.message);
      return null;
    }
  };

  const fetchProfileData = async () => {
    try {
      const res = await api.get('/api/wallet/profile');
      setProfileData(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBankDetails = async () => {
    try {
      const res = await api.get('/api/bank/all-banks');
      setBankData(res?.data?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
      fetchBankDetails();
    }, [])
  );

  const maskAccount = (acc) => {
    if (!acc) return "";
    return acc.slice(-4);
  };

  const handleCopy = () => {
    const walletAddress = profiledata?.walletAddress;

    if (!walletAddress) return;

    Clipboard.setString(walletAddress);

    if (Platform.OS === "android") {
      ToastAndroid.show("WalletID copied", ToastAndroid.SHORT);
    }
  };

  const handleShare = async () => {
    try {

      const result = await fetchQr();
      if (!result) return;

      const { qrImage, address } = result;

      const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(filePath, base64Data, "base64");

      await Share.open({
        url: "file://" + filePath,
        message: `Send PAYO to this WalletID:\n${address}`,
      });

    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleLogout = async () => {
    try {

      await Keychain.resetGenericPassword();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => 
              // navigation.canGoBack() && navigation.goBack()
              navigation.navigate("Main")
            }
          >
            <Icon name="chevron-left" size={28} color="#ffffff" />
          </TouchableOpacity>

          <Text style={styles.title}>Profile</Text>

          <View style={{ width: 20 }} />
        </View>

        {/* PROFILE */}
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>👤</Text>
          </View>

          <Text style={styles.phone}>+91 {profiledata?.mobile}</Text>
          <Text style={styles.verified}>• KYC VERIFIED</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >

          {/* BALANCE CARD */}
          <View style={styles.balanceCard}>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.balance}>
                {profiledata?.balance} <Text style={styles.token}>PAYO</Text>
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.transactionRow}>
              <Icon name="arrow-up" size={30} color="#E25C5C" />

              <View style={{ marginLeft: 8 }}>
                <Text style={styles.label}>Transactions</Text>
                <Text style={styles.transactions}>
                  {profiledata?.transactionCount}
                </Text>
              </View>
            </View>
          </View>

          {/* REFERRAL */}
          <View style={styles.referralBox}>
            <Text style={styles.refLabel}>Your Referral code</Text>
            <Text style={styles.refCode}>{profiledata?.referralCode}</Text>
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btn} onPress={handleCopy}>
              <Text style={styles.btnText}>Copy WalletID</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={handleShare}>
              <Text style={styles.btnText}>Share WalletID</Text>
            </TouchableOpacity>
          </View>

         

          {/* PERSONAL INFO */}

          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.card}>

            <View style={styles.row}>
              <Text style={styles.labelItem}>Name</Text>
              <Text style={styles.value}>
                {profiledata?.name || "N/A"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelItem}>Email</Text>
              <Text style={styles.value}>
                {profiledata?.email || "N/A"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelItem}>Linked Mobile</Text>
              <Text style={styles.value}>+91 {profiledata?.mobile}</Text>
            </View>

          </View>

          {/* ACCOUNT */}

           {/* ================= BANK SECTION ================= */}

          <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>

          {bankData && bankData.length > 0 ? (

            bankData.map((bank, index) => (
              <View key={index} style={styles.bankCard}>

                <View style={styles.bankLeft}>

                  <View style={styles.bankIcon}>
                    <Icon name="credit-card" size={20} color="#fff" />
                  </View>

                  <View>
                    <Text style={styles.bankName}>
                      {bank.bankName} - {maskAccount(bank.accountNumber)}
                    </Text>

                    <Text style={styles.bankSub}>
                      Bank Account
                    </Text>
                  </View>

                </View>

                <Icon name="chevron-right" size={20} color="#fff" />

              </View>
            ))

          ) : (

            <TouchableOpacity
              style={styles.addBankBtn}
              onPress={() => navigation.navigate('AddBankHome')}
            >
              <Icon name="plus-circle" size={20} color="#fff" />

              <Text style={styles.addBankText}>
                Add Bank Account
              </Text>

              <Icon name="chevron-right" size={20} color="#fff" />
            </TouchableOpacity>

          )}

          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.card}>

            <View style={styles.row}>
              <Text style={styles.labelItem}>Wallet Address</Text>
              <Text style={styles.value}>{profiledata?.walletAddress}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.labelItem}>Wallet ID</Text>
              <Text style={styles.value}>{profiledata?.walletId}</Text>
            </View>

          </View>

          {/* LOGOUT */}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <BottomNav
        navigation={navigation}
        currentRoute="Scan"
      />

    </SafeAreaView>
  );
}