import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({

  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },

  titleCentered: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000',
    marginRight: wp('7%'),
  },

  sub: {
    textAlign: 'center',
    marginTop: hp('2%'),
    color: '#666',
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('5%'),
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('4%'),
  },

  box: {
    width: wp('15%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: '#DADADA',
    marginHorizontal: wp('1.2%'),
    textAlign: 'center',
    fontSize: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: '#fff',
    color: '#000',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: hp('1.5%'),
    fontSize: moderateScale(12),
  },

  timer: {
    marginTop: hp('3%'),
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#444',
  },

  resend: {
    marginTop: hp('1.5%'),
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#555',
  },

  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(12),
    marginTop: hp('4%'),
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },

  loginText: {
    marginTop: hp('3%'),
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#555',
  },

  registerText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#555',
    fontSize: moderateScale(13),
  },

  footer: {
    marginTop: hp('1.5%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    paddingHorizontal: wp('4%'),
  },

});