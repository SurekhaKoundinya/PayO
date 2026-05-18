// import React, { useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import styles from "../styles/TpinStyles";

// const TpinScreen = ({ navigate }) => {
//   const [pin, setPin] = useState("");

//   const handlePress = (num) => {
//     if (pin.length < 4) {
//       setPin(pin + num);
//     }
//   };

//   const handleDelete = () => {
//     setPin(pin.slice(0, -1));
//   };

//   const handleSubmit = () => {
//     if (pin.length !== 4) {
//       alert("Enter 4 digit TPIN");
//       return;
//     }

//     alert("TPIN Created Successfully");
//     navigate("BankAddedScreen");
//   };

//   const renderDot = (index) => (
//     <View
//       key={index}
//       style={[
//         styles.dot,
//         pin.length > index && styles.dotFilled,
//       ]}
//     />
//   );

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Create TPIN</Text>
//       <Text style={styles.subtitle}>Enter 4-digit secure PIN</Text>

//       {/* PIN DOTS */}
//       <View style={styles.dotContainer}>
//         {[0, 1, 2, 3].map((i) => renderDot(i))}
//       </View>

//       {/* NUMPAD */}
//       <View style={styles.numpad}>

//         {[1,2,3,4,5,6,7,8,9].map((num) => (
//           <TouchableOpacity
//             key={num}
//             style={styles.key}
//             onPress={() => handlePress(num)}
//           >
//             <Text style={styles.keyText}>{num}</Text>
//           </TouchableOpacity>
//         ))}

//         {/* Empty space */}
//         <View style={styles.key} />

//         {/* 0 */}
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handlePress(0)}
//         >
//           <Text style={styles.keyText}>0</Text>
//         </TouchableOpacity>

//         {/* Delete */}
//         <TouchableOpacity
//           style={styles.key}
//           onPress={handleDelete}
//         >
//           <Text style={styles.keyText}>⌫</Text>
//         </TouchableOpacity>

//       </View>

//       {/* SUBMIT BUTTON */}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// export default TpinScreen;








import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./TpinStyles";
import api from "../../api/axios";

const TpinScreen = ({ navigation, route }) => {

  const account = String(route?.params?.account || "").trim();
  const bankResponse = route?.params?.bankResponse?._id || {};

  console.log("ACCOUNT:", account);
  console.log("BANK RESPONSE:", bankResponse);

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);


  // ✅ ONLY THIS — correct extraction
  // const account = String(route?.params?.account || "").trim();

  console.log("FINAL ACCOUNT:", account);

  const handlePress = (num) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  // const handleSubmit = async () => {
  //   if (pin.length !== 4) {
  //     alert("Enter 4 digit TPIN");
  //     return;
  //   }

  //   console.log("ACCOUNT FROM TPIN:", account);

  //   if (!account) {
  //     alert("Account not found ❌");
  //     return;
  //   }

  //   if (loading) return;

  //   try {
  //     setLoading(true);

  //     const res = await axios.post(
  //       "http://10.0.2.2:3001/save-tpin",
  //       {
  //         account: account.trim(),
  //         tpin: pin,
  //       }
  //     );

  //     console.log("API RESPONSE:", res.data);

  //     if (res?.data?.success) {
  //       alert("TPIN Created Successfully");
  //       navigation.navigate("BankAddedScreen");
  //     } else {
  //       alert("Account not found ❌");
  //     }

  //   } catch (err) {
  //     // console.log("TPIN API ERROR:", err?.response?.data || err.message);
  //     // alert("Error saving TPIN");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
  if (pin.length !== 4) {
    alert("Enter 4 digit TPIN");
    return;
  }

  if (!account) {
    alert("Account not found ❌");
    return;
  }

  if (loading) return;

  try {
    setLoading(true);

    const res = await api.post(
      "api/bank/set-tpin",
      {
        // account: account,
        tpin: pin,
        bankId: bankResponse   // ✅ send previous API response also
      }
    );

    console.log("TPIN API RESPONSE:", res.data);

    if (res?.data?.success) {
      alert("TPIN Created Successfully");
      navigation.navigate("BankAddedScreen");
    } else {
      alert("Account not found ❌");
    }

  } catch (err) {
    console.log("TPIN API ERROR:", err?.response?.data || err.message);
    alert("Error saving TPIN");
  } finally {
    setLoading(false);
  }
};
  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        pin.length > index && styles.dotFilled,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <Text>ACCOUNT: {account}</Text>

      <Text style={styles.title}>Create TPIN</Text>
      <Text style={styles.subtitle}>Enter 4-digit secure PIN</Text>

      <View style={styles.dotContainer}>
        {[0, 1, 2, 3].map((i) => renderDot(i))}
      </View>

      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handlePress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.key} />

        <TouchableOpacity
          style={styles.key}
          onPress={() => handlePress(0)}
        >
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.key}
          onPress={handleDelete}
        >
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Submit"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default TpinScreen;
