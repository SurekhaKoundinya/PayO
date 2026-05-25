import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('16%'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },

  back: {
    color: '#fff',
    marginRight: wp('3%'),
  },

  header: {
    color: '#fff',
    fontSize: moderateScale(21),
    fontWeight: '700',
    justifyContent: 'center',
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    flexWrap: 'wrap',
  },

  activeFilter: {
    backgroundColor: '#22c55e',
    color: '#fff',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: moderateScale(20),
    marginRight: wp('2.5%'),
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },

  dropdown: {
    minWidth: wp('28%'),
    height: hp('4.5%'),
    backgroundColor: '#4c1d95',
    borderRadius: moderateScale(20),
    paddingHorizontal: wp('3%'),
    marginRight: wp('2.5%'),
    marginBottom: hp('1%'),
    justifyContent: 'center',
  },

  dropdownText: {
    color: '#fff',
    fontSize: moderateScale(11),
  },

  section: {
    color: '#c4b5fd',
    marginTop: hp('2%'),
    marginBottom: hp('1.2%'),
    fontWeight: '600',
    fontSize: moderateScale(13),
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('2%'),
  },

  avatar: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },

  name: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(14),
    maxWidth: wp('45%'),
  },

  time: {
    color: '#9ca3af',
    fontSize: moderateScale(11),
    marginTop: hp('0.3%'),
  },

  right: {
    alignItems: 'flex-end',
    maxWidth: wp('30%'),
  },

  amount: {
    fontWeight: '700',
    fontSize: moderateScale(14),
  },

  status: {
    color: '#9ca3af',
    fontSize: moderateScale(10),
    marginTop: hp('0.3%'),
    textTransform: 'capitalize',
  },

  historySection: {
    color: '#6b7280',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    fontWeight: '700',
    fontSize: moderateScale(14),
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },

  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('2%'),
  },

  historyIconBox: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: moderateScale(16),
    backgroundColor: '#f7faff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },

  historyUserInfo: {
    flex: 1,
  },

  historyTypeText: {
    color: '#c6cedd',
    fontSize: moderateScale(11),
    marginBottom: hp('0.2%'),
  },

  historyUserName: {
    color: '#fafafa',
    fontSize: moderateScale(15),
    fontWeight: '500',
  },

  historyDateText: {
    color: '#9ca3af',
    fontSize: moderateScale(11),
    marginTop: hp('0.8%'),
  },

  historyAmountContainer: {
    alignItems: 'flex-end',
    maxWidth: wp('32%'),
  },

  historyAmountText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },

  historyStatusText: {
    color: '#9ca3af',
    fontSize: moderateScale(11),
    marginTop: hp('0.8%'),
  },
});