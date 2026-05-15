import { StatusBar, StyleSheet,Platform, Dimensions } from 'react-native';
 
export default StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#3B0A6B",
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
},
 
 
actions: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

button: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FDE68A',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 30,
  zIndex: 2, // keeps button above line
},

label: {
  marginLeft: 8,
  fontWeight: '600',
},

iconCircle: {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
},

// 🔥 MAGIC LINE
connector: {
  height: 12,
  width: 20, // adjust this for spacing
  backgroundColor: '#FDE68A',
  marginHorizontal: -2, // removes gap between button & line
  zIndex: 1,
},



 
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  alignItems: 'center',
},
walletNumber:{
  color:"white"
},
  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationIcon: {
    fontSize: 18,
    color: '#fff',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
 

cardContainer: {
  paddingHorizontal: 20,
  marginTop: 20,
    marginBottom: 10,
},



card: {
  backgroundColor: '#1C1C1E',
  borderRadius: 18,
  padding: 18,
  flexDirection: 'row',
  justifyContent: 'space-between',
  overflow: 'hidden',
  height: 180,
},


addBankButton: {
  position: 'absolute',
  bottom: 15,
  left: 15,
  backgroundColor: '#fff',
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  opacity:0.6
},

bankIcon: {
  marginRight: 6,
},

addBankText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
},

balanceLabel: {
  color: '#d8d4d4',
  fontSize: 14,
  marginBottom: 6,
  fontWeight:"700"
},

balanceRow: {
  flexDirection: 'row',
  alignItems: 'baseline', // aligns text nicely
},

balanceAmount: {
  color: '#fff',
  fontSize: 22,
  fontWeight: 'bold',
  letterSpacing: 4,
},

payoLabel: {
  color: '#22c55e',
  fontSize: 12,
  marginLeft: 6,
},


cardRight: {
  justifyContent: 'space-between',
  alignItems: 'flex-end',
},

walletRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

walletText: {
  color: '#ccc',
  marginRight: 8,
},

arrowCircle: {
  width: 26,
  height: 26,
  borderRadius: 13,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
},

/* Decorative shapes */

topRightCurve: {
  position: 'absolute',
  top: -20,
  right: -20,
  width: 90,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#F59E0B',
},

bottomLeftCurve: {
  position: 'absolute',
  bottom: -25,
  left: -25,
  width: 90,
  height: 90,
  borderRadius: 40,
  // backgroundColor: '#E5E7EB',
},

cardFooter: {
  marginTop: 10,
},

walletLabel: {
  color: '#aaa',
  fontSize: 12,
},

   headerContent: {
    paddingTop: 40,        // space from top (status bar)
    paddingBottom: 40,     // space before tabs
    paddingHorizontal: 20,
    alignItems: 'center',  // center text horizontally
  },

  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',   // important for long text
    lineHeight: 24,        // better readability
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#4B1FA7',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-between',
  },

  tab: {
    color: '#cbb6ff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 13,
  },

  activeTab: {
    color: '#000',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 13,
    fontWeight: '600',
  },

  /* CONTENT AREA */
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },

 
  /* ACTION BUTTONS (FIXED LIKE FIGMA) */
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },


actionButton: {
  backgroundColor: '#FDE68A',
  paddingVertical: 12,
  paddingHorizontal: 22,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  elevation: 3,
},
  actionWrapper: {
    alignItems: 'center',
  },
  
  actionIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  actionLabel: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },

statsContainer: {
  marginTop: 20,
  paddingHorizontal: 20,
},

statsCard: {
  backgroundColor: "#1C1C1E",
  borderRadius: 16,
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden"
  
},

statItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

textBlock: {
  flexDirection: "column",
},

statLabel: {
  color: "#aaa",
  fontSize: 12,
},

amountRow: {
  flexDirection: "row",
  alignItems: "flex-end",
},

statValue: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 18,
},

unit: {
  color: "#53D258",
  fontSize: 10,
  marginLeft: 4,
},

divider: {
  width: 1,
  height: 35,
  backgroundColor: "#444",
},

cornerLeft: {
  position: "absolute",
  width: 30,
  height: 30,
  backgroundColor: "#fff",
  borderRadius: 15,
  bottom: -10,
  left: 10,
  opacity: 0.2
},

cornerRight: {
  position: "absolute",
  width: 30,
  height: 30,
  backgroundColor: "#fff",
  borderRadius: 15,
  top: -10,
  right: 10,
  opacity: 0.2
},
  /* TRANSACTIONS */
  transactionsHeader: {
    marginTop: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  viewAllText: {
    color: '#FDE68A',
      fontSize: 14,
  fontWeight: "600",
  },
 
  transactionsList: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 120,
  },

  noTransactionContainer: {
  height:250,
  justifyContent: "center",
  alignItems: "center",
},

noTransactionText: {
  fontSize: 16,
  color: "#999",
  textAlign: "center",
},
 
transactionItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
},

transactionLeft: {
  flexDirection: "row",
  alignItems: "center",
},

transactionAvatar: {
  width: 28,
  height: 28,
  borderRadius: 14,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

transactionInfo: {
  flexDirection: "column",
},

transactionName: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
    textTransform: "capitalize",

},

transactionTime: {
  color: "#C7B8FF",
  fontSize: 11,
},

amountBlock: {
  alignItems: "flex-end",
},

amountRow: {
  flexDirection: "row",
  alignItems: "flex-end",
},

transactionAmount: {
  fontSize: 18,
  fontWeight: "bold",
},

payo: {
  fontSize: 9,
  color: "#8AFF9C",
  marginLeft: 3,
},

amountPositive: {
  color: "#56F27B",
},

amountNegative: {
  color: "#FF6B6B",
},

statusText: {
  fontSize: 10,
  color: "#C7B8FF",
},

expertContainer: {
  paddingHorizontal: 20,
  marginTop: 40,

},

expertHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
},

// viewAllText: {
//   color: "#4F46E5",
//   fontSize: 14,
//   fontWeight: "600",
// },

expertTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 15,
},

expertCard: {
  width: 170,
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 12,
  marginRight: 14,
},

expertTopRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

coinInfo: {
  flexDirection: "row",
  alignItems: "center",
},

coinImage: {
  width: 26,
  height: 26,
  marginRight: 6,
},

coinSymbol: {
  fontWeight: "700",
  fontSize: 14,
},

badge: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
},

longBadge: {
  backgroundColor: "#22c55e",
},

shortBadge: {
  backgroundColor: "#ef4444",
},

badgeText: {
  color: "#fff",
  fontSize: 11,
  fontWeight: "600",
},

entryLabel: {
  marginTop: 12,
  color: "#6b7280",
  fontSize: 12,
},

entryPrice: {
  fontSize: 15,
  fontWeight: "700",
},

profitBox: {
  marginTop: 12,
  backgroundColor: "#ecfdf5",
  padding: 6,
  borderRadius: 8,
},

profitText: {
  color: "#16a34a",
  fontWeight: "700",
},

  /* BOTTOM NAV */
 bottomNav: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 85,
  backgroundColor: '#2E1065',
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingBottom: 10,
},
  navItem: {
    alignItems: 'center',
    marginLeft:30
  },
 
  navIcon: {
    fontSize: 20,
  },
 
  navLabel: {
    fontSize: 10,
    marginTop: 4,
  },
 
  navActive: {
    color: '#F472B6',
  },
 
  navInactive: {
    color: '#aaa',
  },
 
  /* CENTER BUTTON */
centerIcon: {
  width: 65,
  height: 65,
  borderRadius: 35,
  backgroundColor: '#7C3AED',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: -40,
  alignSelf: 'center',
  elevation: 10,
},

marketCardsContainer: {
  marginTop: 25,
  paddingHorizontal: 16,
},

marketCard: {
  width: '100%',
  backgroundColor: '#fcf2bd',
  borderRadius: 30,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 5,
},

marketHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

marketCoinRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

marketCoinImage: {
  width: 55,
  height: 55,
  borderRadius: 30,
  marginRight: 14,
},

marketCoinName: {
  fontSize: 20,
  fontWeight: '700',
  color: '#111',
},

marketCoinSymbol: {
  fontSize: 15,
  color: '#888',
  marginTop: 4,
},

marketBadge: {
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 30,
},

priceSection: {
  marginTop: 16,
},

marketPrice: {
  fontSize: 28,
  fontWeight: '800',
  color: '#000',
},

marketChange: {
  marginTop: 10,
  fontSize: 18,
  fontWeight: '700',
},
});