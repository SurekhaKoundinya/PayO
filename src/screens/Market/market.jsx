import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import Header from "../components/header";
import Icon from "react-native-vector-icons/Feather";


const MarketScreen = ({navigation}) => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpertCoins();
  }, []);

  const fetchExpertCoins = async () => {
  try {
    const res = await fetch("http://payo-app.duckdns.org:3001/api/market/overview");

    const result = await res.json();
    console.log(result, "data");

    // access result.data (array)
    setCoins(result.data.slice(0, 50));
    setLoading(false)

  } catch (error) {
    console.log("Expert picks error:", error);
  }
};


  // const fetchMarketData = async () => {

  //   try {

  //     const response = await fetch(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  //     );

  //     const data = await response.json();

  //     setCoins(data || []);

  //   } catch (error) {

  //     console.log("Market API Error:", error);

  //   } finally {

  //     setLoading(false);

  //   }
  // };

//   const renderItem = ({ item }) => {

//     const isLong = item?.price_change_percentage_24h >= 0;

//     return (
//       <View style={styles.card}>

//         {/* TOP ROW */}
//         <View style={styles.topRow}>

//           <View style={styles.coinInfo}>

//             <Image
//               source={{ uri: item.image }}
//               style={styles.coinImage}
//             />

//             <Text style={styles.symbol}>
//               {item.symbol?.toUpperCase()}
//             </Text>

//           </View>

//           <View
//             style={[
//               styles.badge,
//               isLong ? styles.longBadge : styles.shortBadge,
//             ]}
//           >
//             <Text style={styles.badgeText}>
//               {isLong ? "Long 5x" : "Short 5x"}
//             </Text>
//           </View>

//         </View>

//         {/* ENTRY */}
//         <Text style={styles.label}>
//           Entry Price
//         </Text>

//         <Text style={styles.price}>
//           ${item.current_price}
//         </Text>

//         {/* PROFIT */}
//         {/* <View style={styles.profitBox}>

//           <Text style={styles.profitText}>
//             {Math.abs(
//               item.price_change_percentage_24h || 0
//             ).toFixed(2)}
//             % Expected profit
//           </Text>

//         </View>

//         <TouchableOpacity
//           style={[
//             styles.actionButton,
//             isLong ? styles.buyButton : styles.sellButton,
//           ]}
//         >
//           <Text style={styles.actionText}>
//             {isLong ? "Buy / Long" : "Sell / Short"}
//           </Text>
//         </TouchableOpacity> */}

//         {/* PROFIT + BUTTON ROW */}
// <View style={styles.actionRow}>

//   {/* PROFIT */}
//   <View style={styles.profitBox}>
//     <Text style={styles.profitText}>
//       {Math.abs(
//         item.price_change_percentage_24h || 0
//       ).toFixed(2)}
//       % Expected profit
//     </Text>
//   </View>

//   {/* ACTION BUTTON */}
//   <TouchableOpacity
//     style={[
//       styles.actionButton,
//       isLong ? styles.buyButton : styles.sellButton,
//     ]}
//   >
//     <Text style={styles.actionText}>
//       {isLong ? "Buy / Long" : "Sell / Short"}
//     </Text>
//   </TouchableOpacity>

// </View>

//       </View>
//     );
//   };
// const renderItem = ({ item }) => {

//   const isLong = item?.price_change_percentage_24h >= 0;

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.8}
//       onPress={() =>
//         navigation.navigate("CoinDetailsScreen", {
//           coin: item,
//         })
//       }
//     >

//       {/* TOP ROW */}
//       <View style={styles.topRow}>

//         <View style={styles.coinInfo}>

//           <Image
//             source={{ uri: item.image }}
//             style={styles.coinImage}
//           />

//           <Text style={styles.symbol}>
//             {item.symbol?.toUpperCase()}
//           </Text>

//         </View>

//         <View
//           style={[
//             styles.badge,
//             isLong ? styles.longBadge : styles.shortBadge,
//           ]}
//         >
//           <Text style={styles.badgeText}>
//             {isLong ? "Long 5x" : "Short 5x"}
//           </Text>
//         </View>

//       </View>

//       <Text style={styles.label}>
//         Entry Price
//       </Text>

//       <Text style={styles.price}>
//         ${item.price}
//       </Text>

//       <View style={styles.actionRow}>

//         <View style={styles.profitBox}>
//           <Text style={styles.profitText}>
//             {Math.abs(
//               item.price_change_percentage_24h || 0
//             ).toFixed(2)}
//             % Expected profit
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.actionButton,
//             isLong ? styles.buyButton : styles.sellButton,
//           ]}
//         >
//           <Text style={styles.actionText}>
//             {isLong ? "Buy / Long" : "Sell / Short"}
//           </Text>
//         </TouchableOpacity>

//       </View>

//     </TouchableOpacity>
//   );
// };

const renderItem = ({ item }) => {

  const isLong = item?.priceChangePercentage24h >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("CoinDetailsScreen", {
          coin: item,
        })
      }
    >

      {/* TOP ROW */}
      <View style={styles.topRow}>

        <View style={styles.coinInfo}>

          <Image
            source={{
              uri: item.image || "https://via.placeholder.com/40"
            }}
            style={styles.coinImage}
          />

          <Text style={styles.symbol}>
            {item.symbol?.toUpperCase()}
          </Text>

        </View>

        <View
          style={[
            styles.badge,
            isLong ? styles.longBadge : styles.shortBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {isLong ? "Long 5x" : "Short 5x"}
          </Text>
        </View>

      </View>

      <Text style={styles.label}>
        Entry Price
      </Text>

      <Text style={styles.price}>
        ${item.price?.toLocaleString()}
      </Text>

      <View style={styles.actionRow}>

        <View style={styles.profitBox}>
          <Text style={styles.profitText}>
            {Math.abs(
              item.priceChangePercentage24h || 0
            ).toFixed(2)}
            % Expected profit
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.actionButton,
            isLong ? styles.buyButton : styles.sellButton,
          ]}
        >
          <Text style={styles.actionText}>
            {isLong ? "Buy / Long" : "Sell / Short"}
          </Text>
        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
};

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

return (

  <SafeAreaView style={styles.container}>

    <Header />

<View style={styles.headerRow}>
                      <TouchableOpacity 
              onPress={() => navigation.canGoBack() && navigation.goBack()}          >
                        <Text style={styles.back}>
            <Icon name="chevron-left" size={28} color="#ffffff" />            </Text>
                      </TouchableOpacity>
                      <Text style={styles.header}>Market</Text>
                    </View>

    <FlatList
      data={coins}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
    paddingTop: 30,
    paddingBottom: 30,
  }}
    />

  </SafeAreaView>

);
};

export default MarketScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#3B0A6B",
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : 0,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
  },

  back: {
    marginRight: 10,
  },

  header: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B0A6B",
  },

  /* CARD */

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coinInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },

  symbol: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  /* BADGE */

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  longBadge: {
    backgroundColor: "#DCFCE7",
  },

  shortBadge: {
    backgroundColor: "#FEE2E2",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },

  /* TEXT */

  label: {
    marginTop: 12,
    color: "#777",
    fontSize: 12,
    fontWeight: "500",
  },

  price: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  /* PROFIT BOX */

  // profitBox: {
  //   marginTop: 12,
  //   backgroundColor: "#ECFDF5",
  //   paddingVertical: 12,
  //   paddingHorizontal: 12,
  //   borderRadius: 12,
  // },

  profitText: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 14,
  },

  /* BUTTON */

  // actionButton: {
  //   marginTop: 14,
  //   paddingVertical: 12,
  //   borderRadius: 12,
  //   alignItems: "center",
  // },

  buyButton: {
    backgroundColor: "#16A34A",
  },

  sellButton: {
    backgroundColor: "#EF4444",
  },

  actionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },


actionRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 14,
},

profitBox: {
  // flex: 1,
  backgroundColor: "#ECFDF5",
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 12,
  marginRight: 10,
},

actionButton: {
  // flex: 1,
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
},

});