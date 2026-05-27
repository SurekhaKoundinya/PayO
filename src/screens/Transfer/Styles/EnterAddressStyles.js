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
    paddingBottom: hp('18%'),
  },

  title: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '600',
    marginBottom: hp('3%'),
  },

  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: hp('0.8%'),
    marginTop: hp('1.8%'),
    fontSize: moderateScale(13),
  },

  input: {
    borderWidth: 1,
    borderColor: '#7A5DB0',
    borderRadius: moderateScale(14),
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    color: '#fff',
    marginBottom: hp('0.8%'),
    backgroundColor: 'rgba(255,255,255,0.05)',
    fontSize: moderateScale(14),
  },

  infoText: {
    color: '#aaa',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
  },

  successText: {
    color: '#00FFAA',
    marginBottom: hp('1%'),
    fontSize: moderateScale(13),
    fontWeight: '500',
  },

  errorText: {
    color: '#FF4D4D',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7A5DB0',
    borderRadius: moderateScale(14),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.5%'),
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  amountInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: hp('1.6%'),
    fontSize: moderateScale(16),
  },

  token: {
    color: '#00FFAA',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    marginBottom: hp('2.5%'),
    flexWrap: 'wrap',
  },

  quickBtn: {
    backgroundColor: '#E5E5E5',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4.5%'),
    borderRadius: moderateScale(10),
    marginBottom: hp('1%'),
    minWidth: wp('18%'),
    alignItems: 'center',
  },

  quickText: {
    color: '#000',
    fontWeight: '500',
    fontSize: moderateScale(13),
  },

  balanceBox: {
    backgroundColor: '#7B3FE4',
    borderRadius: moderateScale(14),
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },

  balanceText: {
    color: '#fff',
    fontSize: moderateScale(12),
  },

  balanceAmount: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(14),
    minWidth: wp('30%'),
    textAlign: 'right',
  },

  button: {
    backgroundColor: '#0AA84F',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
});