// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
//   Platform,
//   StatusBar,
// } from "react-native";
// import Header from "../components/header";
// import Icon from "react-native-vector-icons/Feather";
// const MarketScreen = ({ navigation }) => {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // Initial API fetch
//     fetchInitialCoins();
//     // WebSocket connection
//     const socket = new WebSocket(
//       "ws://payo-app.duckdns.org:3001"
//     );
//     socket.onopen = () => {
//       console.log("WebSocket Connected");
//     };
//     socket.onmessage = (event) => {
//       try {
//         const parsed = JSON.parse(event.data);
//         // LIVE MARKET DATA
//         if (parsed.type === "market_update") {
//           setCoins(parsed.data.slice(0, 50));
//           setLoading(false);
//         }
//       } catch (error) {
//         console.log(
//           "WebSocket parse error:",
//           error
//         );
//       }
//     };
//     socket.onerror = (error) => {
//       console.log(
//         "WebSocket Error:",
//         error.message
//       );
//     };
//     socket.onclose = () => {
//       console.log("WebSocket Disconnected");
//     };
//     // cleanup
//     return () => {
//       socket.close();
//     };
//   }, []);
//   // Initial API fetch only once
//   const fetchInitialCoins = async () => {
//     try {
//       const res = await fetch(
//         "http://payo-app.duckdns.org:3001/api/market/overview"
//       );
//       const result = await res.json();
//       if (result?.data) {
//         setCoins(
//           result.data.slice(0, 50)
//         );
//       }
//       setLoading(false);
//     } catch (error) {
//       console.log(
//         "Initial fetch error:",
//         error
//       );
//       setLoading(false);
//     }
//   };
//   const renderItem = ({ item }) => {
//     const isLong =
//       item?.priceChangePercentage24h >= 0;
//     return (
//       <TouchableOpacity
//         style={styles.card}
//         activeOpacity={0.8}
//         onPress={() =>
//           navigation.navigate(
//             "CoinDetailsScreen",
//             {
//               coin: item,
//             }
//           )
//         }
//       >
//         {/* TOP ROW */}
//         <View style={styles.topRow}>
//           <View style={styles.coinInfo}>
//             <Image
//               source={{
//                 uri:
//                   item.image ||
//                   "https://via.placeholder.com/40",
//               }}
//               style={styles.coinImage}
//             />
//             <Text style={styles.symbol}>
//               {item.symbol?.toUpperCase()}
//             </Text>
//           </View>
//           <View
//             style={[
//               styles.badge,
//               isLong
//                 ? styles.longBadge
//                 : styles.shortBadge,
//             ]}
//           >
//             <Text style={styles.badgeText}>
//               {isLong
//                 ? "Long 5x"
//                 : "Short 5x"}
//             </Text>
//           </View>
//         </View>
//         {/* ENTRY PRICE */}
//         <Text style={styles.label}>
//           Entry Price
//         </Text>
//         <Text style={styles.price}>
//           $
//           {Number(
//             item.price || 0
//           ).toLocaleString()}
//         </Text>
//         {/* ACTION ROW */}
//         <View style={styles.actionRow}>
//           <View style={styles.profitBox}>
//             <Text style={styles.profitText}>
//               {(
//                 item.priceChangePercentage24h || 0
//               ).toFixed(2)}
//               % Expected Profit
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={[
//               styles.actionButton,
//               isLong
//                 ? styles.buyButton
//                 : styles.sellButton,
//             ]}
//           >
//             <Text style={styles.actionText}>
//               {isLong
//                 ? "Buy / Long"
//                 : "Sell / Short"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator
//           size="large"
//           color="#4F46E5"
//         />
//       </View>
//     );
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.canGoBack() &&
//             navigation.goBack()
//           }
//         >
//           <Text style={styles.back}>
//             <Icon
//               name="chevron-left"
//               size={28}
//               color="#ffffff"
//             />
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.header}>
//           Market
//         </Text>
//       </View>
//       {/* COINS LIST */}
//       <FlatList
//         data={coins}
//         keyExtractor={(item) =>
//           item.symbol
//         }
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingTop: 20,
//           paddingBottom: 30,
//         }}
//         // PERFORMANCE
//         initialNumToRender={10}
//         windowSize={5}
//         maxToRenderPerBatch={10}
//         removeClippedSubviews={true}
//       />
//     </SafeAreaView>
//   );
// };
// export default MarketScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#3B0A6B",
//     paddingHorizontal: 16,
//     paddingTop:
//       Platform.OS === "android"
//         ? StatusBar.currentHeight
//         : 0,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 12,
//   },
//   back: {
//     marginRight: 10,
//   },
//   header: {
//     color: "#FFF",
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#3B0A6B",
//   },
//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 14,
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   coinInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   coinImage: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     marginRight: 10,
//   },
//   symbol: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111",
//   },
//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 12,
//   },
//   longBadge: {
//     backgroundColor: "#DCFCE7",
//   },
//   shortBadge: {
//     backgroundColor: "#FEE2E2",
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#111",
//   },
//   label: {
//     marginTop: 12,
//     color: "#777",
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   price: {
//     marginTop: 4,
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111",
//   },
//   actionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 14,
//   },
//   profitBox: {
//     backgroundColor: "#ECFDF5",
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     marginRight: 10,
//   },
//   profitText: {
//     color: "#10B981",
//     fontWeight: "700",
//     fontSize: 14,
//   },
//   actionButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buyButton: {
//     backgroundColor: "#16A34A",
//   },
//   sellButton: {
//     backgroundColor: "#EF4444",
//   },
//   actionText: {
//     color: "#FFF",
//     fontSize: 15,
//     fontWeight: "700",
//   },
// });
 


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
const MarketScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  // INITIAL FETCH + WEBSOCKET
 useEffect(() => {
  
  fetchInitialCoins();

  const socket = new WebSocket("ws://payo-app.duckdns.org:3001");

  socket.onopen = () => {
    console.log("WebSocket Connected");
  };

  socket.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data);

      if (parsed.type === "market_update") {
        setCoins(parsed.data.slice(0, 50));
        setLoading(false);
      }
    } catch (error) {
      console.log("WebSocket parse error:", error);
    }
  };

  socket.onerror = (error) => {
    console.log("WebSocket Error:", error.message);
  };

  socket.onclose = () => {
    console.log("WebSocket Disconnected");
  };

  // ✅ FORCE REFRESH EVERY SECOND
  const interval = setInterval(() => {
    fetchInitialCoins();
  }, 1000);

  return () => {
    socket.close();
    clearInterval(interval);
  };
}, []);

  const fetchInitialCoins = async () => {
    try {
      const res = await fetch(
        "http://payo-app.duckdns.org:3001/api/market/overview"
      );
      const result = await res.json();
      if (result?.data) {
        setCoins(result.data.slice(0, 50));
      }
      setLoading(false);
    } catch (error) {
      console.log(
        "Initial fetch error:",
        error
      );
      setLoading(false);
    }
  };
  // RENDER EACH COIN
  const renderItem = ({ item }) => {
    const isLong =
      item?.priceChangePercentage24h >= 0;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            "CoinDetailsScreen",
            {
              coin: item,
            }
          )
        }
      >
        {/* TOP ROW */}
        <View style={styles.topRow}>
          <View style={styles.coinInfo}>
            <Image
              source={{
                uri:
                  item.image ||
                  "https://via.placeholder.com/40",
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
              isLong
                ? styles.longBadge
                : styles.shortBadge,
            ]}
          >
            <Text style={styles.badgeText}>
              {isLong
                ? "Long 5x"
                : "Short 5x"}
            </Text>
          </View>
        </View>
        {/* PRICE */}
        <Text style={styles.label}>
          Entry Price
        </Text>
        <Text style={styles.price}>
          $
          {Number(
            item.price || 0
          ).toLocaleString()}
        </Text>
        {/* BOTTOM */}
        <View style={styles.actionRow}>
          <View style={styles.profitBox}>
            <Text style={styles.profitText}>
              {(
                item.priceChangePercentage24h || 0
              ).toFixed(2)}
              % Expected profit
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isLong
                ? styles.buyButton
                : styles.sellButton,
            ]}
          >
            <Text style={styles.actionText}>
              {isLong
                ? "Buy / Long"
                : "Sell / Short"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  // LOADER
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() =>
            navigation.canGoBack() &&
            navigation.goBack()
          }
        >
          <Text style={styles.back}>
            <Icon
              name="chevron-left"
              size={28}
              color="#ffffff"
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.header}>
          Market
        </Text>
      </View>
      {/* COINS LIST */}
      <FlatList
        data={coins}
        keyExtractor={(item) =>
          item.symbol
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 30,
        }}
        // PERFORMANCE
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B0A6B",
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
  // CARD
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
  // BADGE
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
  // TEXT
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
  // ACTION ROW
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  // PROFIT BOX
  profitBox: {
    backgroundColor: "#ECFDF5",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  profitText: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 14,
  },
  // BUTTON
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
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
});
 