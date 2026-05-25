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

  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    minHeight: hp('5%'),
  },

  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1.5%'),
  },

  back: {
    fontSize: moderateScale(20),
    color: '#000',
  },

  title: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#6D28D9',
    textAlign: 'center',
    marginBottom: hp('1.2%'),
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: hp('4%'),
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('4%'),
  },

  label: {
    marginBottom: hp('0.8%'),
    fontWeight: '600',
    color: '#333',
    fontSize: moderateScale(13),
    marginTop: hp('1%'),
  },

  errorText: {
    color: 'red',
    fontSize: moderateScale(12),
    marginTop: hp('0.3%'),
    marginBottom: hp('1.2%'),
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: hp('2.2%'),
    paddingRight: wp('1.5%'),
  },

  textInput: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
    color: '#000',
    fontSize: moderateScale(14),
  },

  inlineBtn: {
    backgroundColor: '#6D28D9',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3.2%'),
    borderRadius: moderateScale(10),
    minWidth: wp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  inlineBtnText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(10),
    paddingHorizontal: wp('3.5%'),
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
  },

  passwordInput: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    fontSize: moderateScale(14),
    color: '#000',
  },

  button: {
    backgroundColor: '#0A8F3C',
    paddingVertical: hp('2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(15),
  },
});