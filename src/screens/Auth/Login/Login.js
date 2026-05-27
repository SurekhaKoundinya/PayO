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
    backgroundColor: '#EAEAEA',
  },

  internetBar: {
    width: '100%',
    backgroundColor: '#ff0000',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  internetText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    flexGrow: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },

  backButton: {
    padding: moderateScale(4),
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
    marginTop: hp('1%'),
    marginBottom: hp('4%'),
    color: '#666',
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('3%'),
  },

  messageText: {
    color: 'red',
    marginBottom: hp('1.5%'),
    textAlign: 'center',
    fontSize: moderateScale(12),
  },

  label: {
    fontSize: moderateScale(12),
    color: '#333',
    marginBottom: hp('0.7%'),
    fontWeight: '700',
    paddingLeft: wp('1%'),
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: moderateScale(14),
    color: '#000',
    marginBottom: hp('1%'),
  },

  passwordContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    fontSize: moderateScale(14),
    color: '#000',
  },

  errorInput: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    marginBottom: hp('1%'),
    fontSize: moderateScale(11),
  },

  forgot: {
    textAlign: 'right',
    marginTop: hp('1%'),
    color: '#5A00D1',
    fontSize: moderateScale(12),
  },

  button: {
    backgroundColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: hp('3%'),
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  or: {
    marginHorizontal: wp('3%'),
    color: '#777',
    fontSize: moderateScale(13),
  },

  otpBtn: {
    borderWidth: 2,
    borderColor: '#5A00D1',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  disabledOtpBtn: {
    opacity: 0.5,
  },

  otpText: {
    color: '#5A00D1',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  registerText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#555',
    fontSize: moderateScale(13),
  },

  link: {
    color: '#5A00D1',
    fontWeight: '600',
  },

});