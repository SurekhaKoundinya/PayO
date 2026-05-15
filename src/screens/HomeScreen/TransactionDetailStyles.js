import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
container: {
  flex: 1,
  paddingHorizontal: 18,
 
   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  paddingBottom: 20,
},

  // header: {
  //   height: 50,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "relative",

  // },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
    
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

  /* SECTION */

  section: {
    marginBottom: 18,
    paddingTop: 30
  },

  smallLabel: {

    color: "#bbb",

    fontSize: 12,

    marginBottom: 8,

  },

  /* ROWS */

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  userRow: {

    flexDirection: "row",

    alignItems: "center",

    flex: 1,

  },

  iconBox: {

    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: "#fff",

    alignItems: "center",

    justifyContent: "center",

  },

  name: {

    color: "#fff",

    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    width: "70%",

    marginLeft: 10,

    flexShrink: 1,

    fontWeight: "500",

  },

  amount: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",

  },

  payo: {

    fontSize: 12,

    color: "#bbb",

  },
  timeText: {
    fontSize: 12,
    color: "#f7f4f4",
    marginTop: 2,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#f7f4f4",
    marginTop: 2,
    marginLeft: 10,
  },
  /* DIVIDER */

  divider: {

    height: 1,

    backgroundColor: "rgba(255,255,255,0.1)",

    marginVertical: 15,

  },

  /* PAYMENT DETAILS */

  paymentHeader: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 10,

  },

  paymentTitle: {

    color: "#ddd",

    fontSize: 14,

    marginLeft: 8,

    fontWeight: "500",

  },

  label: {

    color: "#f1e7e7",

    fontSize: 12,

    marginTop: 10,

  },

  valueRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 4,

  },

  value: {

    color: "#0fe93e",

    fontSize: 14,

    flex: 1,

    marginRight: 10,

  },

  /* ACTIONS */

 /* ACTIONS */

actionsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  paddingTop: 20,
  borderTopWidth: 1,
  borderTopColor: "rgba(255,255,255,0.15)",
},

actionItem: {
  alignItems: "center",
  justifyContent: "center",
  width: "24%",
},

circle: {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: "#F2F2F2",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
},

actionText: {
  color: "#fff",
  fontSize: 11,
  textAlign: "center",
  marginTop: 2,
  lineHeight: 15,
},

  /* OPTIONAL: RECEIPT CARD (for better screenshot UI) */

  receiptCard: {

    backgroundColor: "#1E1E2D",

    borderRadius: 16,

    padding: 16,

  },

});
