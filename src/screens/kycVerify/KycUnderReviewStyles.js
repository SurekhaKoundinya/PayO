import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120022',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#120022',
  },

  header: {
    marginBottom: 40,
  },

  loaderWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },

  loaderOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: '#fff',
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4B0082',
  },

  kycText: {
    color: '#00FFD1',
    fontSize: 14,
    marginTop: 18,
    fontWeight: '500',
  },

  title: {
    color: '#fff',
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 35,
  },

  subTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 18,
    opacity: 0.9,
  },

  card: {
    backgroundColor: '#7B2CFF',
    borderRadius: 28,
    padding: 26,
    marginTop: 60,
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  leftText: {
    color: '#fff',
    fontSize: 17,
  },

  completedText: {
    color: '#00FFD1',
    fontSize: 17,
    fontWeight: '600',
  },

  pendingText: {
    color: '#E5D8FF',
    fontSize: 17,
  },
});

export default styles;