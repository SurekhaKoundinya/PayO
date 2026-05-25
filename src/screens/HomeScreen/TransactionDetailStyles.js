import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('5%'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2.5%'),
  },

  header: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginLeft: wp('3%'),
    flex: 1,
  },

  receiptCard: {
    backgroundColor: '#1E1E2D',
    borderRadius: moderateScale(18),
    padding: wp('4.5%'),
  },

  section: {
    marginBottom: hp('1.5%'),
  },

  smallLabel: {
    color: '#bbb',
    fontSize: moderateScale(12),
    marginBottom: hp('1%'),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp('3%'),
  },

  iconBox: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(17),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginLeft: wp('3%'),
    maxWidth: wp('42%'),
    textTransform: 'capitalize',
  },

  timeText: {
    color: '#ddd',
    fontSize: moderateScale(10),
    marginTop: hp('0.4%'),
    marginLeft: wp('3%'),
    maxWidth: wp('45%'),
  },

  amount: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '700',
    textAlign: 'right',
    maxWidth: wp('30%'),
  },

  payo: {
    color: '#bbb',
    fontSize: moderateScale(11),
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: hp('2%'),
  },

  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.2%'),
  },

  paymentTitle: {
    color: '#ddd',
    fontSize: moderateScale(14),
    marginLeft: wp('2%'),
    fontWeight: '600',
  },

  label: {
    color: '#f1e7e7',
    fontSize: moderateScale(12),
    marginTop: hp('1%'),
  },

  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('0.7%'),
  },

  value: {
    color: '#0fe93e',
    fontSize: moderateScale(13),
    flex: 1,
    marginRight: wp('3%'),
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp('3%'),
    paddingTop: hp('2.5%'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },

  actionItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp('1%'),
  },

  circle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  actionText: {
    color: '#fff',
    fontSize: moderateScale(10),
    textAlign: 'center',
    lineHeight: moderateScale(14),
  },
});