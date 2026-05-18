// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import styles from "../styles/BankAddedStyles";

// const BankAddedScreen = ({ navigate }) => {
//   return (
//     <View style={styles.container}>

//       {/* SUCCESS ICON */}
//       <View style={styles.iconWrapper}>
//         <Text style={styles.check}>✔</Text>
//       </View>

//       {/* TITLE */}
//       <Text style={styles.title}>Bank Added Successfully!</Text>

//       <Text style={styles.subtitle}>
//         Your bank account has been{"\n"}
//         added and verified successfully.
//       </Text>

//       {/* BANK CARD */}
//       <View style={styles.card}>
//         <View style={styles.bankIcon}>
//           <Text style={{ color: "#fff" }}>🏦</Text>
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.bankName}>State Bank of India</Text>
//           <Text style={styles.account}>XXXX 3456</Text>
//         </View>

//         <View style={styles.primaryTag}>
//           <Text style={styles.primaryText}>Primary</Text>
//         </View>
//       </View>

//       {/* DONE BUTTON */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigate("UserProfile")}
//       >
//         <Text style={styles.buttonText}>Done</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default BankAddedScreen;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./BankAddedStyles";

const BankAddedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bank Added Successfully!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BankAddedScreen;