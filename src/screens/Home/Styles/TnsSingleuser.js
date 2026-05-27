import {
  StyleSheet,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  moderateScale,
} from 'react-native-size-matters';

export default StyleSheet.create({

  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal:
      wp('5%'),
  },

  headerRow: {
    flexDirection:
      'row',
    alignItems:
      'center',
    marginTop:
      hp('2%'),
    marginBottom:
      hp('2%'),
  },

  header: {
    color: '#fff',
    fontSize:
      moderateScale(20),
    fontWeight: '700',
    marginLeft:
      wp('4%'),
  },

  filterRow: {
    flexDirection:
      'row',
    alignItems:
      'center',
    marginBottom:
      hp('2%'),
  },

  activeFilter: {
    color: '#fff',
    fontWeight: '700',
    fontSize:
      moderateScale(13),
  },

  dropdown: {
    backgroundColor:
      '#fff',
    borderRadius:
      moderateScale(10),
    paddingHorizontal:
      wp('3%'),
    height:
      hp('5.5%'),
  },

  dropdownText: {
    color: '#111',
    fontSize:
      moderateScale(12),
  },

  section: {
    color: '#fff',
    fontSize:
      moderateScale(14),
    fontWeight: '700',
    marginVertical:
      hp('1.5%'),
  },

  historyCard: {
    backgroundColor:
      '#fff',
    borderRadius:
      moderateScale(18),
    padding:
      moderateScale(15),
    marginBottom:
      hp('1.5%'),
    flexDirection:
      'row',
    justifyContent:
      'space-between',
    alignItems:
      'center',
  },

  historyLeft: {
    flexDirection:
      'row',
    alignItems:
      'center',
    flex: 1,
  },

  historyIconBox: {
    width:
      moderateScale(45),
    height:
      moderateScale(45),
    borderRadius:
      moderateScale(22),
    backgroundColor:
      '#F4F4F4',
    justifyContent:
      'center',
    alignItems:
      'center',
  },

  historyUserInfo: {
    marginLeft:
      wp('3%'),
    flex: 1,
  },

  historyTypeText: {
    color: '#666',
    fontSize:
      moderateScale(11),
  },

  historyUserName: {
    color: '#111',
    fontSize:
      moderateScale(14),
    fontWeight: '700',
    marginTop:
      hp('0.3%'),
  },

  historyDateText: {
    color: '#888',
    fontSize:
      moderateScale(11),
    marginTop:
      hp('0.2%'),
  },

  historyAmountContainer: {
    alignItems:
      'flex-end',
  },

  historyAmountText: {
    fontSize:
      moderateScale(15),
    fontWeight: '700',
  },

  historyStatusText: {
    color: '#666',
    fontSize:
      moderateScale(11),
    marginTop:
      hp('0.3%'),
  },

});