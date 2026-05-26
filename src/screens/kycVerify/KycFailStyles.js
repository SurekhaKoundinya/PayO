import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: '#F3F3F3',
  },

  iconWrapper: {
    marginBottom: 40,
  },

  warningBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FF1F1F',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 44,
    marginBottom: 28,
  },

  subTitle: {
    color: '#444',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  instructions: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 60,
  },

  retryBtn: {
    width: '100%',
    backgroundColor: '#009933',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 22,
  },

  retryBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },

  supportBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#009933',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  supportBtnText: {
    color: '#009933',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default styles;