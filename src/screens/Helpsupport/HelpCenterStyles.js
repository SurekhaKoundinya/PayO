import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#2b007a',
    paddingHorizontal: wp('5%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },

  headerTitle: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  ticketCard: {
    backgroundColor: '#6a1bb9',
    borderRadius: 16,
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },

  ticketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ticketText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginLeft: wp('3%'),
  },

  sectionTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginBottom: hp('2%'),
    marginTop: hp('1%'),
  },

  transactionCard: {
    backgroundColor: '#6a1bb9',
    borderRadius: 16,
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },

  transactionName: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  transactionDate: {
    color: '#ccc',
    marginTop: hp('0.5%'),
  },

  transactionAmount: {
    color: '#00ff99',
    marginTop: hp('1%'),
    fontSize: moderateScale(18),
    fontWeight: '700',
  },

  topicRow: {
    backgroundColor: '#6a1bb9',
    borderRadius: 14,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  topicText: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginLeft: wp('3%'),
    fontWeight: '500',
  },

  supportContainer: {
    alignItems: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('10%'),
  },

  supportTitle: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  supportSubtitle: {
    color: '#ccc',
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },

  contactButton: {
    backgroundColor: '#5e2bb8',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.8%'),
    borderRadius: 12,
  },

  contactButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: moderateScale(15),
  },

});