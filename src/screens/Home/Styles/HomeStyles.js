import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  moderateScale,
} from 'react-native-size-matters';

const screenWidth =
  Dimensions.get('window').width;

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  scrollContent: {
    paddingBottom: moderateScale(30),
  },

  balanceCard: {
    backgroundColor: '#5A00D1',
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
  },

  balanceLabel: {
    color: '#fff',
    fontSize: moderateScale(14),
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },

  balanceAmount: {
    color: '#fff',
    fontSize: moderateScale(28),
    fontWeight: '700',
  },

  section: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('4%'),
  },

  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222',
    marginBottom: hp('1.5%'),
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionBtn: {
    backgroundColor: '#5A00D1',
    width: wp('27%'),
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(13),
    marginTop: 5,
  },

  transactionCard: {
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  transactionText: {
    fontSize: moderateScale(14),
    color: '#222',
    fontWeight: '600',
  },

  transactionAmount: {
    fontSize: moderateScale(14),
    color: '#5A00D1',
    fontWeight: '700',
  },

});