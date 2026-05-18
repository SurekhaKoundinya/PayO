import { StatusBar, StyleSheet,Platform} from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b007a',
    padding: 20,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingBottom:100
    
  },
 
  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 
  back: {
    color: '#fff',
    fontSize: 20,
  },
 
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
 
  /* PROFILE */
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
 
  profileCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  personalHeading: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 10
},

labelItem: {
  color: "#ccc",
  fontSize: 14
},
 
  profileText: {
    fontSize: 30,
  },
 
  phone: {
    color: '#fff',
    marginTop: 5,
  },
 
  verified: {
    color: '#00ff99',
    fontSize: 12,
    marginTop: 5,
  },
 
  /* BALANCE */
  balanceCard: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
 
  label: {
    color: '#aaa',
    fontSize: 12,
  },
 
  balance: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
 
  token: {
    color: '#00ff99',
    fontSize: 12,

  },

  transactionRow: {
  flexDirection: "row",
  alignItems: "center",
},
 
  transactions: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign:"center"
  },
 
  divider: {
    width: 1,
    backgroundColor: '#333',
  },
 
  /* REFERRAL */
  referralBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
 
  refLabel: {
    color: '#ccc',
  },
 
  refCode: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 5,
  },
 
  /* BUTTONS */
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
 
  btn: {
    backgroundColor: '#5e2bb8',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
 
  btnText: {
    color: '#fff',
  },

    addBankBtn: {
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: '#5e2bb8',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // opacity:0.6
  },

  addBankText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 14,
  },
 
  /* SECTION */
  sectionTitle: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
 
  card: {
    backgroundColor: '#6a1bb9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
 
  item: {
    color: '#fff',
  },
 
  value: {
    color: '#ccc',
  },
 
  arrow: {
    color: '#fff',
  },
 
  green: {
    color: '#00ff99',
  },
logoutBtn: {
  marginTop: 20,
  borderWidth: 1.5,
  borderColor: '#ff4d4d',
  padding: 15,
  borderRadius: 12,
  alignItems: 'center',
  backgroundColor: 'transparent'
},

logoutText: {
  color: '#ff4d4d',
  fontWeight: '700',
  fontSize: 16,
},


bankCard: {
  backgroundColor: "#6a1bb9",
  borderRadius: 14,
  padding: 15,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10
},

bankLeft: {
  flexDirection: "row",
  alignItems: "center"
},

bankIcon: {
  width: 36,
  height: 36,
  borderRadius: 8,
  backgroundColor: "#5e2bb8",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12
},

bankName: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "600"
},

bankSub: {
  color: "#ccc",
  fontSize: 12
},
});
 