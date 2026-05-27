import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContent: {
    paddingBottom: hp('18%'),
    flexGrow: 1,
  },

  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    marginTop: hp('1%'),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: wp('3%'),
  },

  cancelContainer: {
    marginRight: wp('3%'),
    paddingTop: hp('0.3%'),
  },

  walletTitle: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },

  walletId: {
    color: '#d1d5db',
    fontSize: moderateScale(11),
    marginTop: hp('0.4%'),
    maxWidth: wp('52%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
  },

  walletNumber: {
    color: '#fff',
    fontSize: moderateScale(13),
    marginTop: hp('0.4%'),
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: '#fff',
    marginLeft: wp('2.5%'),
  },

  card: {
    backgroundColor: '#6A1B9A',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2.5%'),
    padding: wp('5%'),
    borderRadius: moderateScale(22),
  },

  active: {
    color: '#00E5FF',
    marginBottom: hp('1%'),
    fontSize: moderateScale(13),
  },

  label: {
    color: '#ccc',
    fontSize: moderateScale(12),
  },

  balance: {
    color: '#fff',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    marginTop: hp('0.8%'),
    flexWrap: 'wrap',
  },

  actions: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    flexWrap: 'wrap',
  },

  btnWhite: {
    backgroundColor: '#fff',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: moderateScale(10),
    marginRight: wp('3%'),
    marginBottom: hp('1%'),
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: moderateScale(10),
    marginBottom: hp('1%'),
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginTop: hp('1%'),
  },

  sectionTitle: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  history: {
    color: '#00E5FF',
    fontSize: moderateScale(13),
  },

  box: {
    backgroundColor: '#eee',
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    padding: wp('4.5%'),
    borderRadius: moderateScale(14),
  },

  boxTitle: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: '#111',
  },

  amount: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    color: '#111',
  },

  pending: {
    fontSize: moderateScale(10),
    textAlign: 'right',
    marginTop: hp('0.4%'),
  },

  locked: {
    marginTop: hp('1%'),
    color: '#777',
    fontSize: moderateScale(12),
  },

  limit: {
    color: '#16a34a',
    fontWeight: '600',
  },

  progressBg: {
    height: hp('0.8%'),
    backgroundColor: '#ccc',
    borderRadius: moderateScale(10),
    marginVertical: hp('1.2%'),
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: moderateScale(10),
  },

  subText: {
    fontSize: moderateScale(11),
    color: '#666',
  },

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
  },

  freezeBtn: {},

  freezeText: {
    color: '#fff',
    fontWeight: '600',
  },

  sendBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: moderateScale(12),
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(13),
  },
});