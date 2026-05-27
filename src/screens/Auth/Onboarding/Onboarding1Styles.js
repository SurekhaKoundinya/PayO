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
      moderateScale(28),
    fontWeight: '700',
    color: '#7B4DFF',
    textAlign: 'center',
    lineHeight:
      moderateScale(38),
    marginBottom:
      moderateScale(15),
    paddingHorizontal:
      moderateScale(10),
  },

  description: {
    fontSize:
      moderateScale(15),
    color: '#444',
    textAlign: 'center',
    lineHeight:
      moderateScale(26),
    paddingHorizontal:
      moderateScale(20),
  },

  footer: {
    position: 'absolute',
    left:
      moderateScale(25),
    right:
      moderateScale(25),
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    zIndex: 2,
  },

  skipBtn: {
    backgroundColor:
      '#C9F0FF',
    paddingHorizontal:
      moderateScale(20),
    paddingVertical:
      moderateScale(10),
    borderRadius:
      moderateScale(14),
    minWidth:
      moderateScale(85),
    alignItems: 'center',
    justifyContent:
      'center',
  },

  skipText: {
    fontSize:
      moderateScale(16),
    fontWeight: '600',
    color: '#000',
  },

  nextImage: {
    width:
      moderateScale(78),
    height:
      moderateScale(78),
    resizeMode: 'contain',
  },

});