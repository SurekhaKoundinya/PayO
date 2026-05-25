import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
  },

  headerRow: {
    minHeight: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: hp('2%'),
  },

  backBtn: {
    position: 'absolute',
    left: wp('2%'),
  },

  back: {
    fontSize: moderateScale(22),
    color: '#fff',
  },

  header: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#fff',
  },

  card: {
    backgroundColor: '#6a1bb9',
    padding: wp('6%'),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },

  icon: {
    fontSize: moderateScale(30),
    marginBottom: hp('1.2%'),
  },

  earn: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginBottom: hp('1.2%'),
    textAlign: 'center',
  },

  desc: {
    color: '#ddd',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    fontSize: moderateScale(13),
  },

  codeBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    padding: wp('4.5%'),
    borderRadius: moderateScale(12),
    marginBottom: hp('2.5%'),
  },

  codeLabel: {
    color: '#ccc',
    marginBottom: hp('0.8%'),
    fontSize: moderateScale(12),
  },

  code: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2.5%'),
    flexWrap: 'wrap',
  },

  btn: {
    backgroundColor: '#5e2bb8',
    paddingVertical: hp('1.6%'),
    borderRadius: moderateScale(10),
    width: '48%',
    alignItems: 'center',
    minHeight: hp('6%'),
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },

  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: moderateScale(13),
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2.5%'),
    flexWrap: 'wrap',
  },

  statBox: {
    backgroundColor: '#6a1bb9',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: moderateScale(15),
    width: '48%',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  statValue: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  statValueGreen: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  statLabel: {
    color: '#ddd',
    fontSize: moderateScale(12),
    marginTop: hp('0.5%'),
    textAlign: 'center',
  },

  info: {
    marginTop: hp('1%'),
  },

  infoTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: hp('1.2%'),
    fontSize: moderateScale(14),
  },

  infoText: {
    color: '#ccc',
    marginBottom: hp('0.8%'),
    lineHeight: moderateScale(20),
    fontSize: moderateScale(13),
  },
});