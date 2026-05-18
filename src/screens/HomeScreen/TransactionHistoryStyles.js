import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 110,
  },
  
   container1: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },
 
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    
  },
 
  back: {
    color: '#fff',
    fontSize: 22,
    marginRight: 14,
  },
 
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    
  },
 
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
 
  activeFilter: {
    backgroundColor: '#22c55e',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginRight: 10,
    fontSize: 12,
    fontWeight: '600',
  },
 
  dropdown: {
    width: 110,
    height: 36,
    backgroundColor: '#4c1d95',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
 
  dropdownText: {
    color: '#fff',
    fontSize: 12,
  },
 
  section: {
    color: '#c4b5fd',
    marginTop: 16,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 13,
  },
 
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
 
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
 
  name: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
 
  time: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 3,
  },
 
  right: {
    alignItems: 'flex-end',
  },
 
  amount: {
    fontWeight: '700',
    fontSize: 15,
  },
 
  status: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 3,
    textTransform: 'capitalize',
  },


  historySection: {
  color: "#6b7280",
  marginTop: 28,
  marginBottom: 18,
  fontWeight: "700",
  fontSize: 15,
  letterSpacing: 3,
  textTransform: "uppercase",
},

historyCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#ececec",
},

historyLeft: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
},

historyIconBox: {
  width: 48,
  height: 48,
  borderRadius: 16,
  backgroundColor: "#f7faff",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 16,
},

historyUserInfo: {
  flex: 1,
},

historyTypeText: {
  color: "#c6cedd",
  fontSize: 12,
  marginBottom: 2,
},

historyUserName: {
  color: "#fafafa",
  fontSize: 16,
  fontWeight: "500",
},

historyDateText: {
  color: "#9ca3af",
  fontSize: 12,
  marginTop: 8,
},

historyAmountContainer: {
  alignItems: "flex-end",
},

historyAmountText: {
  fontSize: 20,
  fontWeight: "700",
},

historyStatusText: {
  color: "#9ca3af",
  fontSize: 14,
  marginTop: 10,
},
});