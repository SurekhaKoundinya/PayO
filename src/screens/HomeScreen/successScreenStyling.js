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

  iconContainer: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('14%'),

    backgroundColor: '#2ED573',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: hp('4%'),

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  check: {
    fontSize: moderateScale(44),
    color: '#fff',
    fontWeight: 'bold',
  },

  textWrapper: {
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#fff',
    marginBottom: hp('1.2%'),
    textAlign: 'center',
  },

  subtitle: {
    fontSize: moderateScale(15),
    color: '#fff',
    opacity: 0.95,
    marginBottom: hp('1%'),
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },

  time: {
    fontSize: moderateScale(13),
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});