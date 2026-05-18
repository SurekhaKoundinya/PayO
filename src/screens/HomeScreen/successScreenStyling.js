import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // SUCCESS ICON
  iconContainer: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    backgroundColor: '#2ED573',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,

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
    fontSize: width * 0.14,
    color: '#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: width * 0.04,
    color: '#fff',
    opacity: 0.95,
    marginBottom: 8,
    textAlign: 'center',
  },

  time: {
    fontSize: width * 0.035,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },

});