


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView,Image } from 'react-native';
import styles from './homeStyling';
import api from '../../api/axios';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
// import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function HomeScreen({ navigation }) {

  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);

  // VIEW ALL + VIEW MORE
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [avaliable, setAvaliable] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [expertCoins, setExpertCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // DISPLAY LOGIC
  const displayedTransactions = showAll
    ? transactionsList.slice(0, visibleCount)
    : transactionsList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  // PAGINATION
  const totalPages = Math.ceil(transactionsList.length / itemsPerPage);

  const getVisiblePages = () => {

    let pages = [];

    const visibleCountPages = 5;

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = visibleCountPages;
    }

    if (endPage > totalPages) {

      endPage = totalPages;
      startPage = totalPages - visibleCountPages + 1;

      if (startPage < 1) {
        startPage = 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const fetchTotalBalance = async () => {

    try {

      const res = await api.get('/api/wallet/income-outcome');

      setTotalBalance(res?.data || []);

    } catch (err) {

      console.log('Transaction error:', err.message);

    }
  };

  const fetchTransactions = async () => {

    try {

      const res = await api.get('/api/wallet/transaction-list');

      const transactions = res?.data?.transactions || [];

      const filteredTransactions = transactions?.filter(
        (item) => !(item?.status === 'failed' && item?.type === 'received')
      );

      setTransactionsList(filteredTransactions);

    } catch (err) {

      console.log('Transaction error:', err.message);

    }
  };

  const fetchBalance = async () => {

    try {

      const response = await api.get('/api/wallet/balance');

      setAvaliable(response?.data?.balance || "0");

    } catch (error) {

      console.log("Error fetching balance:", error);

    }
  };

const fetchExpertCoins = async () => {
  try {
    const res = await fetch("http://payo-app.duckdns.org:3001/api/market/overview");

    const result = await res.json();
    console.log(result, "data");

    // access result.data (array)
    setExpertCoins(result.data.slice(0, 50));

  } catch (error) {
    console.log("Expert picks error:", error);
  }
};

  useFocusEffect(
  useCallback(() => {

    fetchBalance();
    fetchTransactions();
    fetchTotalBalance();
    fetchExpertCoins();

  }, [])
);

  return (

    <View style={styles.container}>

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* CARD */}
        {/* <View style={styles.cardContainer}>

          <View style={styles.card}>

            <View style={styles.topRightCurve} />
            <View style={styles.bottomLeftCurve} />

            <View>

              <Text style={styles.balanceLabel}>
                Total Balance
              </Text>

              <View style={styles.balanceRow}>

                <Text style={styles.balanceAmount}>
                  {balanceVisible ? ` ${avaliable}` : '* * * * * *'}
                </Text>

                <Text style={styles.payoLabel}>
                  PAYO
                </Text>

              </View>

            </View>

            <View style={styles.cardRight}>

              <TouchableOpacity
                onPress={() => setBalanceVisible(!balanceVisible)}
              >
                <Icon
                  name={balanceVisible ? "eye" : "eye-off"}
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.walletRow}
                onPress={() => navigation.navigate('Wallets')}
              >

                <Text style={styles.walletText}>
                  My Wallet
                </Text>

                <View style={styles.arrowCircle}>
                  <Icon name="arrow-right" size={14} color="#000" />
                </View>

              </TouchableOpacity>

            </View>

          </View>

        </View> */}

        <View style={styles.cardContainer}>

  <View style={styles.card}>

    <View style={styles.topRightCurve} />
    <View style={styles.bottomLeftCurve} />

    <View>
      <Text style={styles.balanceLabel}>
        Total Balance
      </Text>

      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>
          {balanceVisible ? ` ${avaliable}` : '* * * *'}
        </Text>

        <Text style={styles.payoLabel}>
          PAYO
        </Text>
      </View>
    </View>

    <View style={styles.cardRight}>

      <TouchableOpacity
        onPress={() => setBalanceVisible(!balanceVisible)}
      >
        <Icon
          name={balanceVisible ? "eye" : "eye-off"}
          size={18}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.walletRow}
        onPress={() => navigation.navigate('Wallets')}
      >

        <Text style={styles.walletText}>
          My Wallet
        </Text>

        <View style={styles.arrowCircle}>
          <Icon name="arrow-right" size={14} color="#000" />
        </View>

      </TouchableOpacity>

    </View>

    {/* ADD BANK ACCOUNT BUTTON */}
    <TouchableOpacity
  style={styles.addBankButton}
    onPress={() => navigation.navigate('AddBankHome')}
  // disabled={true}
>
  <Icon name="plus-circle" size={18} color="#020202" style={styles.bankIcon} />
  <Text style={styles.addBankText}>
    Add Bank
  </Text>
</TouchableOpacity>

  </View>

</View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>

          <View style={styles.actions}>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SendScreen', { tab: 'scan' })}
            >

              <View style={styles.iconCircle}>
                <Icon name="arrow-up-right" size={14} color="#fff" />
              </View>

              <Text style={styles.label}>
                Send
              </Text>

            </TouchableOpacity>

            <View style={styles.connector} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Receive')}
            >

              <View style={styles.iconCircle}>
                <Icon name="arrow-down-left" size={14} color="#fff" />
              </View>

              <Text style={styles.label}>
                Receive
              </Text>

            </TouchableOpacity>

            <View style={styles.connector} />

            <View style={styles.actionBlock}>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ReferEarn")}
              >

                <View style={styles.iconCircle}>
                  <Icon name="arrow-up-right" size={14} color="#fff" />
                </View>

                <Text style={styles.label}>
                  Refer
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>

          <View style={styles.statsCard}>

            <View style={styles.statItem}>

              <Icon name="arrow-down" size={28} color="#53D258" />

              <View style={styles.textBlock}>

                <Text style={styles.statLabel}>
                  Income
                </Text>

                <View style={styles.amountRow}>

                  <Text style={styles.statValue}>
                    {totalBalance?.income}
                  </Text>

                  <Text style={styles.unit}>
                    PAYO
                  </Text>

                </View>

              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>

              <Icon name="arrow-up" size={28} color="#FF6B6B" />

              <View style={styles.textBlock}>

                <Text style={styles.statLabel}>
                  Outcome
                </Text>

                <View style={styles.amountRow}>

                  <Text style={styles.statValue}>
                    {totalBalance?.outcome}
                  </Text>

                  <Text style={styles.unit}>
                    PAYO
                  </Text>

                </View>

              </View>

            </View>

          </View>

        </View>

      
<View style={styles.expertContainer}>

  <View style={styles.expertHeader}>

  <Text style={styles.expertTitle}>
    Expert Picks
  </Text>

  <TouchableOpacity
    onPress={() =>
      navigation.navigate("MarketScreen")
    }
  >
    <Text style={styles.viewAllText}>
      View All
    </Text>
  </TouchableOpacity>

</View>

 <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
>

  {expertCoins.map((coin, index) => {

    const isLong = coin?.priceChangePercentage24h >= 0;

    return (
      <TouchableOpacity
        key={index}
        style={styles.expertCard}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("CoinDetailsScreen", { coin })
        }
      >

        <View style={styles.expertTopRow}>

          <View style={styles.coinInfo}>

            <Image
              source={{
                uri:
                  coin.image ||
                  "https://cdn-icons-png.flaticon.com/512/825/825508.png",
              }}
              style={styles.coinImage}
            />

            <Text style={styles.coinSymbol}>
              {coin.symbol?.toUpperCase()}
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

        <Text style={styles.entryLabel}>
          Entry
        </Text>

        <Text style={styles.entryPrice}>
          ${coin.price?.toLocaleString()}
        </Text>

        <View style={styles.profitBox}>
          <Text style={styles.profitText}>
            {Math.abs(
              coin.priceChangePercentage24h || 0
            ).toFixed(2)}% Expected profit
          </Text>
        </View>

      </TouchableOpacity>
    );

  })}

</ScrollView>

</View>


{/* MARKET CARDS */}

<View style={styles.marketCardsContainer}>

  {expertCoins.slice(0, 1).map((coin, index) => {

    const isNegative =
      coin?.priceChangePercentage24h < 0;

    const graphData = [
      coin.price + 1200,
      coin.price + 900,
      coin.price + 700,
      coin.price + 300,
      coin.price - 100,
      coin.price + 200,
      coin.price - 400,
      coin.price - 250,
    ];

    return (

      <View
        key={index}
        style={styles.marketCard}
      >

        {/* HEADER */}

        <View style={styles.marketHeader}>

          <View style={styles.marketCoinRow}>

            <Image
              source={{
                uri:
                  coin.image ||
                  "https://cdn-icons-png.flaticon.com/512/825/825508.png",
              }}
              style={styles.marketCoinImage}
            />

            <View>

              <Text style={styles.marketCoinName}>
                {coin.name}
              </Text>

              <Text style={styles.marketCoinSymbol}>
                {coin.symbol?.toUpperCase()}
              </Text>

            </View>

          </View>

          <View
            style={[
              styles.marketBadge,
              {
                backgroundColor: isNegative
                  ? "#FFE5EA"
                  : "#E7FFF1",
              },
            ]}
          >

            <Text
              style={{
                color: isNegative
                  ? "#FF4D6D"
                  : "#00C853",
                fontWeight: "700",
              }}
            >
              {isNegative ? "Bearish" : "Bullish"}
            </Text>

          </View>

        </View>

        {/* PRICE */}

        <View style={styles.priceSection}>

          <Text style={styles.marketPrice}>
            ${coin?.price?.toLocaleString()}
          </Text>

          <Text
            style={[
              styles.marketChange,
              {
                color: isNegative
                  ? "#FF4D6D"
                  : "#00C853",
              },
            ]}
          >
            {isNegative ? "▼" : "▲"}{" "}
            {Math.abs(
              coin.priceChangePercentage24h || 0
            ).toFixed(2)}
            %
          </Text>

        </View>

        {/* GRAPH */}

        <LineChart
          data={{
            datasets: [
              {
                data: graphData,
              },
            ],
          }}
          width={300}
          height={100}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withShadow={false}
          transparent
          bezier
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: () =>
              isNegative
                ? "#FF4D6D"
                : "#00C853",
            strokeWidth: 3,
            propsForBackgroundLines: {
              stroke: "transparent",
            },
          }}
          style={{
            marginTop: 20,
            borderRadius: 20,
          }}
        />

      </View>
    );
  })}
</View>

      </ScrollView>

    </View>
  );
}
 


  {/* TRANSACTION HEADER */}
        {/* <View style={styles.transactionsHeader}>

  <Text style={styles.transactionsTitle}>
    Recent Transactions
  </Text>


  {transactionsList.length > 5 && (

    <TouchableOpacity
      onPress={() => {

        if (showAll) {

          setShowAll(false);
          setVisibleCount(10);

        } else {

          setShowAll(true);
          setVisibleCount(10);

        }

      }}
    >

      <Text style={styles.viewAllText}>
        {showAll ? "Show Less ›" : "View All ›"}
      </Text>

    </TouchableOpacity>

  )}

</View>

        {transactionsList?.length > 0 ? (

          <>

       <View
              style={[
                styles.transactionsList,
                {
                  minHeight: 300,
                },
              ]}
            >

              {displayedTransactions.map((transaction, index) => (

                <TouchableOpacity
                  key={index}
                  style={styles.transactionItem}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("TransactionDetailScreen", {
                      transaction_id: transaction?.id,
                    })
                  }
                >

               
                  <View style={styles.transactionLeft}>

                    <View
                      style={[
                        styles.transactionAvatar,
                        {
                          backgroundColor:
                            transaction.status === "failed"
                              ? "#FEE2E2"
                              : transaction.amount > 0
                              ? "#56F27B"
                              : "#E5E7EB",
                        },
                      ]}
                    >

                      {transaction.status === "failed" ? (

                        <Icon name="alert-circle" size={18} color="red" />

                      ) : transaction.amount > 0 ? (

                        <Icon name="arrow-down" size={18} color="black" />

                      ) : (

                        <Icon name="arrow-up-right" size={18} color="black" />

                      )}

                    </View>

                    <View style={styles.transactionInfo}>

                      <Text style={styles.transactionName}>
                        {transaction.name}
                      </Text>

                      <Text style={styles.transactionTime}>
                        {new Date(transaction.createdAt).toLocaleString()}
                      </Text>

                    </View>

                  </View>

                 
                  <View style={styles.amountBlock}>

                    <View style={styles.amountRow}>

                      <Text
                        style={[
                          styles.transactionAmount,
                          transaction.amount > 0
                            ? styles.amountPositive
                            : styles.amountNegative,
                        ]}
                      >

                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount}

                      </Text>

                    </View>

                    <Text
                      style={[
                        styles.statusText,
                        transaction.status === "failed" && { color: "red" },
                      ]}
                    >

                      {transaction.status === "failed"
                        ? "Failed"
                        : transaction.amount > 0
                        ? "Received"
                        : "Sent"}

                    </Text>

                  </View>

                </TouchableOpacity>

              ))}

            </View>

            
            {showAll && visibleCount < transactionsList.length && (

              <TouchableOpacity
                onPress={() => setVisibleCount(visibleCount + 10)}
                style={{
                  backgroundColor: '#F5E98B',
                  alignSelf: 'center',
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 25,
                  marginTop: 15,
                  marginBottom: 40,
                }}
              >

                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 15,
                  }}
                >
                  View More
                </Text>

              </TouchableOpacity>

            )}

            
            {!showAll && totalPages > 1 ? (

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -105,
                  marginBottom: 55,
                }}
              >

                {currentPage > 1 && (

                  <TouchableOpacity
                    onPress={() => setCurrentPage(currentPage - 1)}
                    style={{
                      width: 34,
                      height: 34,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 6,
                    }}
                  >

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 26,
                        fontWeight: "300",
                      }}
                    >
                      ‹
                    </Text>

                  </TouchableOpacity>

                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >

                  {getVisiblePages().map((page) => (

                    <TouchableOpacity
                      key={page}
                      onPress={() => setCurrentPage(page)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          currentPage === page
                            ? "#fff"
                            : "transparent",
                        marginHorizontal: 2,
                      }}
                    >

                      <Text
                        style={{
                          color:
                            currentPage === page
                              ? "#000"
                              : "#fff",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        {page}
                      </Text>

                    </TouchableOpacity>

                  ))}

                </View>

                {currentPage < totalPages && (

                  <TouchableOpacity
                    onPress={() => setCurrentPage(currentPage + 1)}
                    style={{
                      width: 34,
                      height: 34,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 6,
                    }}
                  >

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 26,
                        fontWeight: "300",
                      }}
                    >
                      ›
                    </Text>

                  </TouchableOpacity>

                )}

              </View>

            ) : null}

          </>

        ) : (

          <View style={{ alignItems: 'center', marginTop: 50 }}>

            <Icon name="file-text" size={60} color="#c4b5fd" />

            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                marginTop: 15,
              }}
            >
              No Transactions Found
            </Text>

            <Text
              style={{
                color: '#d1d5db',
                fontSize: 14,
                marginTop: 6,
              }}
            >
              Your transaction history will appear here
            </Text>

          </View>

        )} */}


        {/* EXPERT PICKS */}
 
