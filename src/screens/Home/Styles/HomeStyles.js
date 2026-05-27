import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  moderateScale,
} from 'react-native-size-matters';

const screenWidth =
  Dimensions.get(
    'window',
  ).width;

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#F6F7FB',
  },

  scrollContent: {
    paddingBottom:
      moderateScale(30),
  },

  cardContainer: {
    paddingHorizontal:
      wp('5%'),
    marginTop:
      hp('2%'),
  },

  card: {
    backgroundColor:
      '#5A00D1',
    borderRadius:
      moderateScale(24),
    padding:
      moderateScale(20),
    overflow: 'hidden',
  },

  balanceLabel: {
    color: '#fff',
    fontSize:
      moderateScale(13),
  },

  balanceRow: {
    flexDirection:
      'row',
    alignItems:
      'center',
    marginTop:
      moderateScale(8),
  },

  balanceAmount: {
    color: '#fff',
    fontSize:
      moderateScale(30),
    fontWeight: '700',
  },

  payoLabel: {
    color: '#fff',
    marginLeft:
      moderateScale(10),
    fontSize:
      moderateScale(16),
    fontWeight: '600',
  },

  cardRight: {
    position:
      'absolute',
    top:
      moderateScale(20),
    right:
      moderateScale(20),
    alignItems:
      'flex-end',
  },

  walletRow: {
    flexDirection:
      'row',
    alignItems:
      'center',
    marginTop:
      moderateScale(20),
  },

  walletText: {
    color: '#fff',
    marginRight:
      moderateScale(10),
  },

  arrowCircle: {
    width:
      moderateScale(28),
    height:
      moderateScale(28),
    borderRadius:
      moderateScale(14),
    backgroundColor:
      '#fff',
    justifyContent:
      'center',
    alignItems:
      'center',
  },

  addBankButton: {
    marginTop:
      moderateScale(25),
    flexDirection:
      'row',
    alignItems:
      'center',
    backgroundColor:
      '#fff',
    alignSelf:
      'flex-start',
    paddingHorizontal:
      moderateScale(16),
    paddingVertical:
      moderateScale(10),
    borderRadius:
      moderateScale(20),
  },

  bankIcon: {
    marginRight:
      moderateScale(6),
  },

  addBankText: {
    color: '#000',
    fontWeight: '600',
  },

});