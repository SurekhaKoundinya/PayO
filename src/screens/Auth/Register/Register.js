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
    backgroundColor: '#F2F2F2',
  },

  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },

  titleCentered: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginLeft: wp('3%'),
    color: '#000',
  },

  errorText: {
    color: 'red',
    fontSize: moderateScale(13),
    marginBottom: hp('1.2%'),
    textAlign: 'center',
  },

  desc: {
    textAlign: 'center',
    color: '#555',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('3%'),
  },

  label: {
    fontSize: moderateScale(12),
    marginBottom: hp('0.8%'),
    marginTop: hp('0.5%'),
    fontWeight: '700',
    color: '#000',
  },

  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  codeBox: {
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfcdcd',
  },

  codeText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#000',
  },

  input: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    fontSize: moderateScale(15),
    color: '#000',
  },

  button: {
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: hp('4%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },

  link: {
    color: '#5A00D1',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  loginText: {
    marginTop: hp('3%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(14),
  },

  registerText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: '#555',
    fontSize: moderateScale(14),
  },

  footer: {
    marginTop: hp('1.5%'),
    textAlign: 'center',
    color: '#555',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    paddingHorizontal: wp('5%'),
  },

});