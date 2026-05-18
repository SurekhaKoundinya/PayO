// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import styles from "../styles/AddBankDetailsStyles";

// const AddBankDetails = ({ navigate }) => {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     bank: "",
//     account: "",
//     confirmAccount: "",
//     ifsc: "",
//     accountType: "Savings",
//   });

//   const [showDropdown, setShowDropdown] = useState(false);

//   const banks = [
//     "State Bank of India",
//     "HDFC Bank",
//     "ICICI Bank",
//     "Axis Bank",
//     "Punjab National Bank",
//     "Bank of Baroda",
//     "Canara Bank",
//     "Union Bank of India",
//     "Kotak Mahindra Bank",
//     "IndusInd Bank",
//     "IDBI Bank",
//     "Yes Bank",
//     "Central Bank of India",
//     "Indian Bank",
//     "UCO Bank",
//     "Bank of India",
//     "Federal Bank",
//     "South Indian Bank",
//     "RBL Bank",
//     "Bandhan Bank",
//   ];

//   const handleChange = (name, value) => {
//     // ✅ Name validation
//     if (name === "name") {
//       value = value.replace(/[^a-zA-Z ]/g, "");
//       if (value.length > 25) return;
//     }

//     // Numbers only
//     if (name === "mobile" || name === "account" || name === "confirmAccount") {
//       value = value.replace(/[^0-9]/g, "");
//     }

//     // IFSC uppercase
//     if (name === "ifsc") {
//       value = value.toUpperCase();
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = () => {
//     const {
//       name,
//       mobile,
//       bank,
//       account,
//       confirmAccount,
//       ifsc,
//       accountType,
//     } = form;

//     if (
//       !name ||
//       !mobile ||
//       !bank ||
//       !account ||
//       !confirmAccount ||
//       !ifsc ||
//       !accountType
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     if (!/^[A-Za-z ]{1,25}$/.test(name)) {
//       alert("Name must contain only alphabets and max 25 characters");
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       alert("Invalid mobile number");
//       return;
//     }

//     if (account !== confirmAccount) {
//       alert("Account number does not match");
//       return;
//     }

//     if (account.length < 9 || account.length > 18) {
//       alert("Account number must be between 9 and 18 digits");
//       return;
//     }

//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
//     if (!ifscRegex.test(ifsc)) {
//       alert("Invalid IFSC code");
//       return;
//     }

//     alert("Bank Details Saved Successfully!");
//     navigate("TpinScreen");
//   };

//   const Label = ({ text }) => (
//     <Text style={styles.sectionTitle}>
//       {text} <Text style={{ color: "red" }}>*</Text>
//     </Text>
//   );

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={styles.title}>Add Bank Details</Text>

//       {/* ACCOUNT HOLDER */}
//       <Label text="Account Holder Name" />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Name"
//         value={form.name}
//         maxLength={25}
//         onChangeText={(text) => handleChange("name", text)}
//       />

//       <Label text="Mobile Number" />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={form.mobile}
//         onChangeText={(text) => handleChange("mobile", text)}
//       />

//       {/* ACCOUNT TYPE */}
//       <Label text="Account Type" />

//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => handleChange("accountType", "Savings")}
//       >
//         <View
//           style={[
//             styles.radioOuter,
//             form.accountType === "Savings" && styles.radioOuterActive,
//           ]}
//         >
//           {form.accountType === "Savings" && (
//             <View style={styles.radioInner} />
//           )}
//         </View>
//         <Text style={styles.radioText}>Savings Account</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => handleChange("accountType", "Current")}
//       >
//         <View
//           style={[
//             styles.radioOuter,
//             form.accountType === "Current" && styles.radioOuterActive,
//           ]}
//         >
//           {form.accountType === "Current" && (
//             <View style={styles.radioInner} />
//           )}
//         </View>
//         <Text style={styles.radioText}>Current Account</Text>
//       </TouchableOpacity>

//       {/* BANK */}
//       <Label text="Select Bank" />

//       <TouchableOpacity
//         style={styles.dropdownInput}
//         onPress={() => setShowDropdown(!showDropdown)}
//       >
//         <Text style={styles.bankIcon}>🏦</Text>
//         <Text style={styles.dropdownText}>
//           {form.bank || "Select Bank"}
//         </Text>
//         <Text style={styles.dropdownArrow}>
//           {showDropdown ? "⌃" : "⌄"}
//         </Text>
//       </TouchableOpacity>

//       {showDropdown && (
//         <View style={styles.dropdown}>
//           <FlatList
//             data={banks}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   handleChange("bank", item);
//                   setShowDropdown(false);
//                 }}
//               >
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       <Label text="Account Number" />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Account Number"
//         keyboardType="numeric"
//         maxLength={18}
//         value={form.account}
//         onChangeText={(text) => handleChange("account", text)}
//       />

//       <Label text="Confirm Account Number" />
//       <TextInput
//         style={styles.input}
//         placeholder="Re-enter Account Number"
//         keyboardType="numeric"
//         maxLength={18}
//         value={form.confirmAccount}
//         onChangeText={(text) => handleChange("confirmAccount", text)}
//       />

//       <Label text="IFSC Code" />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter IFSC Code"
//         maxLength={11}
//         value={form.ifsc}
//         onChangeText={(text) => handleChange("ifsc", text)}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Save & Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddBankDetails;





import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import axios from "axios"; // ✅ added
import Icon from "react-native-vector-icons/Feather";

import styles from "./AddBankDetailsStyles";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../api/axios";

const AddBankDetails = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    bank: "",
    account: "",
    confirmAccount: "",
    ifsc: "",
    accountType: "Savings",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ prevent double call

  const banks = [
    "State Bank of India","HDFC Bank","ICICI Bank","Axis Bank",
    "Punjab National Bank","Bank of Baroda","Canara Bank",
    "Union Bank of India","Kotak Mahindra Bank","IndusInd Bank",
    "IDBI Bank","Yes Bank","Central Bank of India","Indian Bank",
    "UCO Bank","Bank of India","Federal Bank","South Indian Bank",
    "RBL Bank","Bandhan Bank",
  ];

  const[banksList,setBanksList]=useState([]);

   const fetchBankListData = async () => {
      try {
        const res = await api.get('/api/wallet/all-banks');
        console.log(res?.data?.data, "9898")
        setBanksList(res?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };
   

  useFocusEffect(
    useCallback(() => {
      fetchBankListData();
    }, [])
  );

  const handleChange = (name, value) => {
    if (name === "name") {
      value = value.replace(/[^a-zA-Z ]/g, "");
      if (value.length > 25) return;
    }

    if (name === "mobile" || name === "account" || name === "confirmAccount") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (name === "ifsc") {
      value = value.toUpperCase();
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (loading) return; // ✅ stop double click

    const {
      name,
      mobile,
      bank,
      account,
      confirmAccount,
      ifsc,
      accountType,

    } = form;

    if (
      !name ||
      !mobile ||
      !bank ||
      !account ||
      !confirmAccount ||
      !ifsc ||
      !accountType
    ) {
      alert("All fields are required");
      return;
    }

    if (!/^[A-Za-z ]{1,25}$/.test(name)) {
      alert("Name must contain only alphabets and max 25 characters");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Invalid mobile number");
      return;
    }

    if (account !== confirmAccount) {
      alert("Account number does not match");
      return;
    }

    if (account.length < 9 || account.length > 18) {
      alert("Account number must be between 9 and 18 digits");
      return;
    }

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc)) {
      alert("Invalid IFSC code");
      return;
    }
try {
  setLoading(true);

  const res = await api.post("api/bank/add-bank", {
    name,
    mobile,
    bank,
    account,
    ifsc,
    accountType,
    confirmAccount
  });

  console.log("BANK API RESPONSE:", res?.data);

  if (res?.data?.success) {
    alert("Bank Details Saved Successfully!");

    navigation.navigate("TpinScreen", {
      account: account.trim(),
      bankResponse: res?.data?.data   // ✅ send full API response
    });
  }

} catch (err) {
  console.log("BANK API ERROR:", err?.response?.data || err.message);
} finally {
  setLoading(false);
}
  };

  const Label = ({ text }) => (
    <Text style={styles.sectionTitle}>
      {text} <Text style={{ color: "red" }}>*</Text>
    </Text>
  );

  return (
    <View style={{ flex: 1, padding: 20,     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, }}>

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

      {/* <Text style={styles.title}>Add Bank Details</Text> */}
      

      <Label text="Account Holder Name" />
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={form.name}
        maxLength={25}
        onChangeText={(text) => handleChange("name", text)}
      />

      <Label text="Mobile Number" />
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={form.mobile}
        onChangeText={(text) => handleChange("mobile", text)}
      />

      <Label text="Account Type" />

      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => handleChange("accountType", "Savings")}
      >
        <View style={[
          styles.radioOuter,
          form.accountType === "Savings" && styles.radioOuterActive,
        ]}>
          {form.accountType === "Savings" && (
            <View style={styles.radioInner} />
          )}
        </View>
        <Text style={styles.radioText}>Savings Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.radioRow}
        onPress={() => handleChange("accountType", "Current")}
      >
        <View style={[
          styles.radioOuter,
          form.accountType === "Current" && styles.radioOuterActive,
        ]}>
          {form.accountType === "Current" && (
            <View style={styles.radioInner} />
          )}
        </View>
        <Text style={styles.radioText}>Current Account</Text>
      </TouchableOpacity>

      <Label text="Select Bank" />

      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.bankIcon}>🏦</Text>
        <Text style={styles.dropdownText}>
          {form.bank || "Select Bank"}
        </Text>
        <Text style={styles.dropdownArrow}>
          {showDropdown ? "⌃" : "⌄"}
        </Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={banks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  handleChange("bank", item);
                  setShowDropdown(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Label text="Account Number" />
      <TextInput
        style={styles.input}
        value={form.account}
        onChangeText={(text) => handleChange("account", text)}
      />

      <Label text="Confirm Account Number" />
      <TextInput
        style={styles.input}
        value={form.confirmAccount}
        onChangeText={(text) => handleChange("confirmAccount", text)}
      />

      <Label text="IFSC Code" />
      <TextInput
        style={styles.input}
        value={form.ifsc}
        onChangeText={(text) => handleChange("ifsc", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Save & Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBankDetails;













































































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import styles from "../styles/AddBankDetailsStyles";
// import api from "../api/bankaxios"; // ✅ IMPORT YOUR AXIOS INSTANCE

// const AddBankDetails = ({ navigate }) => {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     bank: "",
//     account: "",
//     confirmAccount: "",
//     ifsc: "",
//     accountType: "Savings",
//   });

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false); // ✅ LOADER

//   const banks = [
//     "State Bank of India",
//     "HDFC Bank",
//     "ICICI Bank",
//     "Axis Bank",
//     "Punjab National Bank",
//     "Bank of Baroda",
//     "Canara Bank",
//     "Union Bank of India",
//     "Kotak Mahindra Bank",
//     "IndusInd Bank",
//     "IDBI Bank",
//     "Yes Bank",
//     "Central Bank of India",
//     "Indian Bank",
//     "UCO Bank",
//     "Bank of India",
//     "Federal Bank",
//     "South Indian Bank",
//     "RBL Bank",
//     "Bandhan Bank",
//   ];

//   const handleChange = (name, value) => {
//     if (name === "mobile" || name === "account" || name === "confirmAccount") {
//       value = value.replace(/[^0-9]/g, "");
//     }

//     if (name === "ifsc") {
//       value = value.toUpperCase();
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const {
//       name,
//       mobile,
//       bank,
//       account,
//       confirmAccount,
//       ifsc,
//       accountType,
//     } = form;

//     // ✅ VALIDATIONS (same as backend)
//     if (
//       !name ||
//       !mobile ||
//       !bank ||
//       !account ||
//       !confirmAccount ||
//       !ifsc ||
//       !accountType
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       alert("Invalid mobile number");
//       return;
//     }

//     if (account !== confirmAccount) {
//       alert("Account numbers do not match");
//       return;
//     }

//     if (account.length < 9 || account.length > 18) {
//       alert("Account number must be between 9 and 18 digits");
//       return;
//     }

//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
//     if (!ifscRegex.test(ifsc)) {
//       alert("Invalid IFSC code");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ API CALL (MATCH BACKEND KEYS)
//       const response = await api.post("/api/wallet/add-bank", {
//         name,
//         mobile,
//         bank,
//         account,
//         confirmAccount,
//         ifsc,
//         accountType,
//       });

//       console.log("API Success:", response.data);

//       // ✅ SUCCESS FLOW
//       alert(response.data.message || "Bank added successfully");

//       navigate("BankAddedScreen"); // 🔥 UPDATED FLOW

//     } catch (error) {
//       console.log("API Error:", error?.response?.data || error.message);

//       // ✅ ERROR HANDLING
//       const message =
//         error?.response?.data?.message || "Something went wrong";

//       alert(message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={styles.title}>Add Bank Details</Text>

//       <Text style={styles.sectionTitle}>Account Holder Details</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Account Holder Name"
//         value={form.name}
//         onChangeText={(text) => handleChange("name", text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={form.mobile}
//         onChangeText={(text) => handleChange("mobile", text)}
//       />

//       <Text style={styles.sectionTitle}>Account Type</Text>

//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => handleChange("accountType", "Savings")}
//       >
//         <View style={[styles.radioOuter, form.accountType === "Savings" && styles.radioOuterActive]}>
//           {form.accountType === "Savings" && <View style={styles.radioInner} />}
//         </View>
//         <Text style={styles.radioText}>Savings Account</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => handleChange("accountType", "Current")}
//       >
//         <View style={[styles.radioOuter, form.accountType === "Current" && styles.radioOuterActive]}>
//           {form.accountType === "Current" && <View style={styles.radioInner} />}
//         </View>
//         <Text style={styles.radioText}>Current Account</Text>
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>Bank Details</Text>

//       <TouchableOpacity
//         style={styles.dropdownInput}
//         onPress={() => setShowDropdown(!showDropdown)}
//       >
//         <Text style={styles.bankIcon}>🏦</Text>
//         <Text style={styles.dropdownText}>{form.bank || "Select Bank"}</Text>
//         <Text style={styles.dropdownArrow}>
//           {showDropdown ? "⌃" : "⌄"}
//         </Text>
//       </TouchableOpacity>

//       {showDropdown && (
//         <View style={styles.dropdown}>
//           <FlatList
//             data={banks}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   handleChange("bank", item);
//                   setShowDropdown(false);
//                 }}
//               >
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       <TextInput
//         style={styles.input}
//         placeholder="Account Number"
//         keyboardType="numeric"
//         maxLength={18}
//         value={form.account}
//         onChangeText={(text) => handleChange("account", text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Account Number"
//         keyboardType="numeric"
//         maxLength={18}
//         value={form.confirmAccount}
//         onChangeText={(text) => handleChange("confirmAccount", text)}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="IFSC Code"
//         maxLength={11}
//         value={form.ifsc}
//         onChangeText={(text) => handleChange("ifsc", text)}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Save & Continue</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddBankDetails;