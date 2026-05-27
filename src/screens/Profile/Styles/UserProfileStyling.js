import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b007a',
    paddingHorizontal: wp('5%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: hp('7%'),
    marginTop: hp('1%'),
  },

  back: {
    color: '#fff',
    fontSize: moderateScale(20),
  },

  title: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  profileSection: {
    alignItems: 'center',
    marginVertical: hp('2.5%'),
  },

  profileCircle: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(45),
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1.2%'),
  },

  profileText: {
    fontSize: moderateScale(30),
  },

  phone: {
    color: '#fff',
    marginTop: hp('0.5%'),
    fontSize: moderateScale(14),
  },

  verified: {
    color: '#00ff99',
    fontSize: moderateScale(12),
    marginTop: hp('0.5%'),
  },

  balanceCard: {
    backgroundColor: '#111',
    borderRadius: moderateScale(15),
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    alignItems: 'center',
  },

  label: {
    color: '#aaa',
    fontSize: moderateScale(12),
  },

  balance: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  token: {
    color: '#00ff99',
    fontSize: moderateScale(12),
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactions: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  divider: {
    width: 1,
    backgroundColor: '#333',
    height: hp('6%'),
  },

  referralBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    padding: wp('4%'),
    borderRadius: moderateScale(12),
    marginBottom: hp('2%'),
  },

  refLabel: {
    color: '#ccc',
    fontSize: moderateScale(13),
  },

  refCode: {
    color: '#fff',
    fontWeight: '700',
    marginTop: hp('0.6%'),
    fontSize: moderateScale(14),
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    flexWrap: 'wrap',
  },

  btn: {
    backgroundColor: '#5e2bb8',
    paddingVertical: hp('1.6%'),
    borderRadius: moderateScale(10),
    width: '48%',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: moderateScale(13),
  },

  addBankBtn: {
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
    backgroundColor: '#5e2bb8',
    borderRadius: moderateScale(16),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addBankText: {
    flex: 1,
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: wp('4%'),
  },

  sectionTitle: {
    color: '#fff',
    marginBottom: hp('1.2%'),
    marginTop: hp('1.2%'),
    fontSize: moderateScale(15),
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#6a1bb9',
    padding: wp('4%'),
    borderRadius: moderateScale(15),
    marginBottom: hp('1.8%'),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.2%'),
    alignItems: 'flex-start',
  },

  item: {
    color: '#fff',
    fontSize: moderateScale(13),
  },

  labelItem: {
    color: '#ccc',
    fontSize: moderateScale(13),
    width: '35%',
  },

  value: {
    color: '#ccc',
    fontSize: moderateScale(12),
    width: '60%',
    textAlign: 'right',
  },

  arrow: {
    color: '#fff',
  },

  green: {
    color: '#00ff99',
    fontSize: moderateScale(13),
  },

  logoutBtn: {
    marginTop: hp('2%'),
    marginBottom: hp('18%'),
    borderWidth: 1.5,
    borderColor: '#ff4d4d',
    paddingVertical: hp('1.8%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  logoutText: {
    color: '#ff4d4d',
    fontWeight: '700',
    fontSize: moderateScale(16),
  },

// logoutText: {
//   color: '#ff4d4d',
//   fontWeight: '700',
//   fontSize: 16,
// },


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
 
