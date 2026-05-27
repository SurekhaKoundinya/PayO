import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  moderateScale,
} from 'react-native-size-matters';

const { width } =
  Dimensions.get('window');

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal:
      moderateScale(20),
    zIndex: 2,
  },

  logo: {
    width:
      moderateScale(120),
    height:
      moderateScale(45),
    resizeMode: 'contain',
    marginBottom:
      moderateScale(30),
    marginTop:
      moderateScale(8),
  },

  mainImage: {
    width:
      width < 360
        ? width * 0.60
        : width * 0.68,

    height:
      width < 360
        ? width * 0.60
        : width * 0.68,

    resizeMode: 'contain',
    marginBottom:
      moderateScale(25),
  },

  title: {
    fontSize:
      moderateScale(30),
    fontWeight: '700',
    color: '#7B4DFF',
    textAlign: 'center',
    lineHeight:
      moderateScale(38),
    marginBottom:
      moderateScale(12),
    paddingHorizontal:
      moderateScale(10),
  },

  description: {
    fontSize:
      moderateScale(16),
    color: '#444',
    textAlign: 'center',
    lineHeight:
      moderateScale(26),
    paddingHorizontal:
      moderateScale(10),
    marginBottom:
      moderateScale(12),
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal:
      moderateScale(30),
    marginBottom:
      moderateScale(-20),
  },

  registerBtn: {
    backgroundColor:
      '#6200EE',
    height:
      moderateScale(50),
    borderRadius:
      moderateScale(14),
    justifyContent:
      'center',
    alignItems: 'center',
    marginBottom:
      moderateScale(18),
  },

  registerText: {
    color: '#FFFFFF',
    fontSize:
      moderateScale(18),
    fontWeight: '600',
  },

  loginBtn: {
    height:
      moderateScale(50),
    borderRadius:
      moderateScale(14),
    borderWidth: 1.5,
    borderColor:
      '#7B4DFF',
    justifyContent:
      'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#6200EE',
    fontSize:
      moderateScale(18),
    fontWeight: '600',
  },

});