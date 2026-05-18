import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
    marginHorizontal: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },

});