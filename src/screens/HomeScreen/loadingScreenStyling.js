import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },

  loaderRow: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },

  dot: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: '#000',
    marginHorizontal: wp('1.5%'),
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: hp('1%'),
    lineHeight: moderateScale(26),
  },

  subtitle: {
    fontSize: moderateScale(13),
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});