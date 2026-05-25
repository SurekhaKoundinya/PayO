import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3e8ff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
  },

  header: {
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp('6%'),
    position: 'relative',
    marginBottom: hp('2%'),
  },

  backButton: {
    position: 'absolute',
    left: 0,
    padding: wp('1%'),
  },

  back: {
    fontSize: moderateScale(24),
    color: '#4B0082',
  },

  title: {
    textAlign: 'center',
    color: '#6a0dad',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },

  card: {
    width: '100%',
    padding: wp('5%'),
    borderRadius: moderateScale(15),
    backgroundColor: '#ffffff',
    elevation: 5,
  },

  sectionTitle: {
    color: '#6a0dad',
    fontWeight: 'bold',
    marginTop: hp('1%'),
    marginBottom: hp('0.6%'),
    fontSize: moderateScale(14),
  },

  input: {
    width: '100%',
    paddingVertical: hp('1.7%'),
    paddingHorizontal: wp('3.5%'),
    marginBottom: hp('1.2%'),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#d1c4e9',
    fontSize: moderateScale(14),
    backgroundColor: '#fafafa',
    color: '#000',
  },

  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: moderateScale(12),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.7%'),
    marginBottom: hp('1.2%'),
    backgroundColor: '#fff',
  },

  bankIcon: {
    fontSize: moderateScale(16),
    marginRight: wp('2.5%'),
  },

  dropdownText: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#333',
  },

  dropdownArrow: {
    fontSize: moderateScale(16),
    color: '#777',
  },

  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: moderateScale(12),
    maxHeight: hp('25%'),
    marginBottom: hp('1.2%'),
    overflow: 'hidden',
  },

  dropdownItem: {
    padding: wp('3.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },

  radioOuter: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },

  radioOuterActive: {
    borderColor: '#7b1fa2',
  },

  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#7b1fa2',
  },

  radioText: {
    fontSize: moderateScale(15),
    color: '#333',
  },

  button: {
    width: '100%',
    paddingVertical: hp('2%'),
    backgroundColor: '#7b1fa2',
    borderRadius: moderateScale(12),
    marginTop: hp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },

  uploadBox: {
    width: '100%',
    height: hp('18%'),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1c4e9',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: hp('2%'),
  },

  uploadText: {
    marginTop: hp('1%'),
    fontSize: moderateScale(14),
    color: '#7b1fa2',
    fontWeight: '500',
  },

  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
  },
});