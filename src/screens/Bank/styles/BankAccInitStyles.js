import { Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 0,
  },

  back: {
    fontSize: 24,
    color: '#4B0082',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },

  iconWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },

  icon: {
    fontSize: 80,
  },

  featureContainer: {
    marginTop: 10,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  circleIcon: {
    color: '#6A0DAD',
    fontSize: 18,
    fontWeight: 'bold',
  },

  featureTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1a1a1a',
  },

  featureDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 2,
  },

  button: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});